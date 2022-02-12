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

app.get('/', (req, res) => {
  res.sendFile(
    path.resolve(process.cwd(), '../', 'client', 'dist', 'index.html')
  );
});

app.get('/login', (req, res) => {
  res.sendFile(
    path.resolve(process.cwd(), '../', 'client', 'dist', 'login.html')
  );
});

app.get('/dashboard', (req, res) => {
  if (!req.user) {
    res.redirect('/login');
  }
  res.sendFile(
    path.resolve(process.cwd(), '../', 'client', 'dist', 'dashboard.html')
  );
});

app.use(
  express.static(
    path.resolve(process.cwd(), '../', 'client', 'dist'),
    staticOptions
  )
);
// app.use(
//   express.static(path.resolve(process.cwd(), '../', 'client', 'dist', 'asset'))
// );

app.use('/api', apiRouter);

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
