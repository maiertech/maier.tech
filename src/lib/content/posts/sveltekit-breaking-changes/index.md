---
title: Handling breaking changes in SvelteKit pre-1.0
author: thilo
published: 2022-09-01
modified: 2022-09-01
description: In the last month or so, there have been many breaking changes in SvelteKit. While this is expected pre-1.0, it poses a challenge to anyone running a SvelteKit app in production. In this post, I provide guidance on working through the recent breaking changes.
topics: [svelte]
tags: [sveltekit]
---

<script>
  import { Tweet } from 'sveltekit-embed';
</script>

In August 2022, the SvelteKit team around [Rich Harris](https://twitter.com/rich_harris) released several refactorings in preparation for the release of SvelteKit 1.0. The most significant changes were a complete overhaul of SvelteKit's [router and load API](https://github.com/sveltejs/kit/discussions/5748), and this redesign resulted in several breaking changes.

## Why breaking changes?

SvelteKit follows [semantic versioning](https://semver.org/), and the [specification](https://semver.org/#semantic-versioning-specification-semver) states that

> 4. Major version zero (0.y.z) is for initial development. Anything MAY change at any time. The public API SHOULD NOT be considered stable.

While SvelteKit is pre-1.0, any release can include breaking changes. Despite this caveat, SvelteKit was widely adopted and used in production. Breaking changes happened occasionally, but they were rare:

<Tweet tweetLink="StephaneVanraes/status/1477985831168184323" />

Consequently, the wider Svelte community (myself included) assumed that SvelteKit was ready for production:

<Tweet tweetLink="maiertech/status/1557290685044125697" />

After a summer of breaking changes, I realized that considering SvelteKit stable enough for production was premature. Mea culpa!

Now that many devs run SvelteKit in production, what is the best way to deal with all the breaking changes?

## Upgrading to recent SvelteKit versions with breaking changes

If you have a SvelteKit app in production that you have not upgraded in a while, you should not try to upgrade straight to the latest version. Here are some milestone releases that you can use for your upgrade path:

### SvelteKit 1.0.0-next.377

[1.0.0-next.377](https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md#100-next377) includes a breaking change in which you need to uppercase endpoint methods. If your version is older than [1.0.0-next.359](https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md#100-next359), you can follow the upgrade steps outlined in this thread:

<Tweet tweetLink="maiertech/status/1548034676635275264" />

### SvelteKit 1.0.0-next.405

[1.0.0-next.405](https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md#100-next405) is the last version before the overhaul of SvelteKit's router. Make sure your site runs without issues with this version.

### SvelteKit 1.0.0-next.414

[1.0.0-next.414](https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md#100-next414) is the last version before another significant breaking change. Now it's time to read up on the changes released in [1.0.0-next.406](https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md#100-next406). Read one of these two posts:

- Josh Collinsworth: [Breaking changes in SvelteKit](https://joshcollinsworth.com/blog/sveltekit-breaking-changes).
- Brittney Postma: [Migrating Breaking Changes in SvelteKit](https://www.netlify.com/blog/migrating-breaking-changes-in-sveltekit/).

Then read the [first comment in Rich Harris's migration guide](https://github.com/sveltejs/kit/discussions/5774#discussion-4267008) and run the migration script:

```bash
npx svelte-migrate routes
```

This script is magic. It handles all the renaming of files and leaves `@migration` comments with links to the other comments in the [migration guide](https://github.com/sveltejs/kit/discussions/5774). You should review all migration comments and review all proposed changes. Depending on the size of your site, this can take a couple of hours.

### SvelteKit 1.0.0-next.415

[1.0.0-next.415](https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md#100-next432) removes the session object. You can skip this version if you don't use the session object. If you use the session object, you need to read [this discussion on why it has been removed and how to replace it](https://github.com/sveltejs/kit/discussions/5883). This is a non-trivial upgrade.

### SvelteKit 1.0.0-next.432

[1.0.0-next.432](https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md#100-next432) removes named layouts in favor of [groups](https://kit.svelte.dev/docs/advanced-routing#advanced-layouts). Check out [this migration guide](https://github.com/sveltejs/kit/pull/6174). If you do not use named layouts, skip to the next version.

### SvelteKit 1.0.0-next.455

[1.0.0-next.450](https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md#100-next450) requires an upgrade of `vite` in `package.json`:

```json:package.json
{
  ...
  "vite": "^3.1.0-beta.1"
  ...
}
```

And [1.0.0-next.455](https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md#100-next455) overhauls prerendering. Read the docs on [page options](https://kit.svelte.dev/docs/page-options) to find out what has changed.

### SvelteKit 1.0.0-next.463

Last but not least, [1.0.0-next.463](https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md#100-next463) fixes a peer dependency warning introduced with Vite 3.1.0-beta.1.

## Conclusion

Fixing all recent breaking changes looks like a daunting task, and it probably is if you have a large website. If you have a SvelteKit app in production, there is not much you can do other than upgrade to the new versions as they are released.

This post demonstrates that you do not have to upgrade to every new release, and you can skip upgrades when they contain only patch changes. But the longer you wait, the more breaking changes will accumulate, and the more complex upgrading will be.

How many more breaking changes will there be? I don't know. But I hope the SvelteKit team is on the home stretch towards 1.0.