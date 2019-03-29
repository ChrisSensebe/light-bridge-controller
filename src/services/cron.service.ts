import {LightService} from './lightService';
import * as cron from 'node-cron';
import {ScheduledTask} from 'node-cron';
import {IScheduledState} from '../models/scheduledState.interface';

export class CronService {

  private tasks: ScheduledTask[] = [];

  constructor(private readonly lightService: LightService) {
    this.lightService = lightService;
  }

  initTasksFromDb() {
  }

  scheduleLightState(scheduledState: IScheduledState) {
    const lightService = this.lightService;
    const task = cron.schedule(scheduledState.cronExpression, function () {
      lightService.setLightState(scheduledState.lightId, scheduledState.state);
    });
    task.start();
    this.tasks = this.tasks.concat(task);
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
    this.tasks = [];
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
