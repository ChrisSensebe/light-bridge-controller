import * as express from 'express';
import {Router} from 'express';

export class Routes {

  public static getRoutes(): Router {
    const router = express.Router();
    return router;
  }
}