# Environment Variables Setup

## IndexNow Configuration

To use IndexNow functionality, you need to set the following environment variables:

### Required Variables

```bash
# IndexNow API Key (generate one at https://www.indexnow.org/)
INDEXNOW_API_KEY=your_generated_api_key_here

# IndexNow API Endpoint (usually default)
INDEXNOW_ENDPOINT=https://api.indexnow.org/indexnow

# Enable/Disable IndexNow (optional, default: true)
NEXT_PUBLIC_INDEXNOW_ENABLE=true
```

### How to Set Environment Variables

#### Local Development
Create a `.env.local` file in your project root:
```bash
cp .env.example .env.local
# Edit .env.local with your actual values
```

#### Vercel Deployment
1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add the variables above

#### Other Platforms
Set environment variables according to your hosting platform's documentation.

### Security Notes
- Never commit API keys to version control
- Use environment variables for all sensitive information
- Regularly rotate your API keys
- Monitor for security alerts from tools like GitGuardian

## Other Environment Variables

See `conf/plugin.config.js` for all available configuration options.
