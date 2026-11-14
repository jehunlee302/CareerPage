//! Dwell-time collector: validates the beacon from assets/js/analytics.js and writes one Analytics Engine point.

use serde_json::Value;

const MAX_BODY: usize = 512;
const MAX_PATH_CHARS: usize = 200;
const MAX_DWELL_MS: f64 = 86_400_000.0;

#[derive(Debug, PartialEq)]
pub struct Point {
    pub path: String,
    pub dwell_ms: f64,
    pub scroll_pct: f64,
}

/// Finite numbers are clamped to 0..=hi; anything else becomes 0.
fn clamp(v: Option<&Value>, hi: f64) -> f64 {
    match v.and_then(Value::as_f64) {
        Some(n) if n.is_finite() => n.clamp(0.0, hi),
        _ => 0.0,
    }
}

/// Status code for one request and the point to record, if any.
pub fn decide(method: &str, content_length: Option<&str>, body: &[u8]) -> (u16, Option<Point>) {
    match method {
        "OPTIONS" => return (204, None),
        "POST" => {}
        _ => return (405, None),
    }
    let header_over = content_length
        .and_then(|v| v.trim().parse::<u64>().ok())
        .is_some_and(|n| n > MAX_BODY as u64);
    if header_over || body.len() > MAX_BODY {
        return (413, None);
    }
    let Ok(json) = serde_json::from_slice::<Value>(body) else {
        return (400, None);
    };
    let path = match json.get("path").and_then(Value::as_str) {
        Some(p) => p.chars().take(MAX_PATH_CHARS).collect(),
        None => "/".to_string(),
    };
    let point = Point {
        path,
        dwell_ms: clamp(json.get("dwell_ms"), MAX_DWELL_MS),
        scroll_pct: clamp(json.get("scroll_pct"), 100.0),
    };
    (204, Some(point))
}

#[cfg(target_arch = "wasm32")]
mod handler {
    use super::{decide, MAX_BODY};
    use futures_util::StreamExt;
    use worker::*;

    const ALLOWED_ORIGIN: &str = "https://jehun-lee.work";

    /// Reads at most MAX_BODY + 1 bytes, so an oversized chunked body is never buffered.
    async fn read_capped(req: &mut Request) -> std::result::Result<Vec<u8>, ()> {
        let Ok(mut stream) = req.stream() else {
            return Ok(Vec::new());
        };
        let mut body = Vec::new();
        while let Some(chunk) = stream.next().await {
            body.extend(chunk.map_err(|_| ())?);
            if body.len() > MAX_BODY {
                body.truncate(MAX_BODY + 1);
                break;
            }
        }
        Ok(body)
    }

    #[event(fetch)]
    async fn fetch(mut req: Request, env: Env, _ctx: Context) -> Result<Response> {
        let method = req.method().to_string();
        let content_length = req.headers().get("content-length")?;
        let body = if method == "POST" {
            read_capped(&mut req).await
        } else {
            Ok(Vec::new())
        };
        let (status, point) = match body {
            Ok(body) => decide(&method, content_length.as_deref(), &body),
            Err(()) => (400, None),
        };

        // Best effort: a missing binding or a rejected point never fails the request.
        if let (Some(p), Ok(ae)) = (point, env.analytics_engine("AE")) {
            let _ = AnalyticsEngineDataPointBuilder::new()
                .indexes([p.path.as_str()])
                .add_blob(p.path.as_str())
                .add_double(p.dwell_ms)
                .add_double(p.scroll_pct)
                .write_to(&ae);
        }

        let headers = Headers::new();
        headers.set("Access-Control-Allow-Origin", ALLOWED_ORIGIN)?;
        headers.set("Access-Control-Allow-Methods", "POST, OPTIONS")?;
        headers.set("Access-Control-Allow-Headers", "Content-Type")?;
        headers.set("Access-Control-Max-Age", "86400")?;
        Ok(Response::empty()?.with_status(status).with_headers(headers))
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn pt(path: &str, dwell_ms: f64, scroll_pct: f64) -> Option<Point> {
        Some(Point {
            path: path.into(),
            dwell_ms,
            scroll_pct,
        })
    }

    type Case<'a> = (
        &'a str,
        &'a str,
        Option<&'a str>,
        &'a [u8],
        u16,
        Option<Point>,
    );

    #[test]
    fn decide_table() {
        let long_path = format!(r#"{{"path":"{}"}}"#, "é".repeat(250));
        let wrap = |pad: usize| format!(r#"{{"path":"/","pad":"{}"}}"#, "x".repeat(pad));
        let body_512 = wrap(512 - wrap(0).len());
        let body_513 = format!("{body_512} ");
        assert_eq!((body_512.len(), body_513.len()), (512, 513));
        let cases: Vec<Case> = vec![
            ("preflight", "OPTIONS", None, b"", 204, None),
            ("wrong method", "GET", None, b"", 405, None),
            (
                "valid beacon",
                "POST",
                Some("50"),
                br#"{"path":"/ko","dwell_ms":1234,"scroll_pct":55}"#,
                204,
                pt("/ko", 1234.0, 55.0),
            ),
            (
                "header 512 passes",
                "POST",
                Some("512"),
                b"{}",
                204,
                pt("/", 0.0, 0.0),
            ),
            ("header 513 rejected", "POST", Some("513"), b"{}", 413, None),
            (
                "unparseable header falls to body cap",
                "POST",
                Some("abc"),
                b"{}",
                204,
                pt("/", 0.0, 0.0),
            ),
            (
                "body 512 bytes passes",
                "POST",
                None,
                body_512.as_bytes(),
                204,
                pt("/", 0.0, 0.0),
            ),
            (
                "body 513 bytes rejected without header",
                "POST",
                None,
                body_513.as_bytes(),
                413,
                None,
            ),
            ("not json", "POST", None, b"hello", 400, None),
            ("empty body", "POST", None, b"", 400, None),
            (
                "null body uses defaults",
                "POST",
                None,
                b"null",
                204,
                pt("/", 0.0, 0.0),
            ),
            (
                "array body uses defaults",
                "POST",
                None,
                b"[]",
                204,
                pt("/", 0.0, 0.0),
            ),
            (
                "wrong field types use defaults",
                "POST",
                None,
                br#"{"path":1,"dwell_ms":"5","scroll_pct":null}"#,
                204,
                pt("/", 0.0, 0.0),
            ),
            (
                "values clamped",
                "POST",
                None,
                br#"{"dwell_ms":-5,"scroll_pct":250}"#,
                204,
                pt("/", 0.0, 100.0),
            ),
            (
                "dwell capped at 24h",
                "POST",
                None,
                br#"{"dwell_ms":99999999999}"#,
                204,
                pt("/", MAX_DWELL_MS, 0.0),
            ),
            (
                "out-of-range number rejected",
                "POST",
                None,
                br#"{"dwell_ms":1e400}"#,
                400,
                None,
            ),
            (
                "path cut at 200 chars",
                "POST",
                None,
                long_path.as_bytes(),
                204,
                pt(&"é".repeat(200), 0.0, 0.0),
            ),
        ];
        for (name, method, cl, body, status, point) in cases {
            assert_eq!(decide(method, cl, body), (status, point), "{name}");
        }
    }
}
