// const wrapMethodNotFound = (pathname, handlers) => {
//   if (condition) {
//     returnStatement
//   }  
// };

const createRouter = (handlers) => (req, res) => {
  for (const handler of handlers) {
    if (handler(req, res)) {
      return true;
    }
  }
  return false;
};

module.exports = { createRouter };
