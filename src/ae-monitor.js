const { execSync } = require('child_process');

const AE_PROCESS_NAMES = ['AfterFX', 'AfterFX64'];

function queryPS(command) {
  return execSync(
    `powershell -NonInteractive -NoProfile -Command "${command}"`,
    { encoding: 'utf8', timeout: 5000, windowsHide: true }
  ).trim();
}

function parseTitle(title) {
  if (!title) return null;

  const versionMatch = title.match(/After Effects\s+(?:CC\s+)?(\d{4})/i);
  const version = versionMatch ? versionMatch[1] : null;

  const projectMatch = title.match(/After Effects[^-]*-\s*(.+?)(?:\.aep)?\s*(\*)?\s*(?:\(([^)]+)\))?\s*$/i);

  if (!projectMatch) {
    return { version, projectName: null, unsaved: false, renderInfo: null };
  }

  return {
    version,
    projectName: projectMatch[1].trim(),
    unsaved: projectMatch[2] === '*',
    renderInfo: projectMatch[3] || null,
  };
}

function getAEInfo() {
  try {
    const names = AE_PROCESS_NAMES.map(n => `'${n}'`).join(',');
    const ps = `Get-Process -Name ${names} -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle -ne '' } | Select-Object -First 1 -ExpandProperty MainWindowTitle`;
    const title = queryPS(ps);
    if (!title) return null;
    return { title, ...parseTitle(title) };
  } catch {
    return null;
  }
}

function isAERunning() {
  try {
    const names = AE_PROCESS_NAMES.map(n => `'${n}'`).join(',');
    const ps = `(Get-Process -Name ${names} -ErrorAction SilentlyContinue | Measure-Object).Count`;
    const count = parseInt(queryPS(ps), 10);
    return count > 0;
  } catch {
    return false;
  }
}

module.exports = { getAEInfo, isAERunning };
