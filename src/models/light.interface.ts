import {State} from './state.interface';
import {SwUpdate} from './sw-update.interface';
import {Capabilities} from './capabilities.interface';
import {Config} from './config.interface';

export interface Light {
  state: State;
  swupdate: SwUpdate;
  type: string;
  name: string;
  modelid: string;
  manufacturername: string;
  productname: string;
  capabilities: Capabilities;
  config: Config;
  uniqueid: string;
  swversion: string;
}
