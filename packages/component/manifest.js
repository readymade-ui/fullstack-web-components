import { readFile, writeFile } from 'fs';
import { resolve } from 'path';

readFile(resolve('./custom-elements.json'), 'utf8', (err, content) => {
  content = content.replace(/\.\/src/g, './packages/component/src');
  content = content.replace(
    /dist\/fesm2015/g,
    'packages/component/dist/fesm2015'
  );
  content = JSON.parse(content);
  writeFile(
    resolve('./../../custom-elements.json'),
    JSON.stringify(content, null, 2),
    () => {
      process.stdout.write('custom-elements.json saved to root \n');
    }
  );
});
