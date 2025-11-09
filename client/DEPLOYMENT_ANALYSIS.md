# Complete Code Analysis for Amplify Deployment

This document provides a line-by-line analysis of all files modified and reviewed for AWS Amplify deployment.

## 1. amplify.yml

**Location:** `client/amplify.yml`

**Purpose:** AWS Amplify build configuration file

**Analysis:**
```yaml
version: 1                    # Amplify configuration version
frontend:                     # Frontend build configuration
  phases:                     # Build phases
    preBuild:                 # Pre-build phase (before build)
      commands:
        - npm ci              # Clean install dependencies (uses package-lock.json)
                              # Changed from: cd client && npm ci
                              # Reason: App root is set to 'client' in Amplify
    build:                    # Build phase
      commands:
        - npm run build       # Run Next.js build
                              # Changed from: cd client && npx next build
                              # Reason: Already in client directory
                              # Removed --turbopack flag (not supported in Amplify)
  artifacts:                  # Build output configuration
    baseDirectory: .next      # Changed from: client/.next
                              # Reason: Build runs from client directory
    files:
      - '**/*'                # Include all files from .next directory
  cache:                      # Caching configuration for faster builds
    paths:
      - node_modules/**/*     # Changed from: client/node_modules/**/*
      - .next/cache/**/*      # Changed from: client/.next/cache/**/*
                              # Reason: Paths relative to client directory
```

**Changes Made:**
- Removed `cd client` commands (app root is `client`)
- Fixed artifact baseDirectory path
- Fixed cache paths
- Uses `npm run build` instead of direct `npx next build`

---

## 2. package.json

**Location:** `client/package.json`

**Purpose:** Node.js project configuration and dependencies

**Analysis:**
```json
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",    # Development server with Turbopack
                                       # Kept --turbopack for local dev
    "build": "next build",             # Production build
                                       # CHANGED: Removed --turbopack flag
                                       # Reason: Turbopack not supported in Amplify
    "start": "next start",             # Start production server
    "lint": "eslint"                   # Lint code
  },
  "dependencies": {
    "@splinetool/react-spline": "^4.1.0",  # 3D graphics library
    "axios": "^1.13.2",                     # HTTP client
    "framer-motion": "^12.23.24",           # Animation library
    "lucide-react": "^0.545.0",             # Icon library
    "mongodb": "^7.0.0",                    # MongoDB driver (if needed)
    "next": "^15.5.6",                       # Next.js framework
    "react": "19.1.0",                       # React library
    "react-dom": "19.1.0",                   # React DOM
    "resend": "^6.4.2"                      # Email service
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",                # ESLint config
    "@tailwindcss/postcss": "^4",            # Tailwind CSS
    "@types/node": "^20.19.24",              # Node.js types
    "@types/react": "^19",                   # React types
    "@types/react-dom": "^19",               # React DOM types
    "eslint": "^9",                          # Linter
    "eslint-config-next": "15.5.3",          # Next.js ESLint config
    "tailwindcss": "^4",                     # Tailwind CSS
    "typescript": "^5"                       # TypeScript
  }
}
```

**Changes Made:**
- Removed `--turbopack` from build script
- Kept `--turbopack` in dev script for local development

---

## 3. src/api/config.ts

**Location:** `client/src/api/config.ts`

**Purpose:** Central API configuration and fetch utilities

**Line-by-Line Analysis:**

```typescript
// ============================================================================
// API CONFIGURATION
// ============================================================================

/**
 * Base API URL
 * Can be configured via NEXT_PUBLIC_API_URL environment variable
 * Defaults to Lambda API URL for production, localhost for development
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||           // Check environment variable first
  (process.env.NODE_ENV === "production"      // If not set, check environment
    ? "https://keqnorvuhe.execute-api.ap-south-1.amazonaws.com"  // Production: Lambda URL
    : "http://localhost:4000");               // Development: Local server
// CHANGED: Added automatic Lambda URL for production
// Reason: Ensures production uses Lambda API without requiring env var

/**
 * Default fetch options
 */
export const defaultFetchOptions: RequestInit = {
  headers: {
    "Content-Type": "application/json",        // JSON content type
  },
};

/**
 * API Response wrapper
 */
export interface ApiResponse<T = unknown> {
  success: boolean;                            // Request success flag
  data?: T;                                    // Response data (generic type)
  error?: string;                              // Error message
  message?: string;                            // Success message
}

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(
    message: string,                           // Error message
    public status?: number,                    // HTTP status code
    public response?: ApiResponse              // Full API response
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Base fetch wrapper with error handling
 */
export async function apiFetch<T = unknown>(
  endpoint: string,                            // API endpoint (e.g., "/api/products")
  options?: RequestInit                        // Fetch options (method, body, headers)
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;   // Construct full URL
                                              // Uses API_BASE_URL from above

  try {
    const response = await fetch(url, {        // Make HTTP request
      ...defaultFetchOptions,                  // Merge default options
      ...options,                              // Merge custom options
      headers: {
        ...defaultFetchOptions.headers,        // Default headers
        ...options?.headers,                   // Custom headers (can override)
      },
    });

    const data: ApiResponse<T> = await response.json();  // Parse JSON response

    if (!response.ok) {                       // Check HTTP status
      throw new ApiError(
        data.error || `Request failed with status ${response.status}`,
        response.status,
        data
      );
    }

    return data;                              // Return successful response
  } catch (error) {
    if (error instanceof ApiError) {          // Re-throw API errors
      throw error;
    }

    // Handle network errors, timeouts, etc.
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new ApiError(
        "Network error. Please check your connection and try again."
      );
    }

    throw new ApiError(
      error instanceof Error ? error.message : "An unexpected error occurred"
    );
  }
}
```

