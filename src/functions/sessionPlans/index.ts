// import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'v1/session-plans',
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

  //  createSessionPlan: {
  //     handler: 'src/handlers/sessionPlans.handler',
  //     events: [
  //       {
  //         http: {
  //           method: 'post',
  //           path: 'v1/session-plans',
  //           cors: true,
  //         },
  //       },
  //     ],
  //   },