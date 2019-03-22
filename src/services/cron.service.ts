import {LightService} from './lightService';
import * as cron from 'node-cron';
import {ScheduledTask} from 'node-cron';
import {IScheduledState} from '../models/scheduledState.interface';

export class CronService {

  private lightService: LightService;
  private tasks: ScheduledTask[] = [];

  constructor(lightService: LightService) {
    this.lightService = lightService;
  }

  initTasksFromDb() {
  }

  scheduleLightState(scheduledState: IScheduledState) {
    const lightService = this.lightService;
    const task = cron.schedule(scheduledState.cronExpression, function () {
      lightService.setLightState(scheduledState.lightId, scheduledState.state);
    });
    this.tasks = this.tasks.concat(task);
    task.start();
  }

  stopTask(taskId: string) {
  }

  destroyTask(taskId: string) {
  }

  clearTasks() {
    this.tasks.forEach(task => task.destroy);
    this.tasks = [];
  }

  stopTasks() {
    this.tasks.forEach(task => task.stop);
  }
}
