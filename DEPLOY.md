# Netlify Deployment Guide

## Project Ready for Deployment

Your trip blogs site is ready to deploy to Netlify under the project name "trip-blogs".

## Deployment Options

### Option 1: Deploy via Netlify UI (Recommended)

1. Go to: https://app.netlify.com/teams/wwzjustin/projects
2. Click "Add new site" > "Import an existing project"
3. Connect your Git repository (GitHub, GitLab, or Bitbucket)
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Site name: `trip-blogs`
5. Click "Deploy site"

### Option 2: Deploy via Netlify CLI

1. Authenticate with Netlify:
   ```bash
   npx netlify login
   ```

2. Initialize the site:
   ```bash
   npx netlify init
   ```
   - Choose "Create & configure a new site"
   - Select your team: wwzjustin
   - Site name: trip-blogs

3. Deploy to production:
   ```bash
   npx netlify deploy --prod
   ```

### Option 3: Drag & Drop Deploy

1. Go to: https://app.netlify.com/drop
2. Drag the `dist` folder (already built) directly into the browser
3. Your site will be instantly deployed

## Build Output

The project has been successfully built and is located in the `dist` folder.

- Build size: ~900 KB (gzipped: ~197 KB)
- All assets are optimized for production
- Static site with no server dependencies

## Post-Deployment

Once deployed, your site will be live at:
- `https://trip-blogs.netlify.app`
- Or a custom domain if you configure one

## Configuration Files

- `netlify.toml` - Netlify build configuration
- `.env` - Environment variables (Supabase credentials, not currently used)
