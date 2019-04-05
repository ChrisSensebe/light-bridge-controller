import * as express from 'express';
import {Express} from 'express';
import * as morgan from 'morgan';
import {Routes} from './routes/routes';
import * as mongoose from 'mongoose';
import {config} from './config';
import logger from './server-utils/logger';
import * as bodyParser from 'body-parser';
import {CronService} from './services/cron.service';

export default class App {

  private readonly _express: Express;
  private routes: Routes;

  constructor(
    routes: Routes,
    dbUri: string,
    private cronService: CronService,
  ) {
    this._express = express();
    this.routes = routes;
    this.bootstratMiddlewares();
    this.bootstrapRoutes();
    this.connectDatabase(dbUri);
  }

  get express(): Express {
    return this._express;
  }

  private bootstratMiddlewares() {
    const loggerFormat = config.loggerFormat || '';
    this._express.use(morgan(loggerFormat, {stream: {write: (message: string) => logger.info(message.slice(0, -1))}}));
    this._express.use(bodyParser.json());
    this._express.use(bodyParser.urlencoded({extended: false}));
  }

  private bootstrapRoutes() {
    this._express.use('/', this.routes.getRoutes());
  }

  private connectDatabase(dbUri: string) {
    const cronService = this.cronService;
    mongoose.connect(dbUri, {useNewUrlParser: true})
      .then(() => {
        logger.info('Connected to db');
        cronService.restoreTasksFromDb();
      });
  }
}
