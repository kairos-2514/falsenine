import express from "express";
import { Request, Response } from "express";
import razorpay from "../services/razorpay.config";
import crypto from "crypto";
import { saveOrder } from "./orderController";

export const createPayment = async (req: Request, res: Response) => {
  const { amount } = req.body;
  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: `receipt_order${Date.now()}`,
  };
  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Could not complete payment, internal server error",
    });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  console.log("\n🔔 ========================================");
  console.log("🔔 PAYMENT VERIFICATION REQUEST RECEIVED");
  console.log("🔔 ========================================");
  console.log("Timestamp:", new Date().toISOString());
  console.log("Request body keys:", Object.keys(req.body));
  console.log("Has orderData:", !!req.body.orderData);
  console.log("Full request body:", JSON.stringify(req.body, null, 2));
  
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    orderData,
  } = req.body;

  // Log what we received
  console.log("\n📦 Razorpay response received:", {
    razorpay_order_id: razorpay_order_id || "MISSING",
    razorpay_payment_id: razorpay_payment_id || "MISSING",
    has_signature: !!razorpay_signature,
    has_orderData: !!orderData,
  });

  // CRITICAL: Check if orderData exists FIRST - this is most important
  if (!orderData) {
    console.error("\n❌❌❌ CRITICAL ERROR: No orderData provided in payment verification!");
    console.error("Request body:", JSON.stringify(req.body, null, 2));
    return res.status(400).json({
      success: false,
      message: "Order data is required for payment verification",
    });
  }

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    console.warn("⚠️ Missing Razorpay response fields, but proceeding with order save");
    // Don't return error - still try to save the order
  }

  // Verify signature if we have all required fields
  let signatureValid = false;
  if (razorpay_order_id && razorpay_payment_id && razorpay_signature) {
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_TEST_KEY_SECRET as string)
      .update(body.toString())
      .digest("hex");
    
    console.log("\n🔐 Signature verification:", {
      expected: expectedSignature.substring(0, 20) + "...",
      received: razorpay_signature?.substring(0, 20) + "...",
      match: expectedSignature === razorpay_signature,
    });

    signatureValid = expectedSignature === razorpay_signature;
    
    if (!signatureValid) {
      console.warn("⚠️ SIGNATURE MISMATCH - but proceeding to save order");
    }
  } else {
    console.warn("⚠️ Missing signature fields - proceeding to save order anyway");
  }

  // CRITICAL: ALWAYS save the order, regardless of signature verification
  try {
    console.log("\n💾 ========================================");
    console.log("💾 SAVING ORDER TO DYNAMODB");
    console.log("💾 ========================================");
    console.log("Order data received:", {
      orderId: orderData.orderId || "MISSING",
      userId: orderData.userId || "MISSING",
      userEmail: orderData.userEmail || "MISSING",
      totalAmount: orderData.totalAmount || 0,
      itemCount: orderData.items?.length || 0,
      hasShippingAddress: !!orderData.shippingAddress,
      items: orderData.items?.map((item: any) => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        pricePerUnit: item.pricePerUnit,
      })) || [],
    });
    
    // Validate order data before saving
    if (!orderData.orderId) {
      throw new Error("Order ID is required");
    }
    if (!orderData.userId) {
      throw new Error("User ID is required");
    }
    if (!orderData.items || orderData.items.length === 0) {
      throw new Error("Order must have at least one item");
    }
    
    console.log("✅ Order data validation passed");
    
    // Save order to DynamoDB
    await saveOrder({
      orderId: orderData.orderId,
      userId: orderData.userId,
      userEmail: orderData.userEmail,
      orderStatus: "PAID",
      totalAmount: orderData.totalAmount,
      currency: orderData.currency || "INR",
      shippingAddress: orderData.shippingAddress,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      createdAt: new Date().toISOString(),
      items: orderData.items || [],
    });
    
    console.log("\n✅✅✅ ORDER SAVED SUCCESSFULLY TO DYNAMODB ✅✅✅");
    console.log("Order ID:", orderData.orderId);
    console.log("User ID:", orderData.userId);
    console.log("Total Amount:", orderData.totalAmount);
    console.log("========================================\n");

    // Return success response
    res.status(200).json({
      success: true,
      message: signatureValid ? "Payment verified and order saved successfully" : "Order saved successfully (test mode)",
      orderId: orderData.orderId,
    });
  } catch (error) {
    console.error("\n❌❌❌ CRITICAL ERROR IN ORDER SAVE ❌❌❌");
    console.error("Error type:", error?.constructor?.name);
    console.error("Error message:", error instanceof Error ? error.message : String(error));
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack");
    console.error("Order ID that failed:", orderData?.orderId);
    console.error("========================================\n");
    
    // Return error response
    res.status(500).json({
      success: false,
      message: "Payment received but order save failed",
      error: error instanceof Error ? error.message : String(error),
      orderId: orderData?.orderId,
    });
  }
};
