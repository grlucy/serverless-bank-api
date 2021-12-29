# Getting Started

To deploy to AWS, you must have an AWS account and credentials file. You should also install serverless globally. To deploy, run:
```
npm i
serverless deploy
```

You must deploy to AWS before running locally so that all resources will be created. To run the API locally using serverless-offline:
```
npm run start
```

## Resources
- https://www.serverless.com/framework/docs/getting-started
- https://www.serverless.com/guides/dynamodb
- https://serverless-stack.com/chapters/configure-dynamodb-in-serverless.html
- https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/putitemcommand.html
- https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/dynamodb-example-table-read-write.html