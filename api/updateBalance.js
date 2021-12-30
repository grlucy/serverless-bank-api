const { DynamoDBClient, UpdateItemCommand } = require('@aws-sdk/client-dynamodb')
const client = new DynamoDBClient()

module.exports.handler = async (event, context) => {
  const response = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
  }
  const account = event.queryStringParameters?.account
  const amount = event.queryStringParameters?.amount

  if (!account || !amount) {
      response.statusCode = 422
      response.body = JSON.stringify({ error: 'Missing parameter' })
      return response  
  }

  const params = {
    TableName: process.env.ddbTableName,
    Key: {
        account: { N: account }
    },
    UpdateExpression: 'SET balance = if_not_exists(balance, :initial) + :num',
    ExpressionAttributeValues: {
        ':num': { N: amount },
        ':initial': { N: '0' },
        ':account': { N: account }
    },
    ReturnValues: 'UPDATED_NEW',
    ConditionExpression: 'account = :account'
  }

  try {
    const data = await client.send(new UpdateItemCommand(params))
    response.statusCode = 200
    response.body = JSON.stringify({ message: 'Updated balance', newBalance: Number(data.Attributes.balance.N) })
  } catch (error) {
    console.error('updateBalance error:', error)
    response.statusCode = 500
    response.body = JSON.stringify({ message: 'Failed to update balance', error })
  }
  return response
}
