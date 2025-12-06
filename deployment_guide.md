# Deployment Guide for AI Agent Builder

Your project is now ready for deployment on Vercel. I have fixed the build errors and verified that `npm run build` passes locally.

## Changes Made
1. **Fixed Import Error**: Corrected `RefreshCcwIcon` to `RefreshCcw` in `app/agent-builder/[agentId]/preview/page.tsx`.
2. **Refactored `nodeTypes`**: Moved `nodeTypes` definition to `app/agent-builder/[agentId]/nodeTypes.ts` to resolve Next.js page export conflicts.
3. **Installed Missing Dependency**: Installed `@shikijs/transformers` which was required by `shadcn-io/code-block`.

## Deployment Checklist

### 1. Push Changes to Repository
Commit and push the changes I made to your git repository.
```bash
git add .
git commit -m "Fix build errors for Vercel deployment"
git push
```

### 2. Configure Vercel Project
1. Go to [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New > Project**.
3. Import your `ai_agent_builder` repository.
4. Framework Preset should automatically be **Next.js**.

### 3. Environment Variables
Add the following Environment Variables in Vercel under **Settings > Environment Variables**:

| Variable Name | Description | Source |
| dist | --- | --- |
| `NEXT_PUBLIC_CONVEX_URL` | URL of your Convex backend | Convex Dashboard |
| `CONVEX_DEPLOYMENT` | Deployment ID (e.g. `dev:..., prod:...`) | Convex Dashboard / `.env.local` |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk Publishable Key | Clerk Dashboard |
| `CLERK_SECRET_KEY` | Clerk Secret Key | Clerk Dashboard |
| `OPENAI_API_KEY` | OpenAI API Key for AI features | OpenAI Dashboard |

> **Note**: For production, make sure to use your **Production** keys for Convex and Clerk.

### 4. Deploy Convex
You need to deploy your Convex functions to the production environment associated with your Vercel project.
```bash
npx convex deploy
```
Or configure the [Convex Vercel Integration](https://docs.convex.dev/production/hosting/vercel) to handle this automatically.

### 5. Final Step
Click **Deploy** in Vercel.

If you encounter any issues, check the **Build Logs** in Vercel.
