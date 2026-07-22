const RPC = require('discord-rpc');

const CLIENT_ID = '1529327780796301515';

let client = null;
let connected = false;
let startTimestamp = null;
let lastProjectName = null;

async function connect() {
  if (connected) return true;

  client = new RPC.Client({ transport: 'ipc' });

  return new Promise((resolve) => {
    client.on('ready', () => {
      console.log(`[RPC] Connected to Discord as ${client.user.username}`);
      connected = true;
      resolve(true);
    });

    client.on('disconnected', () => {
      console.log('[RPC] Disconnected from Discord');
      connected = false;
      client = null;
    });

    client.login({ clientId: CLIENT_ID }).catch((err) => {
      console.error('[RPC] Login failed:', err.message);
      connected = false;
      client = null;
      resolve(false);
    });
  });
}

async function setActivity(aeInfo) {
  if (!connected || !client) return;

  if (aeInfo.projectName !== lastProjectName) {
    startTimestamp = Date.now();
    lastProjectName = aeInfo.projectName;
  }

  const details = aeInfo.projectName
    ? `Working on ${aeInfo.projectName}`
    : 'No project open';

  let state = aeInfo.version ? `After Effects ${aeInfo.version}` : 'After Effects';
  if (aeInfo.renderInfo) state = `Rendering: ${aeInfo.renderInfo}`;
  else if (aeInfo.unsaved) state += ' — Unsaved changes';

  try {
    await client.setActivity({
      details,
      state,
      startTimestamp,
      largeImageKey: 'ae_logo',
      largeImageText: 'Adobe After Effects',
      instance: false,
    });
  } catch (err) {
    console.error('[RPC] setActivity failed:', err.message);
    connected = false;
    client = null;
  }
}

async function clearActivity() {
  if (!connected || !client) return;
  try {
    await client.clearActivity();
    startTimestamp = null;
    lastProjectName = null;
  } catch {}
}

function isConnected() {
  return connected;
}

module.exports = { connect, setActivity, clearActivity, isConnected };
