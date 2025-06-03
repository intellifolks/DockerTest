import koaBody from 'koa-body';
import { Application } from './lib/app';
import { geolocationRouter, healthRouter } from './routes';
import { configuration } from './lib/config';

export const application = new Application();

application.use(koaBody())

application.router = healthRouter;
application.router = geolocationRouter(configuration);
