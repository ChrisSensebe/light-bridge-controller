import * as axios from 'axios';
import {LightState} from '../models/light-state.interface';

export class BridgeService {

    bridgeAddress: string;
    bridgeUser: string;

    constructor(bridgeUrl: string, bridgeUser: string) {
        this.bridgeAddress = bridgeUrl;
        this.bridgeUser = bridgeUser;
    }

    setLightState(lightId: string, state: LightState) {
        axios.default
            .put(`http://${this.bridgeAddress}/api/${this.bridgeUser}/lights/${lightId}/state`, state)
            .catch(err => console.log(`error setting  light state for light ${lightId}, ${err.message}`));
    }
}