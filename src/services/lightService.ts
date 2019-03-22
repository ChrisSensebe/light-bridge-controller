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

  getLights(): Promise<void | Light[]> {
    return axios.default
      .get(`http://${this.bridgeAddress}/api/${this.bridgeUser}/lights`)
      .then(res => {
        const data = res.data;
        return Object.keys(data).map(key => data[key]);
      })
      .catch(err => console.log(err));
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
