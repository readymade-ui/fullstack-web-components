var copyfiles = require('copyfiles');

const files = ['favicon.ico', './../style/dist/style.css', 'dist'];

copyfiles(files, true, () => {});
