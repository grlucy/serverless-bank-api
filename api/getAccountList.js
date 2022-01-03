const { DynamoDBClient, ScanCommand } = require('@aws-sdk/client-dynamodb')
const client = new DynamoDBClient()

module.exports.handler = async (event, context) => {
  const response = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
  }

  const params = {
    ConsistentRead: true,
    TableName: process.env.ddbTableName
  }

  try {
    const data = await client.send(new ScanCommand(params))
    response.statusCode = 200
    response.body = JSON.stringify({ accounts: data.Items?.map(item => { 
          return { account: item.account.N, balance: Number(item.balance.N) }
        })
    })
  } catch (error) {
    console.error('getAccountList error:', error)
    response.statusCode = 500
    response.body = JSON.stringify({ message: 'Failed to get account list', error })
  }
  return response
}
