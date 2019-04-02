import * as express from 'express';
import {Express} from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import {Routes} from './routes/routes';
import * as mongoose from 'mongoose';

export default class App {

  private readonly _express: Express;
  private routes: Routes;

  constructor(
    routes: Routes,
    dbUri: string,
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
    this._express.use(morgan('combined'));
    this._express.use(bodyParser.json());
    this._express.use(bodyParser.urlencoded({extended: false}));
  }

  private bootstrapRoutes() {
    this._express.use('/', this.routes.getRoutes());
  }

  private connectDatabase(dbUri: string) {
    mongoose.connect(dbUri, {useNewUrlParser: true})
      .then(() => console.log('Connected to db'));
  }
}
