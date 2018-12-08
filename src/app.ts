import {LightService} from './services/lightService';
import {CronService} from './services/cron.service';

if (process.argv.length < 4) {
  console.log(`Error provide bridge url as first argument and bridge user as second argument`);
  process.exit(1);
}

const bridgeAddress = process.argv[2];
const bridgeUser = process.argv[3];

const bridgeService = new LightService(bridgeAddress, bridgeUser);
const cronService = new CronService(bridgeService);

console.log(`Watching hue bridge at ${bridgeAddress} with user ${bridgeUser}`);
