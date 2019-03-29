import * as express from 'express';
import {Router} from 'express';
import {RootController} from '../controllers/root.controller';
import {LightsController} from '../controllers/lights.controller';

export class Routes {

  constructor(
    private rootController: RootController,
    private lightsController: LightsController, ) {}

  public getRoutes(): Router {
    const router = express.Router();
    router.get('/', this.rootController.getRoot);
    router.get('/lights', this.lightsController.getLights.bind(this.lightsController));
    router.get('/lights/:id', this.lightsController.getLight.bind(this.lightsController));
    router.put('/lights/:id', this.lightsController.updateLight.bind(this.lightsController));
    return router;
  }
}
