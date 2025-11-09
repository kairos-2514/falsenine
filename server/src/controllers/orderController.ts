import { Request, Response } from "express";
import {
  PutCommand,
  QueryCommand,
  GetCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "../db/dynamo";
import { randomUUID } from "crypto";

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || "EcommerceData";

/**
 * Fetch product details from DynamoDB
 */
const getProductFromDB = async (productId: string): Promise<{
  pName: string;
  pPrice: number;
  pDescription: string;
  image?: string;
} | null> => {
  try {
    const PK = `PRODUCT#${productId}`;
    const SK = "METADATA";

    const command = new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        PK,
        SK,
      },
    });

    const result = await ddbDocClient.send(command);

    if (!result.Item) {
      return null;
    }

    const item = result.Item;
    // Handle price - DynamoDB returns numbers, but ensure it's a number type
    let price = 0;
    if (typeof item.pPrice === "number") {
      price = item.pPrice;
    } else if (item.pPrice !== undefined && item.pPrice !== null) {
      price = parseFloat(String(item.pPrice));
    }
    
    console.log(`📦 Fetched product ${productId}:`, {
      name: item.pName,
      price: price,
      hasDescription: !!item.pDescription,
    });
    
    return {
      pName: item.pName || "",
      pPrice: price,
      pDescription: item.pDescription || "",
      image: item.image || "",
    };
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error);
    return null;
  }
};

interface OrderItem {
  productId: string;
  productName: string;
  productDescription?: string;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
  selectedSize?: string;
  image?: string;
}

interface OrderMetadata {
  orderId: string;
  userId: string;
  userEmail: string;
  orderStatus: string;
  totalAmount: number;
  currency: string;
  shippingAddress: {
    fullName: string;
    phoneNumber: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pinCode: string;
    country: string;
  };
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  createdAt: string;
  items: OrderItem[];
}

/**
 * Save order to DynamoDB
 */
