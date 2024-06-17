import xss from './sanitizeHtml';

describe('xss-mini', () => {
  test('should sanitize input and remove script tags', () => {
    const userInput = '<h1>Title</h1> <b>Hello</b> <script>alert("XSS Attack!");</script> <a href="http://example.com" onclick="maliciousFunction()">link</a>';
    const safeHtml = xss(userInput);
    expect(safeHtml).toBe('<h1>Title</h1> <b>Hello</b>  <a href="http://example.com">link</a>');
  });

  test('should allow custom tags and attributes', () => {
    const customAllowedTags = ['b', 'i', 'em', 'strong', 'a', 'p', 'h1', 'h2'];
    const customAllowedAttributes = {
      'a': ['href', 'title'],
      '*': ['class', 'style']
    };

    const userInput = '<h1>Title</h1> <b>Hello</b> <script>alert("XSS Attack!");</script> <a href="http://example.com" onclick="maliciousFunction()">link</a>';
    const safeHtml = xss(userInput, customAllowedTags, customAllowedAttributes);
    expect(safeHtml).toBe('<h1>Title</h1> <b>Hello</b>  <a href="http://example.com">link</a>');
  });
});
