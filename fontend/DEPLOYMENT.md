# Frontend Deployment Guide

## Vercel Deployment Setup

### Prerequisites
1. Create a [Vercel account](https://vercel.com/signup)
2. Install Vercel CLI: `npm install -g vercel`
3. Connect your GitHub repository to Vercel

### Quick Deploy (Manual)

1. **From the frontend directory:**
   ```bash
   cd frontend
   npm install
   npm run build
   vercel --prod
   ```

2. **Follow the prompts:**
   - Link to existing project or create new one
   - Set project name: `loopr-frontend`
   - Set framework preset: `Vite`

### Environment Variables Setup

In your Vercel dashboard, set these environment variables:

#### Production Environment
- `VITE_API_URL`: Your production backend API URL
  - Example: `https://your-backend.vercel.app/api`

#### Preview Environment  
- `VITE_API_URL`: Your staging/preview backend API URL
  - Example: `https://your-backend-preview.vercel.app/api`

### Automated Deployment (GitHub Actions)

1. **Set up GitHub Secrets:**
   - Go to your repository → Settings → Secrets and variables → Actions
   - Add these secrets:
     - `VERCEL_TOKEN`: Your Vercel token (from Vercel dashboard → Settings → Tokens)
     - `VERCEL_ORG_ID`: Your Vercel organization ID (from Vercel dashboard → Settings → General)
     - `VERCEL_PROJECT_ID`: Your project ID (from Vercel project → Settings → General)

2. **Deployment Flow:**
   - **Pull Requests**: Creates preview deployments
   - **Push to `develop`**: Deploys to preview environment
   - **Push to `main`**: Deploys to production

### Custom Domain Setup

1. In Vercel dashboard → Project → Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed by Vercel

### Performance Optimizations

The project is configured with:
- ✅ Code splitting (vendor, MUI, charts chunks)
- ✅ Asset optimization and caching
- ✅ Gzip compression
- ✅ Security headers
- ✅ SPA routing support

### Monitoring

Access your deployment stats:
- **Dashboard**: https://vercel.com/dashboard
- **Analytics**: Available in Vercel Pro plan
- **Function logs**: For any serverless functions

### Local Development

```bash
# Start development server
npm run dev

# Build for production locally
npm run build:prod

# Preview production build
npm run preview
```

### Troubleshooting

**Build Failures:**
- Check environment variables are set correctly
- Ensure all dependencies are in package.json
- Review build logs in Vercel dashboard

**Runtime Issues:**
- Check browser console for API connection errors
- Verify CORS settings on backend
- Ensure environment variables are accessible

**Performance Issues:**
- Use Vercel Analytics to identify bottlenecks
- Check network tab for slow API calls
- Review bundle size and optimize imports
