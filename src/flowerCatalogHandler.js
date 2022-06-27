const commentHandler = ({ params }, response) => {
  const { name, comment } = params;
  // let statusCode = 302;
  // let location = getFileName(pokemonType);
  // if (!name && !comment) {
  //   statusCode = 301;
  //   location = '/index.html';
  // }

  response.setHeader('content-type', 'text/plain');
  response.send(`${name}: ${comment}`);
  return true;
};

const flowerCatalogHandler = (request, response) => {
  const { uri } = request;
  if (uri === '/add-comment') {
    commentHandler(request, response);
    return true;
  }
  return false;
};

exports.flowerCatalogHandler = flowerCatalogHandler;
