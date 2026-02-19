// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
// import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

// import schema from './schema';

// const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
//   return formatJSONResponse({
//     message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
//     event,
//   });
// };

import type { APIGatewayProxyHandler } from "aws-lambda";
import { generatePlan } from "../../domain/generatePlan";
import type { SessionPlanRequest } from "../../domain/types";

export const handler: APIGatewayProxyHandler = async (event: any) => {
  const body = event.body || null;

  if (!body?.deviceId || !body?.problemId || !body?.taskId) {
    return { statusCode: 400, body: "Missing deviceId/problemId/taskId" };
  }

  const req: SessionPlanRequest = body;
  const plan = generatePlan(req);

  return {
    statusCode: 200,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(plan),
  };
};

export const main = middyfy(handler);
