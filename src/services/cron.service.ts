import {LightService} from './lightService';
import * as cron from 'node-cron';
import {ScheduledTask} from 'node-cron';
import {IScheduledState} from '../models/scheduledState.interface';
import {ScheduledInterface} from '../schemas/scheduledStateSchema';

export class CronService {

  private tasks: Map<string, ScheduledTask> = new Map<string, ScheduledTask>();

  constructor(private readonly lightService: LightService) {
    this.lightService = lightService;
  }

  initTasksFromDb() {
  }

  scheduleLightState(scheduledState: IScheduledState) {
    const stateSchema = new ScheduledInterface(scheduledState);
    return stateSchema
      .save()
      .then(saved => {
        const id = saved._id.toString();
        const lightService = this.lightService;
        const task = cron.schedule(scheduledState.cronExpression, function () {
          lightService.setLightState(scheduledState.lightId, scheduledState.state);
        });
        this.tasks.set(id, task);
        task.start();
        return id;
      });
  }

  getTask(taskId: string): IScheduledState|undefined {
    return undefined;
  }

  toggleTask(taskId: string) {

  }

  destroyTask(taskId: string) {
  }

  clearTasks() {
    this.tasks.forEach(this.destroyTask.bind(this));
    this.tasks.clear();
  }

  stopTasks() {
    this.tasks.forEach(task => task.stop);
  }

  startTasks() {
    this.tasks.forEach(task => task.start);
  }

  getTasks(): IScheduledState[] {
    return [];
  }
}
