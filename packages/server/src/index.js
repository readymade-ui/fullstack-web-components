import chalk from 'chalk';
import express from 'express';
import path from 'path';
import compression from 'compression';
import fs from 'fs';
import http from 'http';
import https from 'https';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';

import apiRouter from './middleware/api.js';
import { configurePassport } from './service/passport.js';
import { config } from './config.js';

const app = express();
const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || config.port || '4443';
const protocol = process.env.PROTOCOL || 'HTTP';
const corsOptions = env === 'production' ? { origin: `${config.host}` } : {};
let server;

const clientPath = (filename) =>
  path.resolve(`${process.cwd()}../../client/dist/${filename}`);
const stylePath = () => path.resolve(`${process.cwd()}../../style/dist`);

if (protocol === 'HTTPS') {
  const sslOptions = {
    key: fs.readFileSync(path.join(process.cwd(), '.config', 'ssl', 'key.pem')),
    cert: fs.readFileSync(
      path.join(process.cwd(), '.config', 'ssl', 'cert.pem')
    ),
    requestCert: false,
    rejectUnauthorized: false,
  };
  server = https.createServer(sslOptions, app);
} else {
  server = http.createServer(app);
}

configurePassport(passport);

app.use(cors(corsOptions));
app.use(bodyParser.json());

const staticOptions = {
  dotfiles: 'ignore',
  extensions: ['htm', 'html'],
  index: false,
  redirect: false,
};

if (env === 'production') {
  app.use(compression());
}

app.use(cookieParser('foo'));
app.use(
  session({
    secret: 'foo',
    saveUninitialized: false,
    resave: true,
    cookie: {
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(clientPath('/'), staticOptions));

app.use(
  '/style',
  express.static(stylePath(), {
    dotfiles: 'ignore',
    extensions: ['ttf'],
    index: false,
    redirect: false,
  })
);

app.use('/api', apiRouter);

app.get('/*', (req, res) => {
  res.sendFile(clientPath('index.html'));
});

server.listen(port, () => {
  const addr = `${protocol === 'HTTPS' ? 'https' : 'http'}://localhost:${port}`;
  process.stdout.write(
    `\n [${new Date().toISOString()}] ${chalk.green(
      'Server running:'
    )} ${chalk.blue(addr)} \n`
  );
});

export default app;
export { passport };
