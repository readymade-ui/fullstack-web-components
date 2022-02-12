const env = process.env.NODE_ENV || 'development';

let config;

if (env === 'development') {
  config = {
    env: 'development',
    host: 'http://localhost:4443',
    protocol: 'http',
    port: '4443',
  };
}

if (env === 'production') {
  config = {
    env: 'production',
    host: 'http://localhost:4444',
    protocol: 'https',
    port: '4444',
  };
}

function requestPath(path) {
  return `${config.host}/${path}`;
}

export { config, requestPath };
