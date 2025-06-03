import { Router } from '@/lib/router';
import { geocodeMiddleware, homeMiddleware, schemaMiddlewareFactory } from '@/middleware';
import compose from 'koa-compose';

export function geolocationRouter(config: { google: { key: string } }) {
  const geolocationRouter = new Router();

  geolocationRouter.get('/', homeMiddleware);
  geolocationRouter.get('/geocode', compose([
    schemaMiddlewareFactory({
      schema: {
        query: {
          type: 'object',
          properties: {
            lat: { type: 'number', format: 'float' },
            lng: { type: 'number', format: 'float' },
          },
          required: ['lat', 'lng'],
        }
      }
    }),
    geocodeMiddleware(config),
  ]))

  return geolocationRouter;
}