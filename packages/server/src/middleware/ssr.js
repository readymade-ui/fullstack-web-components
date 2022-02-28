import { render } from '@lit-labs/ssr/lib/render-with-global-dom-shim.js';
import { html } from 'lit';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { minify } from 'html-minifier-terser';
import { Buffer } from 'buffer';
import { Readable } from 'stream';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import url from 'url';

import { routes } from './../../../client/dist/index.js';

const clientPath = (filename) =>
  resolve(`${process.cwd()}../../client/dist/${filename}`);
const stylePath = (filename) =>
  resolve(`${process.cwd()}../../style/dist/${filename}`);
const readClientFile = (filename) =>
  readFileSync(clientPath(filename)).toString();
const readStyleFile = (filename) =>
  readFileSync(stylePath(filename)).toString();

const styles = await minify(readStyleFile('style.css'), {
  minifyCSS: true,
  removeComments: true,
  collapseWhitespace: true,
});
const htmlTemplates = await minify(readClientFile('template.html'), {
  minifyCSS: true,
  removeComments: true,
  collapseWhitespace: true,
});

export const sanitizeTemplate = async (template) => {
  return html`${unsafeHTML(template)}`;
};

async function streamToString(stream) {
  const chunks = [];
  for await (let chunk of stream) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString('utf-8');
}

async function renderStream(stream) {
  return await streamToString(Readable.from(stream));
}

function* renderApp(route, template) {
  yield `
    <!doctype html>
    <html>
      <head>
          <title>${route.title}</title>
          <meta name="Description" content="${route.description}">
          <style rel="stylesheet" type="text/css">
              @import url("/style/font/Lato-Regular.ttf");
              @import url("/style/font/Lato-Black.ttf");
          </style>
          <style rel="stylesheet" type="text/css">${styles}</style>
          <script type="application/ld+json">${route.schema}</script>
          <script type="module">${readClientFile('polyfill.js')}</script>
      </head>
      <body> 
      ${htmlTemplates}
      <div id="root">`;
  yield* render(template);
  yield `</div>
      <script type="module">${readClientFile(`ponyfill.js`)}</script>
      <script type="module">${readClientFile(`index.js`)}</script>
    </body>
    </html>`;
}

export default async (req, res, next) => {
  const route = routes.find((rt) => rt.path === url.parse(req.url).pathname);
  if (route == undefined) {
    res.redirect(301, '/404');
    return;
  }
  const template = await sanitizeTemplate(
    route.template(route.data ? route.data : {})
  );
  const ssrResult = await renderApp(route, template);
  let stream = await renderStream(ssrResult);
  stream = stream.replace(/<template shadowroot="open"><\/template>/g, '');
  res.status(200).send(stream);
};
