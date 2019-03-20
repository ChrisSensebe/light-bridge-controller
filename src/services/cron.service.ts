import {LightService} from './lightService';
import * as cron from 'node-cron';
import {State} from '../models/state.interface';
import {ScheduledTask} from 'node-cron';

export class CronService {

  private lightService: LightService;
  private tasks: ScheduledTask[] = []; // TODO use map to store tasks, with key = task id

  constructor(lightService: LightService) {
    this.lightService = lightService;
  }

  initTasksFromDb() {
    // TODO init tasks from db at startup
  }

  scheduleLightState(cronExpression: string, ligthId: string, state: State) {
    const lightService = this.lightService;
    const task = cron.schedule(cronExpression, function () {
      lightService.setLightState(ligthId, state);
    });
    this.tasks = this.tasks.concat(task);
    task.start();
    // TODO save tasks config in db, to persist tasks
  }

  stopTask(taskId: string) {
    // TODO
  }

  destroyTask(taskId: string) {
    // TODO
  }

  clearTasks() {
    this.tasks.forEach(task => task.destroy);
    this.tasks = [];
  }

  stopTasks() {
    this.tasks.forEach(task => task.stop);
  }
}
