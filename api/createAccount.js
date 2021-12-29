module.exports.handler = async (event, context) => {
    const response = {}
    response.statusCode = 200
    response.headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }
    response.body = JSON.stringify({Message: 'Success!', tableName: process.env.ddbTableName})
    return response
}
