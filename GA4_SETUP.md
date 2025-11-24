# GA4 Integration Setup Guide

This guide will help you set up Google Analytics 4 (GA4) integration for your SEO dashboard.

## Prerequisites

1. A Google Cloud Project with Analytics Data API enabled
2. OAuth 2.0 credentials configured
3. Access to a GA4 property

## Step 1: Set Up Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google Analytics Data API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Analytics Data API"
   - Click "Enable"

## Step 2: Create OAuth 2.0 Credentials

1. In Google Cloud Console, go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. If prompted, configure the OAuth consent screen:
   - User Type: External (for testing) or Internal (for organization)
   - App name: Your SEO Dashboard
   - User support email: Your email
   - Developer contact: Your email
   - Add scopes: `https://www.googleapis.com/auth/analytics.readonly`
   - Save and continue through the steps
4. Create OAuth Client ID:
   - Application type: **Web application**
   - Name: SEO Dashboard GA4 Integration
   - Authorized redirect URIs:
     - `http://localhost:5000/api/clients/ga4/callback` (for development)
     - `https://yourdomain.com/api/clients/ga4/callback` (for production)
   - Click "Create"
5. Copy the **Client ID** and **Client Secret**

## Step 3: Configure Environment Variables

Add the following to your `server/.env` file:

```env
# GA4 OAuth Credentials
GA4_CLIENT_ID=your_client_id_here.apps.googleusercontent.com
GA4_CLIENT_SECRET=your_client_secret_here
GA4_REDIRECT_URI=http://localhost:5000/api/clients/ga4/callback

# Application URLs
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:5000
```

**For production**, update the URLs:
```env
GA4_REDIRECT_URI=https://yourdomain.com/api/clients/ga4/callback
FRONTEND_URL=https://yourdomain.com
BACKEND_URL=https://api.yourdomain.com
```

## Step 4: Regenerate Prisma Client

After updating the schema, regenerate the Prisma client:

```bash
cd server
npx prisma generate
```

## Step 5: Find Your GA4 Property ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your GA4 property
3. Go to Admin (gear icon) > Property Settings
4. Copy the **Property ID** (numeric value, e.g., `123456789`)
   - You can use just the number or the full format `properties/123456789`

## Step 6: Test the Integration

1. Start your server:
   ```bash
   cd server
   npm run dev
   ```

2. Start your frontend:
   ```bash
   cd app
   npm run dev
   ```

3. Create a new client or open an existing client dashboard
4. Click "Connect GA4" button
5. Complete the OAuth flow:
   - You'll be redirected to Google
   - Sign in and authorize the application
   - You'll be redirected back to your app
6. Enter your GA4 Property ID when prompted
7. Verify that real traffic data appears on the dashboard

## Troubleshooting

### "GA4 credentials not configured" error
- Make sure `GA4_CLIENT_ID` and `GA4_CLIENT_SECRET` are set in your `.env` file
- Restart your server after updating `.env`

### "Invalid redirect URI" error
- Make sure the redirect URI in your `.env` matches exactly what you configured in Google Cloud Console
- Check that the redirect URI is added to your OAuth client's authorized redirect URIs

### "GA4 property not configured" error
- Make sure you've entered the Property ID after completing OAuth
- Verify the Property ID is correct (check in GA4 Admin > Property Settings)

### "Failed to refresh access token" error
- The refresh token may have expired or been revoked
- Disconnect and reconnect GA4 to get a new refresh token

### No traffic data showing
- Verify GA4 is connected (check the status endpoint)
- Make sure your GA4 property has data for the selected date range
- Check server logs for any API errors

## API Endpoints

- `GET /api/clients/:id/ga4/status` - Check GA4 connection status
- `GET /api/clients/:id/ga4/auth-url` - Get OAuth authorization URL
- `GET /api/clients/ga4/callback` - OAuth callback handler
- `POST /api/clients/:id/ga4/connect` - Connect with Property ID
- `POST /api/clients/:id/ga4/disconnect` - Disconnect GA4

## Security Notes

- Never commit your `.env` file to version control
- Use environment-specific OAuth credentials for production
- Regularly rotate OAuth credentials
- Monitor API usage to avoid quota limits

