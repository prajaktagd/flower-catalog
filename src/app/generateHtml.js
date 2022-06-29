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

exports.generateHtml = generateHtml;
