import {Control} from './control.interface';
import {Streaming} from './streaming.interface';

export interface Capabilities {
  certified: true;
  control: Control;
  streaming: Streaming;
}
