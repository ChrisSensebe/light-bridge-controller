import * as express from 'express';
import {Router} from 'express';
import {RootController} from '../controllers/root.controller';
import {LightsController} from '../controllers/lights.controller';
import {CronController} from '../controllers/cron.controller';

export class Routes {

  constructor(
    private rootController: RootController,
    private lightsController: LightsController,
    private cronController: CronController,
  ) {}

  public getRoutes(): Router {
    const router = express.Router();
    router.get('/', this.rootController.getRoot);
    router.get('/lights', this.lightsController.getLights.bind(this.lightsController));
    router.get('/lights/:id', this.lightsController.getLight.bind(this.lightsController));
    router.put('/lights/:id', this.lightsController.updateLight.bind(this.lightsController));
    router.post('/tasks', this.cronController.scheduleLightState.bind(this.cronController));
    router.put('/tasks/:id', this.cronController.toggleTask.bind(this.cronController));
    router.delete('/tasks/:id', this.cronController.destroyTask.bind(this.cronController));
    router.get('/tasks/:id', this.cronController.getTask.bind(this.cronController));
    router.get('/tasks', this.cronController.getTasks.bind(this.cronController));
    router.delete('/tasks', this.cronController.clearTasks.bind(this.cronController));
    router.put('/tasks/stop', this.cronController.stopTasks.bind(this.cronController));
    router.put('/tasks/start', this.cronController.startTasks.bind(this.cronController));

    return router;
  }
}
