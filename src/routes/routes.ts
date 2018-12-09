import * as express from 'express';
import {Router} from 'express';
import {LightsController} from '../controller/lights.controller';
import {LightService} from '../services/lightService';
import {Request, Response} from 'express';

export class Routes {

  private bridgeAdress: string;
  private bridgeUser: string;
  private lightService: LightService;

  constructor(
    bridgeAdress: string,
    bridgeUser: string,
    lightService: LightService,
  ) {
    this.bridgeAdress = bridgeAdress;
    this.bridgeUser = bridgeUser;
    this.lightService = lightService;
  }

  public getRoutes(): Router {
    const router = express.Router();
    router.get('/', LightsController.getRoot);
    router.get('/lights', (req: Request, res: Response) => {
      res.json(this.lightService.getLights());
    });
    return router;
  }
}