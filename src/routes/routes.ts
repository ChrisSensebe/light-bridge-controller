import * as express from 'express';
import {Router} from 'express';
import {RootController} from '../controllers/root.controller';
import {LightsController} from '../controllers/lights.controller';

export class Routes {

  constructor(
    private rootController: RootController,
    private lightsController: LightsController) {}

  public getRoutes(): Router {
    const router = express.Router();
    router.get('/', this.rootController.getRoot);
    router.get('/lights', this.lightsController.getLights);
    router.get('/lights/:id', this.lightsController.getLight);
    router.put('/lights/:id', this.lightsController.updateLight);
    return router;
  }
}
