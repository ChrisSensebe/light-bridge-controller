import * as express from 'express';
import {Express} from 'express';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import {CronService} from './services/cron.service';
import {Routes} from './routes/routes';

// TODO error handling
export default class App {

  private readonly _express: Express;
  private routes: Routes;

  constructor(
    routes: Routes,
    cronService: CronService,
  ) {
    this._express = express();
    this.routes = routes;
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
    this._express.use('/', this.routes.getRoutes());
  }
}
