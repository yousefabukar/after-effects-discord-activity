const { getAEInfo } = require('./ae-monitor');
const rpc = require('./rpc-manager');

const POLL_INTERVAL = 10000;
let aeWasRunning = false;

async function tick() {
  try {
    if (!rpc.isConnected()) {
      const ok = await rpc.connect();
      if (!ok) {
        console.log('[RPC] Waiting for Discord...');
        return;
      }
    }

    const aeInfo = getAEInfo();

    if (aeInfo) {
      if (!aeWasRunning) {
        console.log('[AE] After Effects detected');
        aeWasRunning = true;
      }
      await rpc.setActivity(aeInfo);
      const proj = aeInfo.projectName || '(no project)';
      process.stdout.write(`\r[AE] ${proj}${aeInfo.unsaved ? ' *' : ''}${aeInfo.renderInfo ? ` | ${aeInfo.renderInfo}` : ''}   `);
    } else {
      if (aeWasRunning) {
        console.log('\n[AE] After Effects closed — clearing presence');
        aeWasRunning = false;
        await rpc.clearActivity();
      }
    }
  } catch (err) {
    console.error('\n[Error]', err.message);
  }
}

async function main() {
  console.log('Discord Presence for After Effects');
  console.log(`Polling every ${POLL_INTERVAL / 1000}s — keep this running in the background.\n`);

  await tick();
  setInterval(tick, POLL_INTERVAL);
}

process.on('SIGINT', async () => {
  console.log('\n[Exit] Clearing presence...');
  await rpc.clearActivity();
  process.exit(0);
});

main();
