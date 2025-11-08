import dotenv from "dotenv";
dotenv.config();

interface TwilioConfig {
  accountSid: string;
  authToken: string;
  verifyServiceSid: string;
  phoneNumber?: string;
  otpLength: number;
  otpExpiry: number;
  maxAttempts: number;
  rateLimitWindow: number;
  maxRequestsPerWindow: number;
}

const twilioConfig: TwilioConfig = {
  accountSid: process.env.TWILIO_ACCOUNT_SID || "",
  authToken: process.env.TWILIO_AUTH_TOKEN || "",
  verifyServiceSid: process.env.TWILIO_VERIFY_SERVICE_SID || "",

  phoneNumber: process.env.TWILIO_PHONE_NUMBER,

  otpLength: 6,
  otpExpiry: 10,
  maxAttempts: 3,

  rateLimitWindow: 15,
  maxRequestsPerWindow: 5,
};

export default twilioConfig;
