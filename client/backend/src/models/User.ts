import { dynamoDB, USERS_TABLE } from "../config/dynamodb";
import { PutCommand, QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import bcrypt from "bcryptjs";

export interface User {
  userId: string;
  username: string;
  email: string;
  password: string; // hashed
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserInput {
  username: string;
  email: string;
  password: string;
}

export class UserModel {
  /**
   * Create a new user
   */
  static async createUser(input: CreateUserInput): Promise<User> {
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const hashedPassword = await bcrypt.hash(input.password, 10);
    const now = new Date().toISOString();

    const user: User = {
      userId,
      username: input.username,
      email: input.email.toLowerCase(),
      password: hashedPassword,
      createdAt: now,
      updatedAt: now,
    };

    await dynamoDB.send(
      new PutCommand({
        TableName: USERS_TABLE,
        Item: user,
        ConditionExpression: "attribute_not_exists(email)", // Prevent duplicate emails
      })
    );

    return user;
  }

  /**
   * Find user by email
   * Note: For production, create a GSI on email field for better performance
   */
  static async findByEmail(email: string): Promise<User | null> {
    try {
      // Try with GSI if it exists
      const result = await dynamoDB.send(
        new QueryCommand({
          TableName: USERS_TABLE,
          IndexName: "email-index",
          KeyConditionExpression: "email = :email",
          ExpressionAttributeValues: {
            ":email": email.toLowerCase(),
          },
          Limit: 1,
        })
      );

      if (result.Items && result.Items.length > 0) {
        return result.Items[0] as User;
      }
    } catch (error: any) {
      // If GSI doesn't exist, fall back to scan (not recommended for production)
      if (error.name === "ResourceNotFoundException" || error.name === "ValidationException") {
        console.warn("GSI not found, using scan (consider creating email-index GSI)");
      } else {
        throw error;
      }
    }

    // Fallback: Use scan (only for development, create GSI for production)
    const scanResult = await dynamoDB.send(
      new ScanCommand({
        TableName: USERS_TABLE,
        FilterExpression: "email = :email",
        ExpressionAttributeValues: {
          ":email": email.toLowerCase(),
        },
        Limit: 1,
      })
    );

    return scanResult.Items && scanResult.Items.length > 0
      ? (scanResult.Items[0] as User)
      : null;
  }

  /**
   * Find user by username
   * Note: For production, create a GSI on username field for better performance
   */
  static async findByUsername(username: string): Promise<User | null> {
    try {
      // Try with GSI if it exists
      const result = await dynamoDB.send(
        new QueryCommand({
          TableName: USERS_TABLE,
          IndexName: "username-index",
          KeyConditionExpression: "username = :username",
          ExpressionAttributeValues: {
            ":username": username,
          },
          Limit: 1,
        })
      );

      if (result.Items && result.Items.length > 0) {
        return result.Items[0] as User;
      }
    } catch (error: any) {
      // If GSI doesn't exist, fall back to scan (not recommended for production)
      if (error.name === "ResourceNotFoundException" || error.name === "ValidationException") {
        console.warn("GSI not found, using scan (consider creating username-index GSI)");
      } else {
        throw error;
      }
    }

    // Fallback: Use scan (only for development, create GSI for production)
    const scanResult = await dynamoDB.send(
      new ScanCommand({
        TableName: USERS_TABLE,
        FilterExpression: "username = :username",
        ExpressionAttributeValues: {
          ":username": username,
        },
        Limit: 1,
      })
    );

    return scanResult.Items && scanResult.Items.length > 0
      ? (scanResult.Items[0] as User)
      : null;
  }

  /**
   * Verify password
   */
  static async verifyPassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}



