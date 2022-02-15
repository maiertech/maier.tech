---
title: Route matching in SvelteKit
author: thilo
date: 2022-02-13
updated: 2022-02-14
description:
  This post explores how SvelteKit's filesystem-based router matches a requested
  route to a page or an endpoint in src/routes.
category: web-development
tags:
  - sveltekit
links:
  - title: SvelteKit Routing (YouTube video by Tan Li Hau)
    href: https://www.youtube.com/watch?v=uyde7dAQwkA
---

<script context="module">
  export const prerender = true;
</script>

<script>
  import Example from '$lib/components/example.svelte';
  import Highlight from '$lib/components/highlight.svelte';
</script>

<Highlight>

I wrote this post originally with
[@sveltejs/kit](https://www.npmjs.com/package/@sveltejs/kit) v1.0.0-next.254.
After finishing it, I noticed that v1.0.0-next.260 introduced shadow endpoints
in [this pull request](https://github.com/sveltejs/kit/pull/3679). This change
came with a
[check for duplicate route files](https://github.com/sveltejs/kit/blame/647131e00149cb5299042eedeb880efcd855a2df/packages/kit/src/core/create_manifest_data/index.js#L262-L279),
which made original Rule 1 partially obsolete. To adapt this post to
v1.0.0-next.260, I had to renumber the rules.

</Highlight>

The [SvelteKit docs](https://kit.svelte.dev/docs#routing) state that

> At the heart of SvelteKit is a filesystem-based router. This means that the
> structure of your application is defined by the structure of your codebase —
> specifically, the contents of `src/routes`.

In this post we will explore how SvelteKit's
[filesystem-based router](https://kit.svelte.dev/docs#routing) matches a
requested route to a page or an endpoint. SvelteKit transforms each route file
in `src/routes` into a page or an endpoint. Conversely, SvelteKit needs to match
a requested route to a route file. This is called route matching.

A filesystem-based router makes route matching straightforward: the route can be
interpreted as sub-path in `src/routes` and often there is only one matching
route file. But what happens when there are multiple matching route files? How
does SvelteKit decide which route file it uses to render a page or endpoint?

In this post we look at a SvelteKit example and explore the rules that SvelteKit
applies to decide which page or endpoint to serve. You will take the most out of
this post if you follow along. Use one of the options below to run the example
in a separate tab in your browser. Alternatively, you can clone the GitHub
repository and run it locally.

<Example 
  title="SvelteKit route matching example"
  description="Run the code for this post in your browser to follow along."
  repository="maiertech/sveltekit-example-route-matching"
  openFile="src/routes/index.svelte"
/>

## Duplicate route files are not permitted

When you have the example up and running, click route `/green` in the preview.
SvelteKit matches this request to page
[`src/routes/green.svelte`](https://github.com/maiertech/sveltekit-example-route-matching/blob/main/src/routes/green.svelte).
This is the filesystem-based router at work, which takes the route and looks for
the corresponding route file in `src/routes`.

Now click route `/red`. This time SvelteKit matches the request to page
[`src/routes/red/index.svelte`](https://github.com/maiertech/sveltekit-example-route-matching/blob/main/src/routes/red/index.svelte),
which is equivalent to `src/routes/red.svelte`.

Create file `src/routes/red.svelte` in the example and copy the content of file
`src/routes/red/index.svelte`. You should see this error message in the
terminal:

```bash
$ svelte-kit dev
> Duplicate route files: src/routes/red
```

<Highlight>

**Rule 1: Duplicate route files are not permitted.**

You cannot have both `src/routes/red/index.svelte` and `src/routes/red.svelte`.
SvelteKit won't let you.

</Highlight>

Delete `src/routes/red.svelte` and run

```bash
npm run dev
```

to restart the development server.

## Matching against path segments

The SvelteKit router matches strings of route segments to path segments. Path
segments inside `src/routes` can be static (`.../static/...`) or dynamic
(`.../[dynamic]/...`) with square brackets. Dynamic path segments match any
string. Static path segments require an exact match. The second rule describes
the order in which SvelteKit matches route segments to path segments:

<Highlight>

**Rule 2: SvelteKit matches route segments to path segments left to right.**

</Highlight>

Let's revisit the `/red` route from before. Now that we know what dynamic path
segments are, we realize that there were three more candidate pages:

- [`src/routes/[color].svelte`](https://github.com/maiertech/sveltekit-example-route-matching/blob/main/src/routes/%5Bcolor%5D.svelte),
- [`src/routes/[nocolor].svelte`](https://github.com/maiertech/sveltekit-example-route-matching/blob/main/src/routes/%5Bnocolor%5D.svelte)
  and
- [`src/routes/[colour]/index.svelte`](https://github.com/maiertech/sveltekit-example-route-matching/blob/main/src/routes/%5Bcolour%5D/index.svelte).

These are not duplicate routes because the strings inside `[]` differ. We
already know from the previous section, that `/red` is not rendered with any of
above candidate pages. The reason is this rule:

<Highlight>

**Rule 3: Static path segments take precedence over dynamic path segments.**

E.g., `src/routes/green.svelte` (static) takes precedence over
`src/routes/[color].svelte` (dynamic).

</Highlight>

## Alphabetical order of path segments

Let's look at route `/blue` in the example. The candidate pages are:

- `src/routes/[color].svelte`,
- `src/routes/[nocolor].svelte`,
- `src/routes/[colour]/index.svelte`.

We need another rule to choose the page that is used to render `/blue`:

<Highlight>

**Rule 4: Index pages take precedence over non-index pages.**

This is only relevant for pages that are not considered duplicate routes, e.g.,
`src/routes/[colour]/index.svelte` takes precedence over
`src/routes/[color].svelte`.

</Highlight>

When matching route segment `blue`, we can use this rule to eliminate the first
two candidate pages. This results in page `src/routes/[colour]/index.svelte`
being rendered. You can confirm this by clicking on `/blue` in the example.

Let's delete page `src/routes/[colour]/index.svelte` in the example. To make the
workspace pick up this change, you need to click in the terminal and hit `⌃C`.
Restart the development server with `npm run dev`.

Now the two candidates for route `/blue` are:

- `src/routes/[color].svelte` and
- `src/routes/[nocolor].svelte`.

A look at the rendered page reveals that the router used
`src/routes/[color].svelte`. It did so because of this rule:

<Highlight>

**Rule 5: For two path segments of the same type, the first one in alphabetical
order takes precedence.**

E.g. `src/routes/[color].svelte` takes precedence over
`src/routes/[nocolor].svelte` because `color` comes before `nocolor` in
alphabetical order.

</Highlight>

## Matching with spread syntax

Let's look at route `/color/blue` in the example. The candidate pages are:

- [`src/routes/color/[color].svelte`](https://github.com/maiertech/sveltekit-example-route-matching/blob/main/src/routes/color/%5Bcolor%5D.svelte)
  and
- [`src/routes/color/[...rest].svelte`](https://github.com/maiertech/sveltekit-example-route-matching/blob/main/src/routes/color/%5B...rest%5D.svelte).

`[...rest]` in the second route is a dynamic path segment, which uses
[spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
and matches any path under `/color`, no matter how deep. We refer to it as
spread segment. The following rule clarifies, which page the router chooses to
render `/color/blue`:

<Highlight>

** Rule 6: Dynamic path segments take precedence over spread segments.**

E.g. `src/routes/color/[color].svelte` takes precedence over
`src/routes/color/[...rest].svelte`.

</Highlight>

You can navigate to route `/color/blue/dark` to see an example of a route that
is rendered with `src/routes/color/[...rest].svelte`.

## Error pages

Last but not least, let's navigate to route `/blue/dark` in the example. This
time, there are no candidate pages. What does the router do? It falls back to
default error page
[`src/routes/__error.svelte`](https://github.com/maiertech/sveltekit-example-route-matching/blob/main/src/routes/__error.svelte).

Note that as soon as there is one candidate page, including pages with spread
segments, the SvelteKit router does not fall back to an error page. This is what
we observed for route `/color/blue/dark` in the previous section. It was
rendered with `src/routes/color/[...rest].svelte` and not the default error
page.

SvelteKit allows you to configure error pages more granular per directory and
you can read up on how this works in the
[SvelteKit docs](https://kit.svelte.dev/docs/layouts#error-pages).