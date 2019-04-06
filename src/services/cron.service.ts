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
    ScheduledInterface.find().then(scheduledTasks => scheduledTasks.forEach(this.restoreTask.bind(this)));
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

  toggleTask(taskId: string): Promise<void> {
    return this.getTask(taskId)
      .then(scheduledTask => {
        let task = this.tasks.get(taskId);
        if (!task) {
          task = this.restoreTask(scheduledTask);
        }
        scheduledTask.started ? task.stop() : task.start();
      });
  }

  destroyTask(taskId: string): Promise<void> {
    return ScheduledInterface.deleteOne({_id: taskId}).then(() => this.destroyLocalTask(taskId));
  }

  clearTasks(): Promise<void> {
    return ScheduledInterface.remove({}).then(() => {
      [...this.tasks.keys()].map(this.destroyLocalTask.bind(this));
    });
  }

  stopTasks(): Promise<void> {
    return ScheduledInterface.find().then(() => {
      this.tasks.forEach(task => task.stop());
    });
  }

  startTasks(): Promise<void> {
    return ScheduledInterface.find().then(() => {
      this.tasks.forEach(task => task.start());
    });

  }

  getTasks(): Promise<IScheduledState[]> {
    return ScheduledInterface.find().then(scheduledTasks => scheduledTasks);
  }

  private scheduleTask(scheduledState: IScheduledState): ScheduledTask {
    const lightService = this.lightService;
    return cron.schedule(scheduledState.cronExpression, function () {
      const lightId = scheduledState.lightId;
      const state = scheduledState.state;
      lightService.setLightState(lightId, state).then(() => {
        logger.info(`light: ${lightId}; state: ${JSON.stringify(state)}`);
      });
    });
  }

  private setTask(task: ScheduledTask, id: string, started: boolean) {
    started ? task.start() : task.stop();
    this.tasks.set(id, task);
  }

  private restoreTask(scheduledTask: any): ScheduledTask {
    const lightId = scheduledTask.lightId;
    const cronExpression = scheduledTask.cronExpression;
    const state = scheduledTask.state;
    const started = scheduledTask.started;
    const task = this.scheduleTask({lightId, cronExpression, state, started});
    logger.info(`light: ${lightId}, cron: ${cronExpression}, on: ${started}, state: ${JSON.stringify(state)}`);
    this.setTask(task, scheduledTask._id.toString(), scheduledTask.started);
    return task;
  }

  private destroyLocalTask(taskId: string) {
    const task = this.tasks.get(taskId);
    if (task) {
      task.destroy();
    }
    this.tasks.delete(taskId);
  }
}
