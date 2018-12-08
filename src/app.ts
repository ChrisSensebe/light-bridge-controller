import {BridgeService} from './services/bridge.service';

if (process.argv.length < 4) {
    console.log(`Error provide bridge url as first argument and bridge user as second argument`);
    process.exit(1);
}

// TODO check url and user
const bridgeAddress = process.argv[2];
const bridgeUser = process.argv[3];

const lightController = new BridgeService(bridgeAddress, bridgeUser);
lightController.watchLightBridge();

console.log(`Watching hue bridge at ${bridgeAddress} with user ${bridgeUser}`);

