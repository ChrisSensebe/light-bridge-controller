import * as axios from 'axios';
import {setInterval} from 'timers';

interface LightState {
    on: boolean;
    bri: number;
    hue: number;
    sat: number;
    effect: string;
    reachable: boolean;
}

export class LightBridgeController {

    bridgeAddress: string;
    bridgeUser: string;
    lightsState: Map<string, LightState> = new Map();

    constructor(bridgeUrl: string, bridgeUser: string) {
        this.bridgeAddress = bridgeUrl;
        this.bridgeUser = bridgeUser;
    }

    watchLightBridge() {
        setInterval(() => {
            axios.default.get(`http://${this.bridgeAddress}/api/${this.bridgeUser}/lights`)
                .then(res => {
                    const fullState = res.data;
                    Object.keys(fullState).forEach(key => {
                        const newState = {
                            on: fullState[key].state.on,
                            bri: fullState[key].state.bri,
                            hue: fullState[key].state.hue,
                            sat: fullState[key].state.sat,
                            effect: fullState[key].state.effect,
                            reachable: fullState[key].state.reachable
                        };
                        const oldState = this.lightsState.get(key);
                        if (oldState) {
                            const lightUp = !oldState.reachable && newState.reachable;
                            if (lightUp) {
                                newState.on = oldState.on;
                                newState.bri = oldState.bri;
                                newState.hue = oldState.hue;
                                newState.sat = oldState.sat;
                                newState.effect = oldState.effect;
                                this.setLightState(key, newState);
                            }
                        }
                        this.lightsState.set(key, newState);
                    });
                })
                .catch(err => console.log(`error getting light state, ${err.message}`));
        }, 1000);
    }

    setLightState(key: string, state: LightState) {
        axios.default
            .put(`http://${this.bridgeAddress}/api/${this.bridgeUser}/lights/${key}/state`, state)
            .catch(err => console.log(`error setting  light state for light ${key}, ${err.message}`));
    }
}