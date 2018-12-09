import * as express from 'express';
import {Express} from 'express';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import {LightService} from './services/lightService';
import {CronService} from './services/cron.service';
import {Routes} from './routes/routes';

export default class App {

  private _express: Express;

  constructor(
    bridgeAdress: string,
    bridgeUser: string,
    lightService: LightService,
    cronService: CronService,
  ) {
    this._express = express();
    this.bootstratMiddlewares();
    this.bootstrapRoutes();
  }

  get express(): Express {
    return this._express;
  }

  private bootstratMiddlewares() {
    this._express.use(logger('dev'));
    this._express.use(bodyParser.json());
    this._express.use(bodyParser.urlencoded({extended: false}));
  }

  private bootstrapRoutes() {
    this._express.use('/', Routes.getRoutes());
  }
}