export const saveOrder = async (
  orderData: OrderMetadata
): Promise<void> => {
  console.log("\n💾💾💾 saveOrder FUNCTION CALLED 💾💾💾");
  console.log("Timestamp:", new Date().toISOString());
  console.log("Table name:", TABLE_NAME);
  
  try {
    const timestamp = new Date().toISOString();
    const orderId = orderData.orderId || `ORD_${randomUUID()}`;
    const PK = `ORDER#${orderId}`;
    const GSI1PK = `USER#${orderData.userId}`;
    const GSI1SK = `ORDER#${timestamp}`;

    console.log("\n📋 Order details:");
    console.log("  Order ID:", orderId);
    console.log("  User ID:", orderData.userId);
    console.log("  User Email:", orderData.userEmail);
    console.log("  Total Amount:", orderData.totalAmount);
    console.log("  Items count:", orderData.items?.length || 0);
    console.log("  PK:", PK);
    console.log("  GSI1PK:", GSI1PK);
    console.log("  GSI1SK:", GSI1SK);

    // Ensure totalAmount is a number
    const totalAmount = typeof orderData.totalAmount === 'number' 
      ? orderData.totalAmount 
      : parseFloat(String(orderData.totalAmount || 0));

    console.log("  Calculated totalAmount:", totalAmount);

    // Ensure shippingAddress is a plain object
    const shippingAddress = {
      fullName: String(orderData.shippingAddress?.fullName || ''),
      phoneNumber: String(orderData.shippingAddress?.phoneNumber || ''),
      addressLine1: String(orderData.shippingAddress?.addressLine1 || ''),
      addressLine2: orderData.shippingAddress?.addressLine2 ? String(orderData.shippingAddress.addressLine2) : undefined,
      city: String(orderData.shippingAddress?.city || ''),
      state: String(orderData.shippingAddress?.state || ''),
      pinCode: String(orderData.shippingAddress?.pinCode || ''),
      country: String(orderData.shippingAddress?.country || ''),
    };

    console.log("\n📦 Preparing order metadata item:");
    console.log("  PK:", PK);
    console.log("  SK: METADATA");
    console.log("  type: ORDER");
    console.log("  orderId:", orderId);
    console.log("  userId:", orderData.userId);
    console.log("  totalAmount:", totalAmount);
    console.log("  GSI1PK:", GSI1PK);
    console.log("  GSI1SK:", GSI1SK);

    // Save order metadata
    const metadataCommand = new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK,
        SK: "METADATA",
        type: "ORDER",
        orderId,
        userId: orderData.userId,
        userEmail: orderData.userEmail,
        orderStatus: orderData.orderStatus,
        totalAmount: totalAmount, // Ensure it's a number
        currency: orderData.currency || "INR",
        shippingAddress: shippingAddress, // Plain object
        razorpayOrderId: orderData.razorpayOrderId,
        razorpayPaymentId: orderData.razorpayPaymentId,
        createdAt: timestamp,
        GSI1PK,
        GSI1SK,
      },
    });

    console.log("\n🚀 Sending metadata PUT command to DynamoDB...");
    console.log("Command:", JSON.stringify({
      TableName: TABLE_NAME,
      Item: {
        PK,
        SK: "METADATA",
        type: "ORDER",
        orderId,
        userId: orderData.userId,
        userEmail: orderData.userEmail,
        orderStatus: orderData.orderStatus,
        totalAmount,
        currency: orderData.currency || "INR",
        shippingAddress: shippingAddress,
        razorpayOrderId: orderData.razorpayOrderId,
        razorpayPaymentId: orderData.razorpayPaymentId,
        createdAt: timestamp,
        GSI1PK,
        GSI1SK,
      },
    }, null, 2));
    
    try {
      const metadataResult = await ddbDocClient.send(metadataCommand);
      console.log("\n✅✅✅ Order metadata PUT command executed successfully ✅✅✅");
      console.log("DynamoDB response:", JSON.stringify(metadataResult, null, 2));
      console.log("Order metadata saved successfully:", orderId);
    } catch (metadataError: unknown) {
      console.error("\n❌❌❌ CRITICAL: Failed to save order metadata to DynamoDB ❌❌❌");
      console.error("Error type:", metadataError instanceof Error ? metadataError.constructor.name : typeof metadataError);
      console.error("Error message:", metadataError instanceof Error ? metadataError.message : String(metadataError));
      console.error("Error code:", (metadataError as any)?.code);
      console.error("Error name:", (metadataError as any)?.name);
      console.error("Full error:", JSON.stringify(metadataError, Object.getOwnPropertyNames(metadataError), 2));
      throw metadataError;
    }

    // Save each order item - fetch product details from DynamoDB
    console.log(`Saving ${orderData.items.length} order items`);
    for (const item of orderData.items) {
      try {
        console.log(`\n🛒 Processing order item:`, {
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          providedPrice: item.pricePerUnit,
        });
        
        // Fetch product details from DynamoDB to get accurate price and description
        const productDetails = await getProductFromDB(item.productId);
        
        if (productDetails) {
          console.log(`✅ Product found in DB:`, {
            name: productDetails.pName,
            price: productDetails.pPrice,
            description: productDetails.pDescription?.substring(0, 50) + '...',
          });
        } else {
          console.warn(`⚠️ Product ${item.productId} not found in DB, using provided data`);
        }
        
        // Use product details from DB if available, otherwise use provided data
        const finalProductName = productDetails?.pName || item.productName || '';
        const finalPricePerUnit = typeof (productDetails?.pPrice) === 'number' && productDetails.pPrice > 0
          ? productDetails.pPrice 
          : (typeof item.pricePerUnit === 'number' 
            ? item.pricePerUnit 
            : parseFloat(String(item.pricePerUnit || 0)));
        const finalQuantity = typeof item.quantity === 'number' ? item.quantity : parseInt(String(item.quantity || 1), 10);
        const finalTotalPrice = finalPricePerUnit * finalQuantity;
        const finalDescription = productDetails?.pDescription || item.productDescription || "";
        const finalImage = productDetails?.image || item.image || "";
        
        console.log(`💰 Final item pricing:`, {
          pricePerUnit: finalPricePerUnit,
          quantity: finalQuantity,
          totalPrice: finalTotalPrice,
        });

        const itemCommand = new PutCommand({
          TableName: TABLE_NAME,
          Item: {
            PK,
            SK: `ITEM#${item.productId}`,
            type: "ORDER_ITEM",
            orderId,
            productId: item.productId,
            productName: finalProductName,
            productDescription: finalDescription,
            quantity: finalQuantity, // Ensure it's a number
            pricePerUnit: finalPricePerUnit, // Ensure it's a number
            totalPrice: finalTotalPrice, // Ensure it's a number
            selectedSize: item.selectedSize || undefined,
            image: finalImage || undefined,
          },
        });

        console.log(`\n🚀 Sending item PUT command to DynamoDB for: ${item.productId}`);
        console.log(`Item command details:`, JSON.stringify({
          TableName: TABLE_NAME,
          Item: {
            PK,
            SK: `ITEM#${item.productId}`,
            type: "ORDER_ITEM",
            orderId,
            productId: item.productId,
            productName: finalProductName,
            productDescription: finalDescription,
            quantity: finalQuantity,
            pricePerUnit: finalPricePerUnit,
            totalPrice: finalTotalPrice,
            selectedSize: item.selectedSize || undefined,
            image: finalImage || undefined,
          },
        }, null, 2));
        
        try {
          const itemResult = await ddbDocClient.send(itemCommand);
          console.log(`\n✅✅✅ Order item PUT command executed successfully for: ${item.productId} ✅✅✅`);
          console.log(`DynamoDB response:`, JSON.stringify(itemResult, null, 2));
          console.log(`✅ Order item saved successfully:`, {
            productId: item.productId,
            productName: finalProductName,
            quantity: finalQuantity,
            pricePerUnit: finalPricePerUnit,
            totalPrice: finalTotalPrice,
            size: item.selectedSize || 'N/A',
          });
        } catch (itemError: unknown) {
          console.error(`\n❌❌❌ CRITICAL: Error saving order item ${item.productId} ❌❌❌`);
          console.error("Error type:", itemError instanceof Error ? itemError.constructor.name : typeof itemError);
          console.error("Error message:", itemError instanceof Error ? itemError.message : String(itemError));
          console.error("Error code:", (itemError as any)?.code);
          console.error("Error name:", (itemError as any)?.name);
          console.error("Full error:", JSON.stringify(itemError, Object.getOwnPropertyNames(itemError), 2));
          throw itemError; // Re-throw to stop the process
        }
      } catch (itemError: unknown) {
        console.error(`❌ CRITICAL: Error processing order item ${item.productId}:`, itemError);
        throw itemError; // Re-throw to stop the process
      }
    }
    console.log("✅ All order items saved successfully");
    
    // Log complete order summary with item details
    console.log(`\n📋 ORDER SAVED SUCCESSFULLY - SUMMARY:`);
    console.log(`   Order ID: ${orderId}`);
    console.log(`   User ID: ${orderData.userId}`);
    console.log(`   User Email: ${orderData.userEmail}`);
    console.log(`   Total Amount: ₹${totalAmount.toLocaleString()}`);
    console.log(`   Items Count: ${orderData.items.length}`);
    console.log(`   Status: ${orderData.orderStatus}`);
    console.log(`   Created At: ${timestamp}`);
    console.log(`   DynamoDB Keys:`);
    console.log(`     - PK: ${PK}`);
    console.log(`     - SK: METADATA`);
    console.log(`     - GSI1PK: ${GSI1PK}`);
    console.log(`     - GSI1SK: ${GSI1SK}`);
    console.log(`   Order Items:`);
    for (const item of orderData.items) {
      console.log(`     - ${item.productName} (${item.selectedSize || 'N/A'}) x${item.quantity} = ₹${(item.pricePerUnit * item.quantity).toLocaleString()}`);
    }
    console.log(`✅ COMPLETE: Order ${orderId} fully saved to DynamoDB with ${orderData.items.length} items\n`);
  } catch (error) {
    console.error("❌ CRITICAL ERROR in saveOrder function:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    throw error;
  }
};

