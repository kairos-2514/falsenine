# AWS Amplify Deployment Guide

This guide will help you deploy the FalseNine client application to AWS Amplify.

## Prerequisites

1. AWS Account with Amplify access
2. GitHub/GitLab/Bitbucket repository connected to Amplify
3. Lambda API URL: `https://keqnorvuhe.execute-api.ap-south-1.amazonaws.com`

## Deployment Steps

### 1. Connect Repository to Amplify

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click "New app" → "Host web app"
3. Connect your repository (GitHub, GitLab, or Bitbucket)
4. Select your repository and branch

### 2. Configure Build Settings

**Important:** Set the **App root directory** to `client` in Amplify console.

The `amplify.yml` file is already configured in the `client` directory. Amplify will automatically detect it.

### 3. Configure Environment Variables

In the Amplify Console, go to **App settings** → **Environment variables** and add:

#### Required Environment Variables:

```env
NEXT_PUBLIC_API_URL=https://keqnorvuhe.execute-api.ap-south-1.amazonaws.com
```

#### Optional Environment Variables (for S3 images):

```env
NEXT_PUBLIC_S3_BASE_URL=https://falsenine-image-storage.s3.ap-south-1.amazonaws.com
NEXT_PUBLIC_IMAGE_HERO_SECTION=hero-section-image.png
NEXT_PUBLIC_IMAGE_BANNER=banner-image.png
NEXT_PUBLIC_IMAGE_ABOUT_SECTION=about-section-image.png
NEXT_PUBLIC_IMAGE_CONTACT_SECTION=contact-section-image.png
NEXT_PUBLIC_IMAGE_LEFT_SIDE=left-side-image.png
NEXT_PUBLIC_IMAGE_RIGHT_SIDE=right-side-image.png
```

**Note:** If `NEXT_PUBLIC_API_URL` is not set, the app will automatically use the Lambda URL in production mode.

### 4. Build Settings

The `amplify.yml` file is configured with:

- **Pre-build:** `npm ci` (installs dependencies)
- **Build:** `npm run build` (builds Next.js app)
- **Artifacts:** `.next` directory
- **Cache:** `node_modules` and `.next/cache`

### 5. Deploy

1. Review the build settings
2. Click "Save and deploy"
3. Wait for the build to complete (usually 5-10 minutes)

## File Structure Analysis

### Key Files Modified for Deployment:

1. **`amplify.yml`** - Amplify build configuration
   - Removed incorrect `cd client` commands (since app root is set to `client`)
   - Fixed artifact paths to use `.next` instead of `client/.next`
   - Fixed cache paths

2. **`package.json`** - Build script
   - Removed `--turbopack` flag from build script (not supported in Amplify)
   - Kept `--turbopack` for dev script (local development only)

3. **`src/api/config.ts`** - API configuration
   - Updated to use Lambda URL as default in production
   - Falls back to localhost in development
   - Can be overridden with `NEXT_PUBLIC_API_URL` environment variable

4. **`src/api/order.ts`** - Order API
   - Fixed to use centralized `API_BASE_URL` from `config.ts`
   - Removed duplicate API_BASE_URL definition

### API Files Structure:

All API files use the centralized configuration:

- ✅ `src/api/config.ts` - Central API configuration
- ✅ `src/api/auth.ts` - Uses `apiFetch` from config
- ✅ `src/api/product.ts` - Uses `apiFetch` from config
- ✅ `src/api/address.ts` - Uses `apiFetch` from config
- ✅ `src/api/contact.ts` - Uses `apiFetch` from config
- ✅ `src/api/order.ts` - Now uses `API_BASE_URL` from config

## Troubleshooting

### Build Fails

1. **Check Node.js version:** Amplify should use Node.js 18.x or 20.x
   - Go to **App settings** → **Build settings** → **Build image settings**
   - Select Node.js 20.x

2. **Check environment variables:** Ensure all required variables are set

3. **Check build logs:** Review the build logs in Amplify console for specific errors

### API Calls Fail

1. **Verify API URL:** Check that `NEXT_PUBLIC_API_URL` is set correctly
2. **Check CORS:** Ensure your Lambda API has CORS configured for your Amplify domain
3. **Check API Gateway:** Verify the Lambda API is accessible

### Images Not Loading

1. **Verify S3 URLs:** Check that `NEXT_PUBLIC_S3_BASE_URL` is correct
2. **Check S3 permissions:** Ensure S3 bucket allows public read access
3. **Verify image paths:** Check that image file names match in S3

## Post-Deployment

After successful deployment:

1. **Test the application:** Visit your Amplify app URL
2. **Test API connectivity:** Verify all API endpoints work
3. **Test images:** Verify all images load correctly
4. **Monitor logs:** Check CloudWatch logs for any errors

## Custom Domain (Optional)

1. Go to **App settings** → **Domain management**
2. Add your custom domain
3. Follow the DNS configuration instructions
4. Wait for SSL certificate provisioning (usually 30-60 minutes)

## Continuous Deployment

Amplify automatically deploys when you push to your connected branch. To deploy manually:

1. Go to **App** → **Deployments**
2. Click "Redeploy this version" or trigger a new deployment

## Support

For issues:
- Check [AWS Amplify Documentation](https://docs.aws.amazon.com/amplify/)
- Review build logs in Amplify console
- Check Next.js deployment documentation


