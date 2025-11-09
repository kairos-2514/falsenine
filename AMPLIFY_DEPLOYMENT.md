# AWS Amplify Deployment Guide

This guide will help you deploy the Next.js client application to AWS Amplify.

## Prerequisites

1. An AWS account
2. Your code pushed to a Git repository (GitHub, GitLab, Bitbucket, or AWS CodeCommit)
3. Node.js 18+ (Amplify will use this automatically)

## Step 1: Create an Amplify App

1. Go to the [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click **"New app"** → **"Host web app"**
3. Connect your Git provider (GitHub, GitLab, Bitbucket, or AWS CodeCommit)
4. Select your repository and branch
5. **Important**: In the build settings, Amplify should auto-detect Next.js, but you may need to configure it manually

## Step 2: Configure Build Settings

Amplify should auto-detect the `amplify.yml` file at the root of your repository. If it doesn't, use these build settings:

**Build image**: Amazon Linux 2023
**Build settings**: Use the `amplify.yml` file at the root of your repository

If you need to configure manually in the Amplify console:

The `amplify.yml` file is already configured at the root of your repository. It uses `npx next build` (without Turbopack) for better compatibility with Amplify's build environment.

## Step 3: Configure Environment Variables

In the Amplify Console, go to **App settings** → **Environment variables** and add the following:

### Required Environment Variables

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://your-api-domain.com

# S3 Image Storage Configuration
NEXT_PUBLIC_S3_BASE_URL=https://falsenine-image-storage.s3.ap-south-1.amazonaws.com

# Image Paths
NEXT_PUBLIC_IMAGE_HERO_SECTION=hero-section-image.png
NEXT_PUBLIC_IMAGE_BANNER=banner-image.png
NEXT_PUBLIC_IMAGE_ABOUT_SECTION=about-section-image.png
NEXT_PUBLIC_IMAGE_CONTACT_SECTION=contact-section-image.png
NEXT_PUBLIC_IMAGE_LEFT_SIDE=left-side-image.png
NEXT_PUBLIC_IMAGE_RIGHT_SIDE=right-side-image.png

# Razorpay Configuration (if using payments)
NEXT_PUBLIC_RAZORPAY_TEST_KEY_ID=your_razorpay_key_id
```

**Important Notes:**
- Replace `https://your-api-domain.com` with your actual backend API URL
- Replace `your_razorpay_key_id` with your actual Razorpay key if you're using payments
- All variables prefixed with `NEXT_PUBLIC_` will be available in the browser

## Step 4: Configure Next.js Output

Since you're using Next.js 15, Amplify will automatically handle:
- Static site generation (SSG)
- Server-side rendering (SSR)
- API routes (if any)

Make sure your `next.config.ts` is properly configured (it already is).

## Step 5: Deploy

1. After configuring everything, click **"Save and deploy"**
2. Amplify will:
   - Install dependencies
   - Build your Next.js app
   - Deploy to a CloudFront distribution
3. Wait for the build to complete (usually 5-10 minutes)

## Step 6: Custom Domain (Optional)

1. Go to **App settings** → **Domain management**
2. Click **"Add domain"**
3. Enter your domain name
4. Follow the DNS configuration instructions

## Troubleshooting

### Build Fails

1. **Check build logs**: Look for specific error messages
2. **Node version**: Ensure you're using Node.js 18+ (Amplify defaults to this)
3. **Turbopack**: If you encounter issues with `--turbopack`, the build command in `amplify.yml` uses regular build without Turbopack

### Environment Variables Not Working

1. Make sure all variables are prefixed with `NEXT_PUBLIC_` for client-side access
2. Redeploy after adding/changing environment variables
3. Check that variables are set in the correct environment (production, preview, etc.)

### API Connection Issues

1. Ensure your backend API is deployed and accessible
2. Check CORS settings on your backend to allow requests from your Amplify domain
3. Verify `NEXT_PUBLIC_API_URL` is set correctly

### Image Loading Issues

1. Verify S3 bucket permissions allow public read access
2. Check that `NEXT_PUBLIC_S3_BASE_URL` is correct
3. Ensure image paths in environment variables match actual S3 object keys

## Additional Resources

- [AWS Amplify Documentation](https://docs.aws.amazon.com/amplify/)
- [Next.js on Amplify](https://docs.aws.amazon.com/amplify/latest/userguide/deploy-nextjs-app.html)
- [Environment Variables in Amplify](https://docs.aws.amazon.com/amplify/latest/userguide/environment-variables.html)

## Quick Reference

- **Amplify Console**: https://console.aws.amazon.com/amplify/
- **Build logs**: Available in the Amplify console under each deployment
- **App URL**: Provided after first successful deployment (format: `https://<branch>.<app-id>.amplifyapp.com`)

