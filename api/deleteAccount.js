const { DynamoDBClient, DeleteItemCommand } = require('@aws-sdk/client-dynamodb')
const client = new DynamoDBClient()

module.exports.handler = async (event, context) => {
  const response = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
  }
  const account = event.queryStringParameters?.account

  if (!account) {
      response.statusCode = 422
      response.body = JSON.stringify({ error: 'Missing parameter' })
      return response  
  }

  const params = {
    TableName: process.env.ddbTableName,
    Key: {
        account: { N: account }
    },
    ReturnValues: 'ALL_OLD',
    ConditionExpression: 'account = :account',
    ExpressionAttributeValues: {
        ':account': { N: account }
    }
  }

  try {
    const data = await client.send(new DeleteItemCommand(params))
    response.statusCode = 200
    response.body = JSON.stringify({ message: 'Deleted account', data })
  } catch (error) {
    console.error('deleteAccount error:', error)
    response.statusCode = 500
    response.body = JSON.stringify({ message: 'Failed to delete account', error })
  }
  return response
}