/**
 * Get order by order ID
 */
export const getOrderById = async (
  orderId: string
): Promise<OrderMetadata | null> => {
  try {
    const PK = `ORDER#${orderId}`;
    console.log("Fetching order by ID:", orderId, "PK:", PK);

    // Get order metadata
    const metadataCommand = new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        PK,
        SK: "METADATA",
      },
    });

    const metadataResult = await ddbDocClient.send(metadataCommand);

    if (!metadataResult.Item) {
      console.log("Order metadata not found for:", orderId);
      return null;
    }

    console.log("Order metadata found:", orderId);

    // Get all order items
    const itemsCommand = new QueryCommand({
      TableName: TABLE_NAME,
      KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
      ExpressionAttributeValues: {
        ":pk": PK,
        ":sk": "ITEM#",
      },
    });

    const itemsResult = await ddbDocClient.send(itemsCommand);
    console.log(`Found ${itemsResult.Items?.length || 0} items for order:`, orderId);
    const items: OrderItem[] = (itemsResult.Items || []).map((item) => ({
      productId: item.productId,
      productName: item.productName,
      productDescription: item.productDescription,
      quantity: item.quantity,
      pricePerUnit: item.pricePerUnit,
      totalPrice: item.totalPrice,
      selectedSize: item.selectedSize,
      image: item.image,
    }));

    return {
      orderId: metadataResult.Item.orderId,
      userId: metadataResult.Item.userId,
      userEmail: metadataResult.Item.userEmail,
      orderStatus: metadataResult.Item.orderStatus,
      totalAmount: metadataResult.Item.totalAmount,
      currency: metadataResult.Item.currency,
      shippingAddress: metadataResult.Item.shippingAddress,
      razorpayOrderId: metadataResult.Item.razorpayOrderId,
      razorpayPaymentId: metadataResult.Item.razorpayPaymentId,
      createdAt: metadataResult.Item.createdAt,
      items,
    };
  } catch (error) {
    console.error("Error in getOrderById:", error);
    throw error;
  }
};

