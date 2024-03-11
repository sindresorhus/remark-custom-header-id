import {visit, SKIP} from 'unist-util-visit';

const idRegex = / {#(?<id>[^}]+)}$/;

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

			const {id} = matched.groups;
			node.data ??= {};
			node.data.id = id;
			node.data.hProperties ??= {};
			node.data.hProperties.id = id;
		});
	};
}

