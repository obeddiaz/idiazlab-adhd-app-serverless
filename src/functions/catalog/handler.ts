// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
// import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import type { APIGatewayProxyHandler } from "aws-lambda";
import { problems, tasks } from "../../domain/catalog";

// import schema from './schema';

// const catalog: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
//   return formatJSONResponse({
//     message: ``,
//     event,
//   });
// };

export const handler: APIGatewayProxyHandler = async () => {
  return {
    statusCode: 200,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ problems, tasks }),
  };
};


export const main = middyfy(handler);
