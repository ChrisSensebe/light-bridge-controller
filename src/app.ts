import {LightBridgeController} from './light-bridge-controller';

interface LightState {
    on: boolean;
    bri: number;
    hue: number;
    sat: number;
    effect: string;
    reachable: boolean;
}

// npm start -- http://192.168.1.1/api/ nqAwaVhXDLAuiXmWcwD3E1OIc3Yz0puF6VZJ77sX

if (process.argv.length < 4) {
    console.log(`Error provide bridge url as first argument and bridge user as second argument`);
    process.exit(1);
}

// TODO check url and user
const bridgeUrl = process.argv[2];
const bridgeUser = process.argv[3];

const lightController = new LightBridgeController(bridgeUrl, bridgeUser);
lightController.watchLightBridge();

console.log(`Watching hue bridge at ${bridgeUrl} with user ${bridgeUser}`);

