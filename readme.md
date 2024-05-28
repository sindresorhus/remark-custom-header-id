# remark-custom-header-id

> [Remark](https://github.com/remarkjs/remark) plugin for adding custom ID attribute to Markdown headers

This allows for stable and more meaningful anchor links in your generated HTML.

## Install

```sh
npm install remark-custom-header-id
```

## Usage

### Remark

```js
import {remark} from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkCustomHeaderId from 'remark-custom-header-id';

const file = await remark()
	.use(remarkCustomHeaderId)
	.use(remarkRehype) // Markdown to HTML
	.use(rehypeStringify) // Stringify the HTML
	.process('# Foo {#custom-id}');

console.log(String(file));
//=> '<h1 id="custom-id">Foo</h1>'
```

### Astro

```js
// astro.config.js
import remarkCustomHeaderId from 'remark-custom-header-id';

export default defineConfig({
	// …
	markdown: {
		remarkPlugins: [
			remarkCustomHeaderId,
		],
	},
	// …
});
```

### Alternative syntax for MDX files

The syntax `## Some header {#custom-id}` don't work inside MDX files.

You can use one of these alternatives:

- Escape curly braces: `\{#custom-id\}`
- Use this syntax: `||custom-id||`

Examples:

`## Some header \{#custom-id\}`

`## Some header ||custom-id||`


## API

### remarkCustomHeaderId()

Returns a transformer function to be used with Remark.
