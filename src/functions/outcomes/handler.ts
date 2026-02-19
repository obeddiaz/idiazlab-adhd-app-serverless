import type { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import type { SessionOutcome } from "../../domain/types";
import { middyfy } from "@libs/lambda";

const TABLE = process.env.OUTCOMES_TABLE!;
const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const id = (prefix: string) => `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;

const outcomePost: APIGatewayProxyHandler = async (event: any) => {
  const body = event.body || null;
  
  if (!body?.deviceId || !body?.planId || !body?.felt) {
    return { statusCode: 400, body: "Missing deviceId/planId/felt" };
  }

  const item: SessionOutcome = {
    outcomeId: id("outcome"),
    deviceId: body.deviceId,
    endedAt: Date.now(), // SK
    planId: body.planId,
    felt: body.felt,
    stepsDone: body.stepsDone ?? 0,
    stepsTotal: body.stepsTotal ?? 0,
  };

  await ddb.send(new PutCommand({ TableName: TABLE, Item: item }));

  return {
    statusCode: 201,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(item),
  };
};

export const post = middyfy(outcomePost);

const outcomeGet: APIGatewayProxyHandler = async (event) => {
  const deviceId = event.queryStringParameters?.deviceId;
  if (!deviceId) return { statusCode: 400, body: "Missing deviceId" };

  const res = await ddb.send(
    new QueryCommand({
      TableName: TABLE,
      KeyConditionExpression: "deviceId = :d",
      ExpressionAttributeValues: { ":d": deviceId },
      ScanIndexForward: false, // newest first
      Limit: 50,
    })
  );

  return {
    statusCode: 200,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ items: res.Items ?? [] }),
  };
};


export const get = middyfy(outcomeGet);