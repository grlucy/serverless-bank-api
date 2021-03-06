const { DynamoDBClient, GetItemCommand } = require('@aws-sdk/client-dynamodb')
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
    ConsistentRead: true,
    TableName: process.env.ddbTableName,
    Key: {
        account: { N: account }
    },
    ProjectionExpression: 'account,balance'
  }

  try {
    const data = await client.send(new GetItemCommand(params))
    if (!data.Item) {
      response.statusCode = 404
      response.body = JSON.stringify({ message: 'Failed to get balance', error: 'Account not found' })
    } else {
      response.statusCode = 200
      response.body = JSON.stringify({ account: data.Item?.account.N, balance: Number(data.Item?.balance.N) })  
    }
  } catch (error) {
    console.error('getBalance error:', error)
    response.statusCode = 500
    response.body = JSON.stringify({ message: 'Failed to get balance', error })
  }
  return response
}
