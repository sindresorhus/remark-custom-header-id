import {visit, SKIP} from 'unist-util-visit';

// TODO: Use the same identifier for both when it's possible: https://github.com/tc39/proposal-duplicate-named-capturing-groups
const idRegex = / {#(?<id1>[^}]+)}$| \|\|(?<id2>[^|]+)\|\|$/;

export default function remarkCustomHeaderId() {
	return function (node) {
		visit(node, 'heading', node => {
			const textNode = node.children.at(-1);
			if (textNode?.type !== 'text') {
				return SKIP;
			}

			const text = textNode.value.trimEnd();

			const matched = idRegex.exec(text);
			if (!matched) {
				return SKIP;
			}

			textNode.value = text.slice(0, matched.index);

			const {id1, id2} = matched.groups;
			const id = id1 ?? id2;
			node.data ??= {};
			node.data.id = id;
			node.data.hProperties ??= {};
			node.data.hProperties.id = id;
		});
	};
}

