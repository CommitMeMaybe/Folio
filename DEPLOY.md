# Deployment Guide

Since your project is a static website (HTML, CSS, JS), you have several excellent free hosting options.

## Option 1: GitHub Pages (Recommended)
**Best for:** Simplicity. Your code is already on GitHub.

1. Go to your repository: [https://github.com/CommitMeMaybe/Folio](https://github.com/CommitMeMaybe/Folio)
2. Click on **Settings** (top tab).
3. Click on **Pages** (sidebar, under "Code and automation").
4. Under **Build and deployment** > **Source**, select **Deploy from a branch**.
5. Under **Branch**, select `main` and `/ (root)`.
6. Click **Save**.
7. Wait a minute or two. Refresh the page to see your live URL (usually `https://commitmemaybe.github.io/Folio`).

## Option 2: Vercel
**Best for:** Performance and easy custom domains later.

1. Go to [vercel.com](https://vercel.com) and sign up with GitHub.
2. Click **Add New...** > **Project**.
3. Import your `Folio` repository.
4. Keep the default settings and click **Deploy**.
5. You'll get a URL like `folio-project.vercel.app`.

## Option 3: Netlify
**Best for:** Drag-and-drop simplicity (if not using Git) or easy Git integration.

1. Go to [netlify.com](https://netlify.com) and sign up.
2. Click **Add new site** > **Import from an existing project**.
3. Connect GitHub and select your `Folio` repo.
4. Click **Deploy Site**.
5. You'll get a URL like `random-name.netlify.app` (which you can rename).
