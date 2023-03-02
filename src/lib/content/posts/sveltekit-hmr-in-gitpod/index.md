---
title: How to make SvelteKit HMR work with Gitpod
author: thilo
published: 2022-01-30
modified: 2022-07-16
description: SvelteKit HMR breaks when developing with a Gitpod workspace in a browser. This post explains how to fix this.
topics: [svelte, dx]
tags: [gitpod, sveltekit]
---

SvelteKit uses [Vite](https://vitejs.dev/) with [vite-plugin-svelte](https://github.com/sveltejs/vite-plugin-svelte) to implement hot module replacement (HMR). HMR ensures that changes in your code are reflected instantly in your browser preview. This results in a pleasant developer experience. HMR in SvelteKit works out of the box with no configuration required.

## Why HMR on Gitpod is different

Things change when you develop with a cloud workspace such as [Gitpod](https://www.gitpod.io). If you are not familiar with cloud workspaces, check out my post [A better development workflow with disposable workspaces](/posts/a-better-development-workflow-with-disposable-workspaces). In a Gitpod workspace, the SvelteKit development server runs on port 5173, like in your local development environment. How you access the development server depends on how you access your Gitpod workspace:

- When you access a Gitpod workspace **from within a browser**, you can access the development server with an external URL on the `gitpod.io` domain. To make this work, Gitpod proxies `127.0.0.1` to the external URL.
- When you access your Gitpod workspace **from VS Code via SSH**, VS Code proxies the development server to `127.0.0.1`. You work with your Gitpod workspace as if it was a local development environment.

While developing a SvelteKit app with Gitpod inside a browser, I noticed that HMR was broken. It would trigger indefinite page reloads after firing up the SvelteKit development server. Like in [this GitHub issue](https://github.com/sveltejs/kit/issues/2519). The [last issue comment](https://github.com/sveltejs/kit/issues/2519#issuecomment-947485636) points to the solution. You can customize the Vite configuration and override its default HMR behavior.

The [Vite docs](https://vitejs.dev/config/#server-hmr) explain that

> `clientPort` is an advanced option that overrides the port only on the client side, allowing you to serve the websocket on a different port than the client code looks for it on. Useful if you're using an SSL proxy in front of your dev server.

Vite brokers between the external URL and the development server running in your Gitpod workspace.

## Gitpod workspace URLs

A Gitpod workspace is available at a unique URL (which requires authentication) with the following format:

```bash
<uuid>.<region>.gitpod.io
```

Every Gitpod workspace sets [`GITPOD_WORKSPACE_URL`](https://www.gitpod.io/docs/environment-variables#default-environment-variables), which contains the unique workspace URL.

By default, a development server is not accessible externally. You need to tell the workspace which internal port it should expose. If e.g., your development server runs at `127.0.0.1:5173` you need to add the following configuration to your `.gitpod.yml`:

```yaml:.gitpod.yml
ports:
    # Expose port 5173.
  - port: 5173

tasks:
    # Install dependencies.
  - init: npm install
    # Run SvelteKit dev server (which uses port 5173).
    command: npm run dev
```

`tasks` defines tasks that Gitpod runs when it initializes the workspace. This configuration makes the development server available at this URL:

```bash
<port>-<workspace-id>.<region>.gitpod.io
```

E.g. I wrote this post on a Gitpod workspace running at

```bash
https://maiertech-maiertech-ti2zaqimh33.ws-us34.gitpod.io/
```

The workspace ID `maiertech-maiertech-ti2zaqimh33` consists of my GitHub username `maiertech`, an ID derived from the repository name `maier.tech` and a UUID. With the above `.gitpod.yml` configuration, the SvelteKit development server of this workspace can be reached at

```bash
https://5173-maiertech-maiertech-ti2zaqimh33.ws-us34.gitpod.io/
```

You can access the development server only when authenticated to Gitpod.

## Overriding HMR in vite.config.js

Next, we override a the HMR configuration in `vite.config.js`:

```js:vite.config.js
...
server: {
  hmr: {
    clientPort: process.env.GITPOD_WORKSPACE_URL ? 443 : 5173,
    host: process.env.GITPOD_WORKSPACE_URL
      ? process.env.GITPOD_WORKSPACE_URL.replace('https://', '5173-')
      : '127.0.0.1',
  },
},
...
```

We set `clientPort` and `host` depending on whether `GITPOD_WORKSPACE_URL` exists. This ensures that HMR works when running your Gitpod workspace inside a browser. But also for anyone running the SvelteKit site in a local development environment.

There is a catch with this Vite configuration. `GITPOD_WORKSPACE_URL` also exists in a Gitpod workspace, which runs in a local VS Code via SSH. In this scenario, you can access the development server on `127.0.0.1:5173`. But the above Vite configuration expects it to be on a `gitpod.io` URL.

Thus, you should add the custom Vite configuration only if you plan to access Gitpod workspaces from within a browser. If you access Gitpod workspaces from within a local VS Code, you do not need the custom HMR configuration.

## Browser extensions that interfere with HMR

One final word of caution. Even with the custom Vite configuration in place, HMR would still break for me. I narrowed this issue down to my browser extension [uBlock Origin](https://ublockorigin.com/) being the culprit. Any other ad blocker extension might interfere, too. So, I added `gitpod.io` to trusted sites in uBlock Origin.

## Credits

Thanks to [Mike Nikles](https://twitter.com/mikenikles) from Gitpod for pointing me in the right direction when I ran into HMR issues with SvelteKit on Gitpod. Gitpod's website https://gitpod.io/ is written in SvelteKit and [open source](https://github.com/gitpod-io/website). You can learn a lot from this repository.