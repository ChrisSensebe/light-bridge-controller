import {Request, Response} from 'express';
import {LightService} from '../services/lightService';
import {State} from '../models/state.interface';

export class LightsController {

  constructor(private lightService: LightService) {}

  public getLights(req: Request, res: Response) {
    this.lightService
      .getLights()
      .then(lights => res.json({lights}));
  }

  public getLight(req: Request, res: Response) {
    const lightId = req.params.id;
    this.lightService
      .getLight(lightId)
      .then(light => res.json({light}));
  }

  public updateLight(req: Request, res: Response) {
    const lightId = req.params.id;
    const lightState = req.body as State;
    this.lightService
      .setLightState(lightId, lightState)
      .then(() => res.status(204).send());
  }
}
