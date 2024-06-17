# xss-mini

[![NPM version](https://img.shields.io/npm/v/xss-mini)](https://www.npmjs.com/package/xss-mini)
[![Build Status](https://img.shields.io/github/workflow/status/brideo/xss-mini/Node.js%20CI)](https://github.com/brideo/xss-mini/actions)
[![Test Coverage](https://img.shields.io/coveralls/github/brideo/xss-mini)](https://coveralls.io/github/brideo/xss-mini)
[![License](https://img.shields.io/npm/l/xss-mini)](https://github.com/brideo/xss-mini/blob/main/LICENSE)
[![Dependencies](https://img.shields.io/david/brideo/xss-mini)](https://david-dm.org/brideo/xss-mini)

`xss-mini` is a lightweight TypeScript library for sanitizing HTML input to prevent XSS (Cross-Site Scripting) attacks. It allows configurable tags and attributes to be whitelisted.

## Installation

```bash
npm install xss-mini
```

Or with yarn

```bash
yarn add xss-mini
```

## Usage 

### In TypeScript

```typescript
import xss from 'xss-mini';

const userInput: string = '<h1>Title</h1> <b>Hello</b> <script>alert("XSS Attack!");</script> <a href="http://example.com" onclick="maliciousFunction()">link</a>';
const safeHtml: string = xss(userInput);

console.log(safeHtml); // Outputs: <h1>Title</h1> <b>Hello</b> <a href="http://example.com">link</a>
```

### In JavaScript

```javascript
const xss = require('xss-mini');

const userInput = '<h1>Title</h1> <b>Hello</b> <script>alert("XSS Attack!");</script> <a href="http://example.com" onclick="maliciousFunction()">link</a>';
const safeHtml = xss(userInput);

console.log(safeHtml); // Outputs: <h1>Title</h1> <b>Hello</b> <a href="http://example.com">link</a>
```

## Custom Configuration

You can customise the allowed tags and attributes:

```javascript
import xss from 'xss-mini';

const customAllowedTags = ['b', 'i', 'em', 'strong', 'a', 'p', 'h1', 'h2'];
const customAllowedAttributes = {
  'a': ['href', 'title'],
  '*': ['class', 'style']
};

const userInput: string = '<h1>Title</h1> <b>Hello</b> <script>alert("XSS Attack!");</script> <a href="http://example.com" onclick="maliciousFunction()">link</a>';
const safeHtml: string = xss(userInput, customAllowedTags, customAllowedAttributes);

console.log(safeHtml); // Outputs: <h1>Title</h1> <b>Hello</b> <a href="http://example.com">link</a>
```

## License

MIT License
