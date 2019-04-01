import {State} from './state.interface';

export interface IScheduledState {
  cronExpression: string;
  lightId: string;
  started: boolean;
  state: State;
}
