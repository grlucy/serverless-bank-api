# Getting Started

## API

This project requires Node version 14+.

To deploy to AWS, you must have an AWS account and credentials file. You should also install serverless globally. To deploy, run:
```
npm i
serverless deploy
```

You must deploy to AWS before running locally so that all resources will be created. To run the API locally using serverless-offline:
```
npm run start
```

You must have the API running locally while you run the automated test collection. To run the automated test collection, open another CLI window and run:
```
npm run test
```

Husky uses a pre-push hook to ensure that all automated tests are passing before code can be successfully pushed to a branch. You must have the API running locally in order to push code since pushing code will automatically run the test collection.

To remove the deployed service from the provider (AWS), including all lambdas and DynamoDB table, run:
```
serverless remove
```

## UI

```
npm i -g @vue/cli
```

To run the UI locally:
```
cd serverless-bank-ui/
npm i
npm run serve
```

## Technologies Used
- Serverless framework
- serverless-offline plugin
- AWS Lambda
- AWS DynamoDB
- AWS IAM
- Postman
- Newman
- Husky

## Resources
- https://www.serverless.com/framework/docs/getting-started
- https://www.serverless.com/guides/dynamodb
- https://serverless-stack.com/chapters/configure-dynamodb-in-serverless.html
- https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/putitemcommand.html
- https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/dynamodb-example-table-read-write.html
- https://techbrij.com/brijpad/#json
- https://youtu.be/FXpIoQ_rT_c