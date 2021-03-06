import * as axios from 'axios';
import {State} from '../models/state.interface';
import {Light} from '../models/light.interface';
import logger from '../server-utils/logger';

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
      .catch(err => {
        logger.error(`error getting lights info, ${err.message}`);
      });
  }

  getLight(lightId: string): Promise<Light> {
    return axios.default
      .get(`http://${this.bridgeAddress}/api/${this.bridgeUser}/lights/${lightId}`)
      .then(res => res.data)
      .catch(err => {
        logger.error(`error getting info for light ${lightId}, ${err.message}`);
      });
  }

  setLightState(lightId: string, state: State): Promise<any> {
    return axios.default
      .put(`http://${this.bridgeAddress}/api/${this.bridgeUser}/lights/${lightId}/state`, state)
      .catch(err => {
        logger.error(`error setting  light state for light ${lightId}, ${err.message}`);
      });
  }
}
