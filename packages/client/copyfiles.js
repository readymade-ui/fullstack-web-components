import copyfiles from 'copyfiles';

const files = ['favicon.ico', './../style/dist/style.css', 'dist'];

copyfiles(files, true, () => {});