/**
 * Get all orders for a user
 */
export const getUserOrders = async (userId: string): Promise<OrderMetadata[]> => {
  try {
    const GSI1PK = `USER#${userId}`;
    console.log("=== FETCHING ORDERS FOR USER ===");
    console.log("User ID:", userId);
    console.log("GSI1PK:", GSI1PK);

    let orderMetadataItems: any[] = [];

    // Try GSI1 query first
    try {
      const queryCommand = new QueryCommand({
        TableName: TABLE_NAME,
        IndexName: "GSI1",
        KeyConditionExpression: "GSI1PK = :gsi1pk AND begins_with(GSI1SK, :gsi1sk)",
        ExpressionAttributeValues: {
          ":gsi1pk": GSI1PK,
          ":gsi1sk": "ORDER#",
        },
        ScanIndexForward: false, // Most recent first
      });

      const queryResult = await ddbDocClient.send(queryCommand);
      console.log(`GSI1 query found ${queryResult.Items?.length || 0} order metadata items`);
      
      if (queryResult.Items && queryResult.Items.length > 0) {
        orderMetadataItems = queryResult.Items;
        console.log(`Found ${orderMetadataItems.length} order metadata items via GSI1`);
      }
    } catch (gsiError: unknown) {
      console.warn("GSI1 query failed, trying scan fallback:", gsiError instanceof Error ? gsiError.message : String(gsiError));
    }

    // If GSI1 didn't work, try scanning
    if (orderMetadataItems.length === 0) {
      console.log("Trying scan fallback to find orders...");
      try {
        const scanCommand = new ScanCommand({
          TableName: TABLE_NAME,
          FilterExpression: "#type = :type AND userId = :userId AND SK = :sk",
          ExpressionAttributeNames: {
            "#type": "type",
          },
          ExpressionAttributeValues: {
            ":type": "ORDER",
            ":userId": userId,
            ":sk": "METADATA",
          },
        });

        const scanResult = await ddbDocClient.send(scanCommand);
        console.log(`Scan found ${scanResult.Items?.length || 0} order metadata items`);
        
        if (scanResult.Items && scanResult.Items.length > 0) {
          orderMetadataItems = scanResult.Items;
          console.log(`Found ${orderMetadataItems.length} order metadata items via scan`);
        }
      } catch (scanError: unknown) {
        console.error("Scan fallback also failed:", scanError instanceof Error ? scanError.message : String(scanError));
      }
    }

    if (orderMetadataItems.length === 0) {
      console.log("No orders found for user:", userId);
      return [];
    }

    // Fetch full order details for each order
    const orders: OrderMetadata[] = [];
    for (const item of orderMetadataItems) {
      if (item.orderId) {
        try {
          const fullOrder = await getOrderById(item.orderId);
          if (fullOrder) {
            orders.push(fullOrder);
            console.log(`Loaded full order details for: ${item.orderId}`);
          } else {
            console.warn("Could not load full order details for:", item.orderId);
          }
        } catch (orderError) {
          console.error(`Error loading order ${item.orderId}:`, orderError);
        }
      } else {
        console.warn("Order metadata item missing orderId:", item);
      }
    }

    console.log(`Returning ${orders.length} orders for user:`, userId);
    return orders;
  } catch (error) {
    console.error("Error in getUserOrders:", error);
    throw error;
  }
};

