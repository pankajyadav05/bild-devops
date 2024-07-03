import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { validateInput } from "./utils";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function handler(event) {
  console.log("Event:", JSON.stringify(event, null, 2));
  console.log("Environment variables:", JSON.stringify(process.env, null, 2));
  console.log("USERS_TABLE:", process.env.USERS_TABLE);

  try {
    const data = JSON.parse(event.body);
    validateInput(data, ["username", "password"]);

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const params = {
      TableName: process.env.USERS_TABLE,
      Item: {
        userId: uuidv4(),
        username: data.username,
        password: hashedPassword,
      },
    };

    console.log("DynamoDB Put params:", JSON.stringify(params, null, 2));

    await dynamoDb.put(params).promise();

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "User created successfully" }),
    };
  } catch (error) {
    console.error("Error in signup:", error);
    console.error("Error stack:", error.stack);
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({
        error: error.message,
        stackTrace: error.stack,
        tableName: process.env.USERS_TABLE,
      }),
    };
  }
}
