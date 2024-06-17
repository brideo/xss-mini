"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Default allowed tags and attributes
const defaultAllowedTags = ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const defaultAllowedAttributes = {
    'a': ['href', 'title'],
    'img': ['src', 'alt'],
    '*': ['class', 'style'] // Allow class and style for all tags
};
function xss(input, allowedTags = defaultAllowedTags, allowedAttributes = defaultAllowedAttributes) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = input;
    function cleanNode(node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node;
            if (!allowedTags.includes(element.tagName.toLowerCase())) {
                element.parentNode?.removeChild(element);
                return;
            }
            Array.from(element.attributes).forEach(attr => {
                if (!allowedAttributes[element.tagName.toLowerCase()]?.includes(attr.name) &&
                    !allowedAttributes['*'].includes(attr.name)) {
                    element.removeAttribute(attr.name);
                }
            });
        }
        Array.from(node.childNodes).forEach(child => cleanNode(child));
    }
    Array.from(tempDiv.childNodes).forEach(child => cleanNode(child));
    return tempDiv.innerHTML;
}
exports.default = xss;