**Changes Made:**
- Updated `API_BASE_URL` to automatically use Lambda URL in production
- Falls back to localhost in development
- Can still be overridden with `NEXT_PUBLIC_API_URL` environment variable

---

## 4. src/api/order.ts

**Location:** `client/src/api/order.ts`

**Purpose:** Order-related API functions

**Line-by-Line Analysis:**

```typescript
import axios from "axios";                    // HTTP client library
import { ApiResponse, ApiError, API_BASE_URL } from "./config";
// CHANGED: Now imports API_BASE_URL from config.ts
// REMOVED: const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
// Reason: Centralized configuration prevents duplication

export interface OrderItem {
  productId: string;                         // Product identifier
  productName: string;                        // Product name
  productDescription?: string;               // Optional description
  quantity: number;                           // Item quantity
  pricePerUnit: number;                      // Price per unit
  totalPrice: number;                        // Total price (quantity * pricePerUnit)
  selectedSize?: string;                     // Optional size selection
  image?: string;                            // Optional product image
}

export interface OrderMetadata {
  orderId: string;                           // Unique order ID
  userId: string;                            // User who placed order
  userEmail: string;                         // User email
  orderStatus: string;                       // Order status (pending, completed, etc.)
  totalAmount: number;                       // Total order amount
  currency: string;                          // Currency code (e.g., "INR")
  shippingAddress: {                         // Shipping address object
    fullName: string;
    phoneNumber: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pinCode: string;
    country: string;
  };
  razorpayOrderId?: string;                 // Razorpay order ID (if payment processed)
  razorpayPaymentId?: string;               // Razorpay payment ID
  createdAt: string;                         // Order creation timestamp
  items: OrderItem[];                        // Array of order items
}

export async function getUserOrders(
  userId: string                            // User ID to fetch orders for
): Promise<ApiResponse<OrderMetadata[]>> {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/orders/user/${userId}`  // Uses centralized API_BASE_URL
    );
    return {
      success: true,
      data: response.data.data,          // Extract data from response
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new ApiError(
        error.response.data?.error || "Failed to fetch orders",
        error.response.status
      );
    }
    throw new ApiError("Network error. Please check your connection.");
  }
}

export async function getOrderById(
  orderId: string                           // Order ID to fetch
): Promise<ApiResponse<OrderMetadata>> {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/orders/${orderId}`);
    // Uses centralized API_BASE_URL
    return {
      success: true,
      data: response.data.data,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new ApiError(
        error.response.data?.error || "Failed to fetch order",
        error.response.status
      );
    }
    throw new ApiError("Network error. Please check your connection.");
  }
}
```

**Changes Made:**
- Removed duplicate `API_BASE_URL` definition
- Now imports `API_BASE_URL` from `config.ts`
- Ensures consistent API URL across all API files

---

## 5. Other API Files (No Changes Needed)

### src/api/auth.ts
- ✅ Already uses `apiFetch` from `config.ts`
- ✅ All endpoints use centralized configuration
- ✅ No changes required

### src/api/product.ts
- ✅ Already uses `apiFetch` from `config.ts`
- ✅ All endpoints use centralized configuration
- ✅ No changes required

### src/api/address.ts
- ✅ Already uses `apiFetch` from `config.ts`
- ✅ All endpoints use centralized configuration
- ✅ No changes required

### src/api/contact.ts
- ✅ Already uses `apiFetch` from `config.ts`
- ✅ All endpoints use centralized configuration
- ✅ No changes required

### src/api/index.ts
- ✅ Central export point for all API functions
- ✅ No changes required

---

## 6. next.config.ts

**Location:** `client/next.config.ts`

**Purpose:** Next.js framework configuration

**Analysis:**
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 80, 85, 90, 95, 100],     // Image quality options
    remotePatterns: [
      {
        protocol: "https",                     // HTTPS only
        hostname: "falsenine-image-storage.s3.ap-south-1.amazonaws.com",
        // S3 bucket for images
        pathname: "/**",                       // Allow all paths
      },
    ],
    minimumCacheTTL: 60,                      // Minimum cache time (60 seconds)
    dangerouslyAllowSVG: false,                // Disable SVG for security
    unoptimized: false,                        // Enable image optimization
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes for different use cases
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
```

**Status:** ✅ No changes needed
- Configuration is correct for Amplify deployment
- S3 image configuration is properly set up

---

## Summary of All Changes

### Files Modified:
1. ✅ `amplify.yml` - Fixed build configuration
2. ✅ `package.json` - Removed Turbopack from build script
3. ✅ `src/api/config.ts` - Added Lambda URL as production default
4. ✅ `src/api/order.ts` - Fixed to use centralized API_BASE_URL

### Files Reviewed (No Changes):
- `src/api/auth.ts` - Already correct
- `src/api/product.ts` - Already correct
- `src/api/address.ts` - Already correct
- `src/api/contact.ts` - Already correct
- `src/api/index.ts` - Already correct
- `next.config.ts` - Already correct

### Key Improvements:
1. **Centralized API Configuration:** All API calls now use the same base URL
2. **Production-Ready:** Automatically uses Lambda URL in production
3. **Amplify-Compatible:** Build configuration works with AWS Amplify
4. **Environment Variable Support:** Can override API URL via environment variables

---

## Deployment Checklist

- [x] Fixed `amplify.yml` build configuration
- [x] Removed Turbopack from build script
- [x] Updated API config to use Lambda URL
- [x] Fixed duplicate API_BASE_URL in order.ts
- [x] Created deployment documentation
- [x] Verified all API files use centralized config
- [x] No linting errors

**Ready for deployment!** 🚀


