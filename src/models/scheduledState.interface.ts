import {State} from './state.interface';

export interface ScheduledState {
  cronExpression: string;
  lightId: string;
  state: State;
}
