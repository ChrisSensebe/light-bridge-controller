import * as http from 'http';
import {onListening} from './server-utils/on-listening';
import {onError} from './server-utils/on-error';
import App from './app';
import {LightService} from './services/lightService';
import {CronService} from './services/cron.service';
import {Routes} from './routes/routes';
import {config} from './config';

const bridgeAddress = config.bridgeUri;
const bridgeUser = config.bridgeUser;
const port = config.port;

const lightService = new LightService(bridgeAddress, bridgeUser);
const cronService = new CronService(lightService);
const routes = new Routes(bridgeAddress, bridgeUser, lightService);
const app = new App(
  routes,
  cronService,
);
const express = app.express;
const server = http.createServer(express);
express.set('port', port);
server.listen(port);
const address = server.address();
const appliedOnError = onError(console.error, address);
const appliedOnListening = onListening(console.log, address);

server.on('error', appliedOnError);
server.on('listening', appliedOnListening);
