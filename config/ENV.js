// DEFINIÇÃO DEFAULT DE VARIÁVEIS DE AMBIENTE
require('dotenv').config();
const _ = require('lodash');
const {
  name, version, description, config,
} = require('../package.json');

const PORT = (process.env.PORT || 3000);

const ENV = _.merge({
  PORT,
  PUBLIC_DIR: './public',
  AWS_REGION: 'us-east-1',
  AWS_KEY_ID: '',
  AWS_SECRET: '',
  AWS_DYNAMO_API_VERSION: '2012-08-10',
  APP_PWD: '1234',
  APP_SECRET: '123456',
  PROXY_TIMEOUT: 2000,
}, {
  name, version, description, config,
}, process.env);

module.exports = ENV;
