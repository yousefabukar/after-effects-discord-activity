const { execSync } = require('child_process');
const path = require('path');

const PS_SCRIPT = path.join(__dirname, '..', 'detect-ae.ps1');

function getTitle() {
  return execSync(
    `powershell -NonInteractive -NoProfile -ExecutionPolicy Bypass -File "${PS_SCRIPT}"`,
    { encoding: 'utf8', timeout: 8000, windowsHide: true }
  ).trim();
}

function parseTitle(title) {
  const versionMatch = title.match(/After Effects\s+(?:CC\s+)?(\d{4})/i);
  const version = versionMatch ? versionMatch[1] : null;

  const dashIdx = title.indexOf(' - ');
  if (dashIdx === -1) return { version, projectName: null, unsaved: false, renderInfo: null };

  let rest = title.slice(dashIdx + 3).trim();

  const renderMatch = rest.match(/\(([^)]+)\)\s*$/);
  const renderInfo = renderMatch ? renderMatch[1] : null;
  if (renderInfo) rest = rest.slice(0, renderMatch.index).trim();

  const unsaved = rest.endsWith(' *') || rest.endsWith('*');
  if (unsaved) rest = rest.slice(0, -1).trim().replace(/\s+$/, '');

  const projectName = path.basename(rest, '.aep').trim();

  return { version, projectName, unsaved, renderInfo };
}

function getAEInfo() {
  try {
    const title = getTitle();
    if (!title) return null;
    return { title, ...parseTitle(title) };
  } catch {
    return null;
  }
}

module.exports = { getAEInfo };
