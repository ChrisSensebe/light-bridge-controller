import * as axios from 'axios';
import {State} from '../models/state.interface';
import {Light} from '../models/light.interface';

export class LightService {

  private bridgeAddress: string;
  private bridgeUser: string;

  constructor(bridgeUrl: string, bridgeUser: string) {
    this.bridgeAddress = bridgeUrl;
    this.bridgeUser = bridgeUser;
  }

  getLights(): Light[] {
    // TODO
    return [];
  }

  getLight(lightId: string): Light {
    // TODO
    return undefined;
  }

  setLightState(lightId: string, state: State) {
    axios.default
      .put(`http://${this.bridgeAddress}/api/${this.bridgeUser}/lights/${lightId}/state`, state)
      .catch(err => console.log(`error setting  light state for light ${lightId}, ${err.message}`));
  }
}