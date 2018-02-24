import removeTrailingChar from '../remove-trailing-char';

const verifyRoute = (path, url) => {
  if (path === url) {
    return true;
  }

  const paths = removeTrailingChar(path, '/').split('/');
  const urls = removeTrailingChar(url, '/').split('/');

  if (paths.length !== urls.length) {
    return false;
  }

  const params = {};
  let pathAndUrlMatch = true;
  paths.forEach((p, i) => {
    if (p[0] === ':') {
      params[p.slice(1)] = urls[i];
    } else if (paths[i] !== urls[i]) {
      pathAndUrlMatch = false;
    }
  });

  return pathAndUrlMatch && params;
};

export default verifyRoute;