/**
 * API endpoint: Get user orders
 */
export const getUserOrdersHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    if (!userId) {
      res.status(400).json({
        success: false,
        error: "User ID is required",
      });
      return;
    }

    const orders = await getUserOrders(userId);
    res.json({
      success: true,
      data: orders,
    });
  } catch (error: unknown) {
    console.error("Error in getUserOrdersHandler:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({
      success: false,
      error: errorMessage,
    });
  }
};

/**
 * API endpoint: Get order by ID
 */
export const getOrderByIdHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { orderId } = req.params;
    if (!orderId) {
      res.status(400).json({
        success: false,
        error: "Order ID is required",
      });
      return;
    }

    const order = await getOrderById(orderId);
    if (!order) {
      res.status(404).json({
        success: false,
        error: "Order not found",
      });
      return;
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error: unknown) {
    console.error("Error in getOrderByIdHandler:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({
      success: false,
      error: errorMessage,
    });
  }
};

/**
 * Get recent orders (for verification/debugging)
 */
export const getRecentOrdersHandler = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    
    console.log("=== FETCHING RECENT ORDERS ===");
    console.log("Limit:", limit);

    // Scan for recent orders
    const scanCommand = new ScanCommand({
      TableName: TABLE_NAME,
      FilterExpression: "#type = :type AND SK = :sk",
      ExpressionAttributeNames: {
        "#type": "type",
      },
      ExpressionAttributeValues: {
        ":type": "ORDER",
        ":sk": "METADATA",
      },
      Limit: limit * 2, // Get more to account for filtering
    });

    const scanResult = await ddbDocClient.send(scanCommand);
    console.log(`Scan found ${scanResult.Items?.length || 0} order metadata items`);
    
    // Sort by createdAt descending and limit
    const orders = (scanResult.Items || [])
      .sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return dateB - dateA;
      })
      .slice(0, limit)
      .map((item) => ({
        orderId: item.orderId,
        userId: item.userId,
        userEmail: item.userEmail,
        totalAmount: item.totalAmount,
        orderStatus: item.orderStatus,
        createdAt: item.createdAt,
        PK: item.PK,
        GSI1PK: item.GSI1PK,
        GSI1SK: item.GSI1SK,
      }));

    console.log(`Returning ${orders.length} recent orders`);
    
    res.json({
      success: true,
      data: orders,
      count: orders.length,
    });
  } catch (error: unknown) {
    console.error("❌ ERROR in getRecentOrdersHandler:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({
      success: false,
      error: errorMessage,
    });
  }
};

