require('dotenv').config();

const load = require('consign');
const app = require('express')();

const database = require('./src/configs/database');

/**
 * configurar consign para carregar todos os modulos
 * na doc https://www.npmjs.com/package/consign
 *
 */
load()
  .then('./src/configs/middlewares.js')
  .then('./src/configs/routes.js')
  .into(app);

// start server
const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`Server start in port ${port}`);
});

