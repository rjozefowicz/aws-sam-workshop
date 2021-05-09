const AWS = require("aws-sdk");
const { v4 } = require("uuid");
const client = new AWS.DynamoDB.DocumentClient();

const headers = {
    "Access-Control-Allow-Headers" : "*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*"
};

exports.lambdaHandler = async (event, context) => {

    const user = JSON.parse(event.body);
    if (!user.email) {
        return {
            headers,
            'statusCode': 400
        }
    }
    user.id = v4();

    try {
        await client.put({
            Item: user,
            TableName: process.env.USERS_TABLE
        }).promise();
        return {
            headers,
            'statusCode': 200
        }
    } catch (e) {
        console.log(e);
        return {
            headers,
            'statusCode': 500
        }
    }
};
