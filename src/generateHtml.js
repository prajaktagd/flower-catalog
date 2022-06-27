const stringifyProperty = ([key, value]) => key + ':' + value;

const stringifyStyle = (properties) => {
  return Object.entries(properties).map(stringifyProperty).join(';');
};

const stringifyAttribute = ([key, value]) => {
  const newValue = key === 'style' ? stringifyStyle(value) : value;
  return [key, '="', newValue, '"'].join('');
};

const stringifyAttributes = (attributes) => {
  return Object.entries(attributes).map(stringifyAttribute).join(' ');
};

const openingTag = (tag, attributes) => {
  return ['<', tag, ' ', stringifyAttributes(attributes), '>'].join('');
};

const closingTag = (tag) => ['</', tag, '>'].join('');

const isSelfContained = (tag) => {
  const tags = ['link', 'hr', 'br', 'img', 'input'];
  return tags.includes(tag);
};

const stringifySelfContainedTag = (tag, attributes) => {
  return ['<', tag, ' ', stringifyAttributes(attributes), '/>'].join('');
};

const generateHtml = ([tag, attributes, ...content]) => {
  if (isSelfContained(tag)) {
    return stringifySelfContainedTag(tag, attributes);
  }
  const newContent = content.map(element => {
    return Array.isArray(element) ? generateHtml(element) : element
  }).join('');

  return openingTag(tag, attributes) + newContent + closingTag(tag);
};

// const html = generateHtml(['head', {}, ['title', {}, 'My First Page'], ['link', { rel: 'stylesheet', href: 'styles.css' }]]);
// console.log(html);

exports.generateHtml = generateHtml;

// const div = (content) => ['div', {}, content];

// // html(['div', {}, ...[1, 2, 3].map(div)]);

// const pokemonCard = (pokemon) => []; //some card;

// const fruits = ['orange', 'banana'];
// const dom = ['ul', {}, ...fruits.map(li)];

// generateHtml(dom);
