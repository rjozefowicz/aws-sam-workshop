const AWS = require("aws-sdk");
const client = new AWS.DynamoDB.DocumentClient();

const headers = {
    "Access-Control-Allow-Headers" : "*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*"
};

exports.lambdaHandler = async (event, context) => {

    if (event.path === '/users') {
        const result = await client.scan({
            TableName: process.env.USERS_TABLE
        }).promise();
        return {
            headers,
            'statusCode': 200,
            body: JSON.stringify(result.Items)
        }
    } else {
        const id = event.pathParameters.id;
        const result = await client.get({
            TableName: process.env.USERS_TABLE,
            Key: {
                id
            }
        }).promise();
        if (result.Item) {
            return {
                headers,
                'statusCode': 200,
                body: JSON.stringify(result.Item)
            }
        } else {
            return {
                headers,
                'statusCode': 404
            }
        }
    }
};
