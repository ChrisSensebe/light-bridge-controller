import {LightService} from './lightService';

export class CronService {

  private lightService: LightService;

  constructor(lightService: LightService) {
    this.lightService = lightService;
  }

  // TODO setCron(lightId, cron)
}