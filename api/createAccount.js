const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb')
const client = new DynamoDBClient()

module.exports.handler = async (event, context) => {
  const response = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }
  }
  const newAccountID = Math.random().toString().slice(2,11) // Generate 9-digit ID with left-padded zeros

  const params = {
    TableName: process.env.ddbTableName,
    Item: {
      account: { N: newAccountID },
      balance: { N: "0" }
    }
  }

  try {
    const data = await client.send(new PutItemCommand(params))
    response.statusCode = 200
    response.body = JSON.stringify({ message: 'Created account', account: newAccountID })
  } catch (error) {
    console.error('createAccount error:', error)
    response.statusCode = 500
    response.body = JSON.stringify({ message: 'Failed to create account', error })
  }
  return response
}