/**
 * Test endpoint to save order directly (for debugging)
 */
export const testSaveOrderHandler = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    console.log("\n🚨🚨🚨 TEST SAVE ORDER ENDPOINT CALLED 🚨🚨🚨");
    console.log("Timestamp:", new Date().toISOString());
    console.log("Request method:", req.method);
    console.log("Request URL:", req.url);
    console.log("Request headers:", JSON.stringify(req.headers, null, 2));
    
    const orderData = req.body;
    console.log("\n📦 Request body received:");
    console.log("Order data keys:", Object.keys(orderData || {}));
    console.log("Full order data:", JSON.stringify(orderData, null, 2));
    
    // Check DynamoDB connection
    console.log("\n🔍 Checking DynamoDB configuration:");
    console.log("Table name:", TABLE_NAME);
    console.log("DynamoDB client:", ddbDocClient ? "✅ Initialized" : "❌ Not initialized");
    
    // Validate required fields
    if (!orderData) {
      console.error("❌ No order data in request body");
      res.status(400).json({
        success: false,
        error: "Order data is required in request body",
      });
      return;
    }
    
    if (!orderData.orderId) {
      console.error("❌ Missing orderId");
      res.status(400).json({
        success: false,
        error: "orderId is required",
      });
      return;
    }
    if (!orderData.userId) {
      console.error("❌ Missing userId");
      res.status(400).json({
        success: false,
        error: "userId is required",
      });
      return;
    }
    if (!orderData.items || !Array.isArray(orderData.items) || orderData.items.length === 0) {
      console.error("❌ Missing or empty items array");
      res.status(400).json({
        success: false,
        error: "items array is required and must not be empty",
      });
      return;
    }
    
    console.log("\n✅ Validation passed, calling saveOrder...");
    console.log("Order ID:", orderData.orderId);
    console.log("User ID:", orderData.userId);
    console.log("Items count:", orderData.items.length);
    
    // Call saveOrder with detailed error handling
    try {
      await saveOrder(orderData);
      console.log("\n✅✅✅ saveOrder completed successfully ✅✅✅");
      console.log("Order ID:", orderData.orderId);
      
      res.json({
        success: true,
        message: "Order saved successfully to DynamoDB",
        orderId: orderData.orderId,
        timestamp: new Date().toISOString(),
      });
    } catch (saveError: unknown) {
      console.error("\n❌❌❌ saveOrder function threw an error ❌❌❌");
      console.error("Error type:", saveError instanceof Error ? saveError.constructor.name : typeof saveError);
      console.error("Error message:", saveError instanceof Error ? saveError.message : String(saveError));
      console.error("Error stack:", saveError instanceof Error ? saveError.stack : "No stack");
      throw saveError; // Re-throw to be caught by outer catch
    }
  } catch (error: unknown) {
    console.error("\n❌❌❌ CRITICAL ERROR in test save order handler ❌❌❌");
    console.error("Error type:", error instanceof Error ? error.constructor.name : typeof error);
    console.error("Error message:", error instanceof Error ? error.message : String(error));
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack");
    
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    res.status(500).json({
      success: false,
      error: errorMessage,
      details: errorStack,
      timestamp: new Date().toISOString(),
    });
  }
};

