// import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export const outComesGet = {
  handler: `${handlerPath(__dirname)}/handler.get`,
  events: [
    {
      http: {
        method: 'get',
        path: 'v1/session-outcomes',
        cors: true,
        // request: {
        //   schemas: {
        //     'application/json': schema,
        //   },
        // },
      },
    },
  ],
};

export const outComesPost = {
  handler: `${handlerPath(__dirname)}/handler.post`,
  events: [
    {
      http: {
        method: 'post',
        path: 'v1/session-outcomes',
        cors: true,
        // request: {
        //   schemas: {
        //     'application/json': schema,
        //   },
        // },
      },
    },
  ],
};
