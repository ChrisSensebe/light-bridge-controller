import {LightService} from './lightService';
import * as cron from 'node-cron';
import {ScheduledTask} from 'node-cron';
import {IScheduledState} from '../models/scheduledState.interface';
import {ScheduledInterface} from '../schemas/scheduledStateSchema';
import logger from '../server-utils/logger';

export class CronService {

  private tasks: Map<string, ScheduledTask> = new Map<string, ScheduledTask>();

  constructor(private readonly lightService: LightService) {
    this.lightService = lightService;
  }

  restoreTasksFromDb() {
    this.tasks = new Map();
    logger.info('restoring tasks...');
    ScheduledInterface.find()
      .then(scheduledTasks => scheduledTasks.forEach(scheduledTask => {
        const lightId = scheduledTask.lightId;
        const cronExpression = scheduledTask.cronExpression;
        const state = scheduledTask.state;
        const started = scheduledTask.started;
        const scheduledState = {lightId, cronExpression, state, started};
        const task = this.scheduleTask(scheduledState);
        logger.info(`light: ${lightId}, cron: ${cronExpression}, on: ${started}, state: ${JSON.stringify(state)}`);
        this.setTask(task, scheduledTask._id.toString(), scheduledTask.started);
      }));
  }

  scheduleLightState(scheduledState: IScheduledState): Promise<string> {
    const stateSchema = new ScheduledInterface(scheduledState);
    return stateSchema
      .save()
      .then(saved => {
        const id = saved._id.toString();
        const task = this.scheduleTask(scheduledState);
        this.setTask(task, id, saved.started);
        return id;
      });
  }

  getTask(taskId: string): Promise<IScheduledState> {
    return ScheduledInterface
      .findOne({_id: taskId})
      .then(scheduledTask => {
        if (!scheduledTask) {
          throw new Error('no task found');
        }
        return scheduledTask;
      });
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

  private scheduleTask(scheduledState: IScheduledState): ScheduledTask {
    const lightService = this.lightService;
    return cron.schedule(scheduledState.cronExpression, function () {
      const lightId = scheduledState.lightId;
      const state = scheduledState.state;
      logger.info(`light: ${lightId}; state: ${JSON.stringify(state)}`);
      lightService.setLightState(lightId, state);
    });
  }

  private setTask(task: ScheduledTask, id: string, started: boolean) {
    started ? task.start() : task.stop();
    this.tasks.set(id, task);
  }
}
