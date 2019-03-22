import {IScheduledState} from '../models/scheduledState.interface';
import * as mongoose from 'mongoose';
import {model} from 'mongoose';

export interface ScheduledStateModel extends IScheduledState, mongoose.Document {}

export const ScheduledStateSchema = new mongoose.Schema({
  cronExpression: String,
  lightId: String,
  state: {
    on: Boolean,
    bri: Number,
    hue: Number,
    sat: Number,
    effect: String,
    xy: [Number],
    ct: Number,
    alert: String,
    colormode: String,
    mode: String,
    reachable: Boolean,
  },
});

export const ScheduledInterface: mongoose.Model<ScheduledStateModel> = model<ScheduledStateModel>('ScheduledState', ScheduledStateSchema);
