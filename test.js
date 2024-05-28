import test from 'ava';
import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkCustomHeaderId from './index.js';

test('main', async t => {
	const file = await unified()
		.use(remarkParse)
		.use(remarkCustomHeaderId)
		.use(remarkRehype)
		.use(rehypeStringify)
		.process(`
# unicorn {#foo-bar}
# a {#aa}
# b
## c {#foo bar}
# unicorn ||foo-bar||
# a ||aa||
## c ||foo bar||
# d {#wrong id|| 
# e ||wrong id}
	`.trim());

	t.is(file.value, `
<h1 id="foo-bar">unicorn</h1>
<h1 id="aa">a</h1>
<h1>b</h1>
<h2 id="foo bar">c</h2>
<h1 id="foo-bar">unicorn</h1>
<h1 id="aa">a</h1>
<h2 id="foo bar">c</h2>
<h1>d {#wrong id||</h1>
<h1>e ||wrong id}</h1>
`.trim());
});
