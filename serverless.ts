import type { AWS } from '@serverless/typescript';

import catalog from '@functions/catalog';
import * as outcomes from '@functions/outcomes';
import sessionPlans from '@functions/sessionPlans';

const serverlessConfiguration: AWS = {
  service: 'adhd-backend',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs20.x',

    // REST API (compatible con tu config actual)
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },

    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',

      // Dynamo table name
      OUTCOMES_TABLE: '${self:service}-${sls:stage}-session-outcomes',
    },

    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:PutItem',
              'dynamodb:GetItem',
              'dynamodb:Query',
              'dynamodb:UpdateItem',
              'dynamodb:DeleteItem',
            ],
            Resource: [
              // table arn
              'arn:aws:dynamodb:${aws:region}:${aws:accountId}:table/${self:provider.environment.OUTCOMES_TABLE}',
              // indexes arn (por si luego agregas GSI; no estorba)
              'arn:aws:dynamodb:${aws:region}:${aws:accountId}:table/${self:provider.environment.OUTCOMES_TABLE}/index/*',
            ],
          },
        ],
      },
    },
  },

  functions: {
    getCatalog: catalog,
    createSessionPlan: sessionPlans,
    getSessionOutcomes: outcomes.outComesGet,
    postSessionOutcome: outcomes.outComesPost,
    // getCatalog: {
    //   handler: 'src/handlers/catalog.handler',
    //   events: [
    //     {
    //       http: {
    //         method: 'get',
    //         path: 'v1/catalog',
    //         cors: true,
    //       },
    //     },
    //   ],
    // },

    // createSessionPlan: {
    //   handler: 'src/handlers/sessionPlans.handler',
    //   events: [
    //     {
    //       http: {
    //         method: 'post',
    //         path: 'v1/session-plans',
    //         cors: true,
    //       },
    //     },
    //   ],
    // },

    // getSessionOutcomes: {
    //   handler: 'src/handlers/outcomes.get',
    //   events: [
    //     {
    //       http: {
    //         method: 'get',
    //         path: 'v1/session-outcomes',
    //         cors: true,
    //       },
    //     },
    //   ],
    // },

    // postSessionOutcome: {
    //   handler: 'src/handlers/outcomes.post',
    //   events: [
    //     {
    //       http: {
    //         method: 'post',
    //         path: 'v1/session-outcomes',
    //         cors: true,
    //       },
    //     },
    //   ],
    // },
  },

  resources: {
    Resources: {
      SessionOutcomesTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: '${self:provider.environment.OUTCOMES_TABLE}',
          BillingMode: 'PAY_PER_REQUEST',
          AttributeDefinitions: [
            { AttributeName: 'deviceId', AttributeType: 'S' },
            { AttributeName: 'endedAt', AttributeType: 'N' },
          ],
          KeySchema: [
            { AttributeName: 'deviceId', KeyType: 'HASH' },
            { AttributeName: 'endedAt', KeyType: 'RANGE' },
          ],
        },
      },
    },
  },

  package: { individually: true },

  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node20',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
