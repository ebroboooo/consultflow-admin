# Deployment & Hosting Guide

This guide describes how to deploy the **Client Portal & SaaS Analytics Dashboard** to modern production hosting environments.

---

## 📦 Production Build Generation

Execute the Vite production build script:

```bash
npm run build
```

The optimized, tree-shaken static assets will be output to the `/dist` directory.

---

## 🌐 Hosting Platform Instructions

### 1. Vercel
1. Import repository into Vercel Dashboard.
2. Select Framework Preset: **Vite**.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.
5. Deploy!

### 2. Netlify
1. Connect GitHub repository to Netlify.
2. Set Build Command to `npm run build`.
3. Set Publish Directory to `dist`.
4. Add `_redirects` file in `public/` containing `/* /index.html 200` to support client-side routing.

### 3. Docker Container Deployment
```dockerfile
# Build Stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve Stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```
