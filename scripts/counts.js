// Career counts computed from the YAML data, shared by the site build and check-data.

const isFirstAuthor = p => /1st/i.test(p.role || '');

function countCareer({ projects = [], pubs = [], patents = [] }) {
  const journals = pubs.filter(p => p.type === 'Journal');
  const intlConf = pubs.filter(p => p.type === 'Conference' && p.global);
  return {
    projects: projects.length,
    pm: projects.filter(p => p.is_pm).length,
    journals: journals.length,
    journals_first: journals.filter(isFirstAuthor).length,
    intl_conf: intlConf.length,
    intl_conf_first: intlConf.filter(isFirstAuthor).length,
    patents: patents.filter(p => p.status === 'granted').length,
  };
}

// Replace {name} with counts[name]; an unknown name throws so a typo never reaches the page.
function fillCounts(text, counts) {
  return String(text).replace(/\{(\w+)\}/g, (m, key) => {
    if (!(key in counts)) throw new Error(`Unknown placeholder ${m}`);
    return String(counts[key]);
  });
}

module.exports = { countCareer, fillCounts };
