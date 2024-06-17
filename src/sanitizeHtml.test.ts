import xss from './sanitizeHtml';

describe('xss-mini', () => {
  test('should sanitize input and remove script tags', () => {
    const userInput = '<h1>Title</h1> <b>Hello</b> <script>alert("XSS Attack!");</script> <a href="http://example.com" onclick="maliciousFunction()">link</a>';
    const safeHtml = xss(userInput);
    expect(safeHtml).toBe('<h1>Title</h1><b>Hello</b><a href="http://example.com">link</a>');
  });

  test('should allow custom tags and attributes', () => {
    const customAllowedTags = ['b', 'i', 'em', 'strong', 'a', 'p', 'h1', 'h2'];
    const customAllowedAttributes = {
      'a': ['href', 'title'],
      '*': ['class', 'style']
    };

    const userInput = '<h1>Title</h1> <b>Hello</b> <script>alert("XSS Attack!");</script> <a href="http://example.com" onclick="maliciousFunction()">link</a>';
    const safeHtml = xss(userInput, customAllowedTags, customAllowedAttributes);
    expect(safeHtml).toBe('<h1>Title</h1><b>Hello</b><a href="http://example.com">link</a>');
  });

  test('should remove disallowed tags with nested content', () => {
    const userInput = '<div><h1>Title</h1><script>alert("XSS Attack!");</script><p>Content</p></div>';
    const safeHtml = xss(userInput);
    expect(safeHtml).toBe('<div><h1>Title</h1><p>Content</p></div>');
  });

  test('should preserve allowed tags with allowed attributes', () => {
    const userInput = '<h1 id="title">Title</h1><a href="http://example.com" title="example">link</a><img src="image.jpg" alt="image" />';
    const safeHtml = xss(userInput);
    expect(safeHtml).toBe(`<h1 id="title">Title</h1><a href="http://example.com" title="example">link</a><img src="image.jpg" alt="image" />`);
  });

  test('should remove disallowed attributes', () => {
    const userInput = '<h1 id="title" style="color: red;">Title</h1><a href="http://example.com" onclick="maliciousFunction()">link</a>';
    const safeHtml = xss(userInput);
    expect(safeHtml).toBe(`<h1 id="title" style="color: red;">Title</h1><a href="http://example.com">link</a>`);
  });

  test('should handle self-closing tags', () => {
    const userInput = '<div><img src="image.jpg" alt="image" /></div>';
    const safeHtml = xss(userInput);
    expect(safeHtml).toBe('<div><img src="image.jpg" alt="image" /></div>');
  });

  test('should handle complex nested tags and attributes', () => {
    const userInput = '<div class="container"><h1>Title</h1><p>Paragraph <a href="http://example.com" style="color: blue;">link</a></p><footer>Footer content</footer></div>';
    const safeHtml = xss(userInput);
    expect(safeHtml).toBe('<div class=\"container\"><h1>Title</h1><p>Paragraph <a href=\"http://example.com\" style=\"color: blue;\">link</a></p><footer>Footer content</footer></div>');
  });
});
