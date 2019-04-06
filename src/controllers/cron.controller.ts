import {Request, Response} from 'express';
import {CronService} from '../services/cron.service';
import {IScheduledState} from '../models/scheduledState.interface';

export class CronController {

  constructor(private cronService: CronService) {}

  scheduleLightState(req: Request, res: Response) {
    const scheduledState = req.body as IScheduledState;
    this.cronService.scheduleLightState(scheduledState).then(id => {
      const location = `/tasks/${id}`;
      res.set('Location', location);
      res.status(201).end();
    });
  }

  toggleTask(req: Request, res: Response) {
    const taskId = req.params.id;
    this.cronService.toggleTask(taskId).then(() => res.status(204).end());
  }

  destroyTask(req: Request, res: Response) {
    const taskId = req.params.id;
    this.cronService.destroyTask(taskId).then(() => res.status(200).end());
  }

  getTask(req: Request, res: Response) {
    const taskId = req.params.id;
    this.cronService.getTask(taskId).then(task => res.status(200).send({task}));
  }

  getTasks(req: Request, res: Response) {
    this.cronService.getTasks().then(tasks => res.status(200).send({tasks}));
  }

  clearTasks(req: Request, res: Response) {
    this.cronService.clearTasks().then(() => res.status(204).end());
  }

  stopTasks(req: Request, res: Response) {
    this.cronService.stopTasks().then(() => res.status(204).end());
  }

  startTasks(req: Request, res: Response) {
    this.cronService.startTasks().then(() => res.status(204).end());
  }
}
