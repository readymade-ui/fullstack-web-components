import copyfiles from 'copyfiles';

const files = [
  'favicon.ico',
  'src/template.html',
  './../style/dist/style.css',
  'dist',
];

copyfiles(files, true, () => {});
