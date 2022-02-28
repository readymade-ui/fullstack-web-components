import { readFile, writeFile } from 'fs';
import { resolve } from 'path';

readFile(resolve('./dist/package.json'), 'utf8', (err, json) => {
  const pkg = JSON.parse(json);
  pkg.main = 'fesm2015/index.js';
  pkg.types = 'types/index.d.ts';
  pkg.exports['.'].es2015 = './fesm2015/index.js';
  pkg.exports['.'].default = './fesm2015/index.js';
  pkg.exports['.'].types = './types/index.d.ts';
  delete pkg.scripts;
  writeFile(
    resolve('./dist/package.json'),
    JSON.stringify(pkg, null, 2),
    () => {
      process.stdout.write('@in/ui package.json edited for distribution \n');
    }
  );
});
