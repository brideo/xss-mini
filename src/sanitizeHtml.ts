import HTMLNode, {HTMLNodeInterface} from "dom-parser-mini";

const defaultAllowedTags: string[] = [
  'b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'span', 'div',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img', 'table', 'tr', 'td', 'th', 'thead',
  'tbody', 'tfoot', 'col', 'colgroup', 'caption', 'blockquote', 'code', 'pre',
  'hr', 'dl', 'dt', 'dd', 'kbd', 'q', 'samp', 'var', 'sub', 'sup', 'small', 'big',
  'abbr', 'address', 'article', 'aside', 'audio', 'bdi', 'bdo', 'button', 'canvas',
  'cite', 'data', 'datalist', 'del', 'details', 'dfn', 'dialog', 'fieldset', 'figcaption',
  'figure', 'footer', 'form', 'header', 'input', 'label', 'legend', 'main', 'mark', 'meter',
  'nav', 'noscript', 'object', 'optgroup', 'option', 'output', 'picture', 'progress', 'ruby',
  'rt', 'rp', 's', 'section', 'select', 'source', 'summary', 'template', 'textarea', 'time',
  'track', 'u', 'video', 'wbr'
];

const defaultAllowedAttributes: { [key: string]: string[] } = {
  'a': ['href', 'title', 'target', 'rel'],
  'img': ['src', 'alt', 'width', 'height'],
  'table': ['border', 'cellpadding', 'cellspacing', 'summary'],
  'col': ['span', 'width'],
  'colgroup': ['span', 'width'],
  'th': ['colspan', 'rowspan', 'headers', 'scope', 'abbr'],
  'td': ['colspan', 'rowspan', 'headers', 'scope', 'abbr'],
  'input': ['type', 'value', 'name', 'placeholder', 'checked', 'disabled', 'readonly', 'size', 'maxlength', 'min', 'max', 'pattern', 'step'],
  'button': ['type', 'name', 'value', 'disabled'],
  'form': ['action', 'method', 'enctype', 'accept-charset', 'autocomplete', 'novalidate'],
  'label': ['for'],
  'textarea': ['name', 'rows', 'cols', 'disabled', 'readonly', 'placeholder'],
  'select': ['name', 'size', 'multiple', 'disabled'],
  'optgroup': ['label', 'disabled'],
  'option': ['value', 'label', 'selected', 'disabled'],
  'audio': ['src', 'controls', 'autoplay', 'loop', 'muted', 'preload'],
  'video': ['src', 'width', 'height', 'controls', 'autoplay', 'loop', 'muted', 'poster', 'preload'],
  'source': ['src', 'type', 'media'],
  'track': ['src', 'kind', 'srclang', 'label', 'default'],
  'iframe': ['src', 'width', 'height', 'name', 'sandbox', 'seamless', 'srcdoc'],
  '*': ['class', 'style', 'id', 'title', 'lang', 'dir', 'data-*', 'role', 'tabindex', 'accesskey', 'contenteditable', 'draggable', 'hidden', 'spellcheck']
};

function cleanNode(node: HTMLNodeInterface, allowedTags: string[], allowedAttributes: {
  [key: string]: string[]
}): void {
  if (!allowedTags.includes(node.tagName)) {
    node.remove();
    return;
  }

  // Flatten allowed attributes for easier use
  const whitelist = new Set<string>();
  for (const tag in allowedAttributes) {
    allowedAttributes[tag].forEach(attr => whitelist.add(attr));
  }

  node.filterAttributes(Array.from(whitelist));

  node.children.forEach((child: HTMLNodeInterface) => cleanNode(child, allowedTags, allowedAttributes));
}

export default function xss(
  input: string,
  allowedTags: string[] = defaultAllowedTags,
  allowedAttributes: { [key: string]: string[] } = defaultAllowedAttributes
): string {
  const nodes: HTMLNodeInterface[] = HTMLNode.create(input);

  nodes.forEach((node: HTMLNodeInterface) => cleanNode(node, allowedTags, allowedAttributes));

  return nodes.map((node: HTMLNodeInterface) => node.html()).join('');
}
