---
title: Three ways to bootstrap a Svelte project
author: thilo
published: 2022-07-01
modified: 2023-02-05
description: This post discusses three ways to bootstrap a Svelte project. Learn why using the official Vite Svelte templates results in the best developer experience.
topics: [svelte]
tags: [codesandbox, stackblitz, vite]
---

<script>
  import Image from '$lib/components/image.svelte';
  import SvelteJsTemplate from './svelte-js-template.svelte';
  import SvelteTsTemplate from './svelte-ts-template.svelte';
</script>

The [Svelte template](https://github.com/sveltejs/template) has long been the official way to bootstrap a Svelte project, and it is no longer maintained and is deprecated. What should you choose instead to bootstrap a Svelte project?

With [SvelteKit](https://kit.svelte.dev/) now stable at version 1.0, it is the obvious choice to bootstrap a Svelte project. And there is nothing wrong with this approach. SvelteKit shines when you need advanced features, e.g., a filesystem-based router, progressive enhancement, fast initial page load, or SEO. For smaller projects, such as data visualization or a quick experiment, SvelteKit comes with unnecessary overhead when all you need is Svelte.

Let's look at three ways to bootstrap a Svelte project.

## Svelte REPL

If you have dipped your toes into Svelte already, you are probably familiar with the [Svelte REPL](https://svelte.dev/repl). The REPL is the most popular way to share code examples within the Svelte community. It runs client-side, does not need a local setup, and you can start coding instantly.

An often overlooked feature of the Svelte REPL is the download button. You can download the source code of every example:

<figure>
<Image
  ratio={16/9}
  alt="Screenshot of a project running in the Svelte REPL. A blue arrow points at the download button."
  url="https://share.mailbox.org/ajax/share/04bf90490592c90c43c5f22592c94c7d96c0c59a2ed2f870/1/8/MjQw/MjQwLzM0Nw?dl=true"
  loading="lazy" />
<figcaption>Click the download button in the Svelte REPL to download the source code of an example.</figcaption>
</figure>

You can start your Svelte experiments with the Svelte REPL. And once you decide that you want to continue your experiment on GitHub, download its source code and run it in your local VS Code:

<figure>
<Image
  ratio={1516/1030}
  alt="Screenshot of VS Code with the code downloaded from the from the Svelte REPL. File package.json is open, and you can see the dependencies of the deprecated Svelte template."
  url="https://share.mailbox.org/ajax/share/08890af2007d3d0d80ac59907d3d4cb3b0353269b50e4739/1/8/MjQw/MjQwLzM0OA?dl=true"
  loading="lazy" />
<figcaption>Code examples in the Svelte REPL use the legacy Svelte template, which uses [Rollup](https://rollupjs.org/guide/en/) as a bundler.</figcaption>
</figure>

The Svelte REPL would be the perfect way to start a new Svelte project, except that every project you create is based on the deprecated Rollup-based Svelte template. The Svelte team is working on a new REPL, which will run on [StackBlitz's WebContainers](https://blog.stackblitz.com/posts/introducing-webcontainers/). You can find out more in Rich Harris's talk [Full Stack Documentation at JSNation 2022](https://www.youtube.com/watch?v=RwBolXX9Pis). The current Svelte REPL is still great for experiments, but do not bootstrap a Svelte project with it.

## CodeSandbox

The [CodeSandbox](https://codesandbox.io/) team has created a bundler that can bundle and run different JavaScript frameworks in-browser. The bundled code runs client-side without relying on a back-end server. CodeSandbox provides several sandbox templates, including one for Svelte:

<figure>
<Image
  ratio={1866/870}
  alt="Screenshot of the CodeSandbox dialog to select a template for a new sandbox. The Svelte template is highlighted."
  url="https://share.mailbox.org/ajax/share/03c415a502af0507347dace2af05456bb76c21419f531d0e/1/8/MjQw/MjQwLzM0OQ?dl=true"
  loading="lazy" />
<figcaption>CodeSandbox has a sandbox template for Svelte.</figcaption>
</figure>

Unfortunately, CodeSandbox's Svelte template is a variation of the deprecated Rollup-based Svelte template:

<figure>
<Image
  ratio={16/9}
  alt="Screenshot of CodeSandbox's Svelte template running in-browser. File package.json is open, and you can see the dependencies of the deprecated Svelte template."
  url="https://share.mailbox.org/ajax/share/0fb236b60a811a04f31f9dda811a47c28902a8c258e16099/1/8/MjQw/MjQwLzM1MA?dl=true"
  loading="lazy" />
<figcaption>CodeSandbox's Svelte template is a variation of the deprecated Svelte template.</figcaption>
</figure>

Thanks to semantic versioning, you still get the latest version of Svelte, but you get a legacy project structure. CodeSandbox's Svelte template is also great for experiments, but do not bootstrap a Svelte project with it.

## StackBlitz

The team at [StackBlitz](https://stackblitz.com/) managed to get [Node.js](https://nodejs.org/en/) running in-browser, which is a big deal because they can run anything in-browser that runs with Node.js (without relying on a back-end server), including [Vite](https://vitejs.dev/). Therefore, StackBlitz supports the official Vite Svelte templates, [with vanilla JavaScript](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-svelte) or [with TypeScript](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-svelte-ts):

<figure>
<Image
  ratio={16/9}
  alt="Screenshot of StackBlitz's dashboard. The two Svelte templates, one for vanilla JavaScript and one for TypeScript, are highlighted."
  url="https://share.mailbox.org/ajax/share/0cd09a8002295f05c5355eb2295f4123bfcd170959185de2/1/8/MjQw/MjQwLzM1MQ?dl=true"
  loading="lazy" />
<figcaption>StackBlitz supports the official Vite Svelte templates.</figcaption>
</figure>

The StackBlitz team has created shortcuts for two Vite Svelte templates. Clicking on https://vite.new/svelte bootstraps the Vite Svelte template with vanilla JavaScript and is equal to running

```bash
npm create vite@latest my-svelte-app -- --template svelte
```

in a terminal. Here you can try out the Vite Svelte vanilla JavaScript template directly in your browser:

<SvelteJsTemplate />

Clicking https://vite.new/svelte-ts bootstraps the Vite Svelte template with TypeScript and is equal to running

```bash
npm create vite@latest my-svelte-ts-app -- --template svelte-ts
```

in your terminal. Here you can try the Vite Svelte TypeScript template directly in your browser:

<SvelteTsTemplate />

It does not get easier than clicking one of the two shortcuts to bootstrap a Svelte project. When you are ready, you can connect to GitHub, push your Svelte project to GitHub, and continue in your favorite IDE.

## Conclusion

The Svelte REPL and the CodeSandbox easily bootstrap a new Svelte project. But they use the deprecated Svelte template. With StackBlitz, on the other hand, you can run the official Vite Svelte templates natively in-browser, and Stackblitz's URL shortcuts make bootstrapping a Svelte project a one-click effort.