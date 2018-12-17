import * as fs from 'fs';
import * as path from 'path';
import * as _  from 'lodash';

function registerRoutes(app, dirPath, baseRoute, file) {
  const routes = require(path.join(dirPath, file));
  const method = path.basename(file, path.extname(file));

  _.forEach(routes, ({ func, route }) => {
    console.log(method.toUpperCase(), path.join(baseRoute, route));
    app[method](path.join(baseRoute, route), func);
  });
}

export function setupRouter(app) {
  const directories = fs
    .readdirSync(__dirname + '/routes')
    .filter(dir => fs.statSync(path.join(__dirname, 'routes', dir)).isDirectory());

  directories.push('.');


  directories.forEach(dir => {
    const dirPath = path.join(__dirname, 'routes', dir);
    const baseRoute = path.join('/', dir);
    const files = fs
      .readdirSync(dirPath)
      .filter(file => !fs.statSync(path.join(dirPath, file)).isDirectory());

    files.forEach(file => {
      registerRoutes(app, dirPath, baseRoute, file);
    });
  });
}
