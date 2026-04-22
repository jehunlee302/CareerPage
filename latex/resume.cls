%% Start of file `resume.cls'.
\ProvidesClass{resume}[2025/02/19 v25.0 Compact Layout & Spacing Reduction]
\NeedsTeXFormat{LaTeX2e}
\LoadClass{article}

%-------------------------------------------------------------------------------
%                Packages
%-------------------------------------------------------------------------------
\RequirePackage{array}
\RequirePackage{enumitem}
\RequirePackage{ragged2e}
\RequirePackage{geometry}
\RequirePackage{fancyhdr}
\RequirePackage{xcolor}
\RequirePackage{ifxetex}
\RequirePackage{xifthen}
\RequirePackage{etoolbox}
\RequirePackage{setspace}
\RequirePackage{tikz}
\RequirePackage[skins]{tcolorbox}
\RequirePackage{parskip}
\RequirePackage{fontawesome}
\RequirePackage[hidelinks,unicode]{hyperref}
\RequirePackage{kotex}
\RequirePackage[quiet]{fontspec}
\defaultfontfeatures{Ligatures=TeX}

% [Compact Setting] 전체 줄 간격 90%로 축소
\linespread{0.85}

%-------------------------------------------------------------------------------
%                Layout
%-------------------------------------------------------------------------------
\geometry{left=1.2cm, top=1.2cm, right=1.2cm, bottom=1.7cm, footskip=0.7cm}
\fancyhfoffset{0em}
\renewcommand{\headrulewidth}{0pt}
\fancyhf{}
\pagestyle{fancy}
\setlength{\parskip}{0pt}

%-------------------------------------------------------------------------------
%                Colors & Fonts
%-------------------------------------------------------------------------------
\definecolor{white}{HTML}{FFFFFF}
\definecolor{black}{HTML}{000000}
\definecolor{darkgray}{HTML}{414141} 
\definecolor{lightgray}{HTML}{999999}
\definecolor{pointcolor}{HTML}{112C4E} % 0E253F, 112C4E, 14325C, 1B3F73, 214B85

\newcommand*{\fontdir}[1][fonts/]{\def\@fontdir{#1}}
\fontdir

\setmainfont[
  Path = \@fontdir,
  UprightFont = Pretendard-Regular.otf,
  BoldFont = Pretendard-Bold.otf,
  ItalicFont = Pretendard-Regular.otf,
  BoldItalicFont = Pretendard-Bold.otf
]{Pretendard}

\newfontfamily\headerfont[
  Path = \@fontdir,
  UprightFont = Pretendard-Bold.otf, 
  BoldFont = Pretendard-Bold.otf,
]{Pretendard}

\newfontfamily\bodyfont[
  Path = \@fontdir,
  UprightFont = Pretendard-Regular.otf,
  BoldFont = Pretendard-Bold.otf,
]{Pretendard}

\newfontfamily\bodyfontlight[
  Path = \@fontdir,
  UprightFont = Pretendard-Light.otf,
  BoldFont = Pretendard-Medium.otf,
  ItalicFont = Pretendard-Light.otf
]{Pretendard}

\newcommand*{\footerfont}{\bodyfontlight}

%-------------------------------------------------------------------------------
%                Styles
%-------------------------------------------------------------------------------
% [Header]
\newcommand*{\headernamestyle}[1]{{\fontsize{34pt}{1em}\headerfont\bfseries\color{black} #1}}
\newcommand*{\headersstyle}{\fontsize{9pt}{1.7em}\bodyfontlight\color{darkgray}}

% [Section]
\newcommand*{\sectionstyle}[1]{{\fontsize{12pt}{1em}\headerfont\bfseries\color{black} #1}}

% [Entries]
\newcommand*{\entrytitlestyle}[1]{{\fontsize{9.5pt}{1em}\bodyfont\bfseries\color{darkgray} #1}} 
\newcommand*{\entrysubtitlestyle}[1]{{\fontsize{9.5pt}{1em}\bodyfont\color{darkgray} #1}}
\newcommand*{\entrysubstyle}[1]{{\fontsize{9pt}{1em}\bodyfontlight\color{darkgray} #1}}
\newcommand*{\datestyle}[1]{{\fontsize{8.5pt}{1em}\bodyfontlight\color{darkgray} #1}}
\newcommand*{\substyle}[1]{{\fontsize{8.5pt}{1em}\bodyfontlight\color{lightgray} #1}}
\newcommand*{\linkstyle}[1]{{\fontsize{7.5pt}{1em}\bodyfont\color{pointcolor} #1}}
\newcommand*{\summarystyle}{\fontsize{9.5pt}{1.5em}\bodyfontlight\color{darkgray}} 

% [Footer]
\newcommand*{\footerstyle}[1]{{\fontsize{7pt}{1em}\bodyfontlight\color{lightgray} #1}}

\newcommand{\ifempty}[3]{\ifstrempty{#1}{#2}{#3}}

%-------------------------------------------------------------------------------
%                Commands
%-------------------------------------------------------------------------------
\newcommand{\photo}[2][]{ \def\@photo{#2} }
\newcommand*{\name}[2]{\def\@firstname{#1}\def\@lastname{#2}}
\newcommand*{\position}[1]{\def\@position{#1}}
\newcommand*{\address}[1]{\def\@address{#1}}
\newcommand*{\mobile}[1]{\def\@mobile{#1}}
\newcommand*{\email}[1]{\def\@email{#1}}
\newcommand*{\homepage}[1]{\def\@homepage{#1}}
\newcommand*{\linkedin}[1]{\def\@linkedin{#1}}
\newcommand*{\scholar}[1]{\def\@scholar{#1}}

\def\vhrulefill#1{\leavevmode\leaders\hrule\@height#1\hfill \kern\z@}

% [Header]
\newcommand*{\makecvheader}{
  \begin{tikzpicture}[remember picture,overlay]
    \node[anchor=north east, fill=pointcolor, minimum width=6.5cm, minimum height=7.3cm, yshift=0cm, xshift=-1.2cm] (box) at (current page.north east) {};
    \ifthenelse{\isundefined{\@photo}}{}{
      \node[anchor=center, yshift=-0.8cm] at (box.center) {
        \includegraphics[width=5.2cm]{\@photo}
      };
    }
    \node[anchor=north west, fill=pointcolor, minimum width=3.8cm, minimum height=1.5cm, xshift=1.2cm, yshift=0cm, inner sep=0pt] (resumebox) at (current page.north west) {
        \begin{minipage}[b][1.4cm][b]{3.5cm}
            \vfill \centering
            \fontsize{16pt}{1em}\headerfont\bfseries\color{white} RESUME
            \vspace{2mm}
        \end{minipage}
    };
  \end{tikzpicture}

  \begin{minipage}[t]{0.60\textwidth} 
    \vspace{0.5cm} \raggedright 
    \ifthenelse{\isundefined{\@position}}{}{\headersstyle{\@position}\\[9pt]}
    \vspace{0.2cm} 
    \headernamestyle{\@firstname}\enskip\headernamestyle{\@lastname} \\[20pt]
    \begingroup
      \headersstyle
      \ifthenelse{\isundefined{\@address}}{}{\textbf{Address:} \@address \\}
      \ifthenelse{\isundefined{\@mobile}}{}{\textbf{Mobile:} \@mobile \quad}
      \ifthenelse{\isundefined{\@homepage}}{}{\textbf{Portfolio:} \href{\@homepage}{\@homepage} \\}
      \ifthenelse{\isundefined{\@email}}{}{\textbf{Email:} \@email \\}
      \ifthenelse{\isundefined{\@linkedin}}{}{\textbf{Linkedin:} \href{\@linkedin}{\@linkedin} \\}
      \ifthenelse{\isundefined{\@scholar}}{}{\textbf{Scholar:} \href{\@scholar}{\@scholar} \\}
    \endgroup
  \end{minipage} \vspace{0.5cm}
}

% [Footer]
\newcommand*{\makecvfooter}[3]{
  \fancyfoot{}
  \fancyfoot[L]{\footerstyle{#1}}
  \fancyfoot[C]{\footerstyle{#2}}
  \fancyfoot[R]{\footerstyle{#3}}
}

% [Section Title]
\newcommand{\cvsection}[1]{
  \vspace{6mm} % [수정] 7mm -> 6mm (섹션 위 여백 축소)
  \sectionstyle{#1} \par 
  \vspace{-1.0mm} {\color{lightgray}\vhrulefill{0.3pt}} 
  \vspace{-1.0mm} 
}

%-------------------------------------------------------------------------------
%                Environments & Entries
%-------------------------------------------------------------------------------
\newenvironment{cventries}{ \vspace{0mm} }{ \vspace{0mm} }

% [Paragraph]
\newenvironment{cvparagraph}{
  \vspace{1mm}
  \summarystyle
}{
  \par \vspace{2.5mm}
}

% [Education, Activities & Leadership]
\newcommand*{\cveducation}[6]{
  \begin{minipage}[t]{2.8cm} 
    \raggedright \datestyle{#4}
  \end{minipage}%
  \hspace{0.2cm} 
  \begin{minipage}[t]{\dimexpr\textwidth-3.0cm\relax}
    \raggedright
    \entrytitlestyle{#1} \hfill \substyle{#2} \\[0.3mm] 
    \ifempty{#6}{}{ \entrysubstyle {#6} } 
  \end{minipage}%
  \par \vspace{2.5mm}
}

% [Work Experience]
\newcommand*{\cventry}[6]{
  \begin{minipage}[t]{1.6cm} 
    \raggedright \datestyle{#1}
  \end{minipage}%
  \hspace{0.2cm} % [수정] 누락된 hspace 추가하여 정렬 보정
  \begin{minipage}[t]{\dimexpr\textwidth-1.8cm\relax}
    \raggedright
    \entrytitlestyle{#2} \hfill \substyle{#4} \\[0.1mm] 
    \entrysubtitlestyle{#3} \\[0.1mm] 
    \ifempty{#5}{}{ \entrysubstyle {#5} \\[0.5mm] } 
    \entrysubstyle {#6}
  \end{minipage}%
  \par \vspace{2.5mm} % [수정] 3.0mm -> 2.0mm (항목 간 간격 축소)
}

% [Projects]
\newcommand*{\cvproject}[5]{
  \begin{minipage}[t]{1.7cm} 
    \raggedright
    \datestyle{#1} 
    \ifempty{#2}{}{ \\[1mm] {\fontsize{7pt}{1em}\bodyfontlight\color{lightgray} #2} }
  \end{minipage}%
  \hspace{0.3cm}% [수정] 누락된 hspace 추가
  \begin{minipage}[t]{\dimexpr\textwidth-2.0cm\relax}
    \raggedright
    \entrytitlestyle{#3}
    \ifempty{#4}{}{ \\[0.2mm] \entrysubstyle{#4} } 
    \ifempty{#5}{}{ \\[0.2mm] \entrysubstyle{#5} }
  \end{minipage}%
  \par \vspace{2.5mm} % [수정] 3.0mm -> 2.0mm
}

% [Papers]
\newcommand*{\cvpaper}[5]{
  % 1. 좌측 날짜
  \begin{minipage}[t]{1.2cm}
    \raggedright \datestyle{#1}
  \end{minipage}%
  \hspace{0.2cm}%
  % 2. 중앙 제목
  \begin{minipage}[t]{\dimexpr\textwidth-4.6cm\relax}
    \raggedright
    \entrytitlestyle{#2} \\[0.3mm]
    \entrysubstyle{#3}
  \end{minipage}%
  \hspace{0.2cm}%
  % 3. 우측 저자/링크
  \begin{minipage}[t]{3.0cm}
    \raggedleft
    \substyle{#4}
    \ifempty{#5}{}{\\[0.3mm] \href{#5}{\linkstyle{[LINK]}}}%
  \end{minipage}%
  \par \vspace{2.5mm}
}

% [Honors]
\newcommand*{\cvhonor}[4]{
  \begin{minipage}[t]{1.6cm}
    \raggedright \datestyle{#4}
  \end{minipage}%
  \hspace{0.2cm}%
  \begin{minipage}[t]{\dimexpr\textwidth-5.0cm\relax} % [수정] 4.9cm (1.5 + 3.0 + 0.4)
    \raggedright
    \entrytitlestyle{#1} 
    \ifempty{#2}{}{, \entrysubstyle {#2}}
  \end{minipage}%
  \hspace{0.2cm}%
  \begin{minipage}[t]{3.0cm}
    \raggedleft
    \substyle{#3}
  \end{minipage}%
  \par \vspace{2.5mm} % [수정] 3.0mm -> 2.0mm
}

% [Skills]
\newenvironment{cvskills}{
  \vspace{1mm}
  \setlength\tabcolsep{0pt} 
  \setlength{\extrarowheight}{-1.0mm} 
  \begin{tabular}{@{} p{4.0cm} @{\hspace{0.2cm}} p{\dimexpr\textwidth-4.2cm} @{}}
}{ \end{tabular} \par \vspace{2mm} }

\newcommand*{\cvskill}[2]{ \bf\entrysubstyle{#1} & \entrysubstyle {#2} \\ }