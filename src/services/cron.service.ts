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

  scheduleLightState(scheduledState: IScheduledState): Promise<string> {
    const stateSchema = new ScheduledInterface(scheduledState);
    return stateSchema
      .save()
      .then(saved => {
        const id = saved._id.toString();
        const lightService = this.lightService;
        const task = cron.schedule(scheduledState.cronExpression, function () {
          const lightId = scheduledState.lightId;
          const state = scheduledState.state;
          console.log(`light: ${lightId}; state: ${JSON.stringify(state)}`);
          lightService.setLightState(lightId, state);
        });
        saved.started ? task.start() : task.stop();
        this.tasks.set(id, task);
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
}
