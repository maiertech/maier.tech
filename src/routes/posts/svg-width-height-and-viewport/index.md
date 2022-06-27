---
title: SVG width, height and viewPort
author: thilo
published: 2022-05-01
modified: 2022-05-01
description:
  This post explores how sizing an <svg> element works. It explains how width,
  height and viewPort work in different scenarios.
category: data-viz
tags:
  - sveltekit
---

<style>
  svg {
    background-color: cornflowerblue;
    overflow: visible;
  }
</style>

## SVG basics

Let's start with an empty
[`<svg>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg) element.
If we do not provide width and height, the `<svg>` element is rendered with
viewport dimensions 300 by 150:

```svelte
<svg />
```

<svg />

Note that the background color has been added to make the default dimensions
visible.

Everything inside `<svg>` is not HTML. E.g., there is no flow layout inside
`<svg>` and anything which is not a valid SVG element is not rendered. This is
why in this example the text inside `<svg>` is not rendered:

```svelte
<svg> This text is not rendered. </svg>
```

<svg>
This text is not rendered.
</svg>

`<svg>` is displayed `inline` by default, but the styles of this website change
the default to `block`:

```svelte
<p>
  Some text before.
  <svg />
  Some text after.
</p>
```

<p>
  Some text before.
  <svg />
  Some text after.
</p>

## The viewBox attribute

An `<svg>` element defines a coordinate system. Let's draw a circle at `x=0` and
`y=0`:

```svelte
<svg>
  <circle cx="0" cy="0" r="5" fill="black" />
</svg>
```

<svg>
  <circle cx="0" cy="0" r="5" fill="black" />
</svg>

The origin is in the top left corner, not the bottom left corner as you would
expect.

If the `viewPort` attribute is omitted, the coordinate system corresponds to the
viewport dimensions of the `<svg>` element. Let's draw another circle at `x=0`
and `y=150`:

```svelte
<svg>
  <circle cx="0" cy="150" r="5" fill="black" />
</svg>
```

<svg>
  <circle cx="0" cy="150" r="5" fill="black" />
</svg>

Note that the y-axis points downwards.

### Constrain parent

- [Default width of SVG element is `auto` (treated as 100%).](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/width#svg)
- [Default height of SVG element is `auto` (treated as 100%).](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/height#svg)

#### Width and height of parent are not constrained

SVG takes 100% of width and maintains aspect ratio defined in viewBox.

#### Constrain width of parent

SVG adapts to contrained width and maintains aspect ratio defined in viewBox.

#### Constrain height of parent

SVG still takes up availalbe width and maintains aspect ratio, but overflows
height. Use `overflow` property to control overflow behavior.

https://developer.mozilla.org/en-US/docs/Web/CSS/overflow

#### Constrain width and height of parent

Previous two cases combined.

### Constrain SVG element (not parent)

#### Constrain width

Aspect ratio from viewBox is preserved.

#### Constrain height

Aspect ratio from viewBox is preserved.

#### Constrain width and height different aspect ratio

Build big nested SVG like on mozilla help page.

## SVG without viewBox

Pixel width and height become coordinate system. When you leave width or height
away, defaults kick in.

## Exaggerated viewBox

viewbox with 9 logical pixels is still displayed smoothly, becaue it scales up
to the availalbe pixels. You can think of viewBox like a retina display.
