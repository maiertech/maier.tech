---
title: Exploring frequently used methods of d3-array
author: thilo
published: 2022-06-27
modified: 2022-06-28
description:
  Working with JavaScript arrays is a crucial skill for data visualization with
  D3. Explore frequently used methods of d3-array in this post.
topics: [data-visualization]
tags: [d3, stackblitz]
---

<script>
  import { Tweet } from 'sveltekit-embed';

  import MinMissingValuesExample from './_examples/min-missing-values/stackblitz.svelte'; 
  import MaxAccessorExample from './_examples/max-accessor/stackblitz.svelte';
  import ExtentExample from './_examples/extent/stackblitz.svelte';
  import RangeExample from './_examples/range/stackblitz.svelte';
  import TicksExample from './_examples/ticks/stackblitz.svelte';
</script>

In this post, I will introduce you the methods from
[d3-array](https://github.com/d3/d3-array), which I use often for data
visualization. All examples run inside your browser using
[StackBlitz](https://stackblitz.com/). StackBlitz currently supports
Chromium-based and Firefox browsers only.

## d3.min, d3.max and d3.extent

[d3.min](https://github.com/d3/d3-array#min) returns the minimum of an array
using the natural order. Unlike
[Math.min](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min),
d3.min can handle missing values.

Let's look at examples:

<MinMissingValuesExample />

Likewise, [d3.max](https://github.com/d3/d3-array#max) returns the maximum. But
what happens when the array, for which we would like to compute the maximum,
contains objects? We can use an accessor function to retrieve a specific object
property and transform it. In the following example, accessor

```js
(d) => new Date(d.date);
```

extracts the date property and converts it into a JavaScript
[Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date),
which is used for comparison. This returns the most recent date (maximum). But
what we need is the object with the most recent date, not just the most recent
date. We can use [d3.maxIndex](https://github.com/d3/d3-array#maxIndex) to
retrieve the index of the object with the most recent date.

Let's look at examples:

<MaxAccessorExample />

To create an axis for numeric values with D3, you need to know the extent of the
data along that axis. Extent means the minimum and maximum values.
[d3.extent](https://github.com/d3/d3-array#extent) returns an array with these
values. It not only works with numeric values but with any values that have a
natural sort order.

Let's look at examples:

<ExtentExample />

## d3.range

[d3.range](https://github.com/d3/d3-array#range) returns an array of evenly
spaced numbers. It has three arguments: _start_, _stop_ and _step_. The only
required attribute is _stop_. _start_ defaults to 0 and _step_ defaults to 1.
_start_ is inclusive, _stop_ is exclusive.

Let's look at examples:

<RangeExample />

As the `floatingPointRange` example shows, with d3.range you can run into the
[pitfalls of binary floating point math](https://stackoverflow.com/questions/588004/is-floating-point-math-broken).
You can fix this issue with
[Number.toFixed](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed):

```js
range(0, 1, 0.2).map((n) => n.toFixed(1));
```

And finally, if you try to create a range that causes an infinite loop, like the
`infiniteLoopRange`, d3.range returns an empty array.

## d3.ticks

[d3.ticks](https://github.com/d3/d3-array#ticks) generates an array of
nicely-rounded numbers inside an interval [_start_, _stop_]. You have to pass in
three arguments:

```js
ticks(start, stop, count);
```

`count` is the number of ticks you are aiming for. But there is no guarantee
that you will get this number. As the example below shows, you may get more or
less ticks. The only thing that matters to d3.ticks is that the ticks are nicely
rounded and inside [_start_, _stop_]. _start_ and _stop_ can be part of the
ticks.

Let's look at examples:

<TicksExample />

## JavaScript Array methods

The [d3-array documentation](https://github.com/d3/d3-array#d3-array) points out
that you should master
[JavaScript's built-in Array methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).
d3-array complements them but does not replace them. You cannot do data
visualization with JavaScript without knowing built-in Array methods like the
back of your hand. Here is a cheat sheet that is a great starting point to
understanding what some of the Array methods do:

<Tweet tweetLink="sulco/status/1281545450273865730" />