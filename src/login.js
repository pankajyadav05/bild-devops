import AWS from "aws-sdk";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validateInput } from "./utils";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function handler(event) {
  try {
    const data = JSON.parse(event.body);
    validateInput(data, ["username", "password"]);

    const params = {
      TableName: process.env.USERS_TABLE,
      Key: { username: data.username },
    };

    const result = await dynamoDb.get(params).promise();
    const user = result.Item;

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new Error("Invalid username or password");
    }

    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ token }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
