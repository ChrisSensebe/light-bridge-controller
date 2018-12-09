import * as express from 'express';
import {Router} from 'express';
import {LightsController} from '../controller/lights.controller';

export class Routes {

  public static getRoutes(): Router {
    const router = express.Router();
    router.get('/', LightsController.getRoot);
    return router;
  }
}