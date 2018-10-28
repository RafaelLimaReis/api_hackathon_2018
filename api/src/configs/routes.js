const fs = require("fs"),
error = require( './error');

module.exports = app => {
  fs.readdir("src/api/", (err, files) => {
    files.forEach(element => {
      const path = `src/api/${element}/${element}Route.js`;
      if (fs.existsSync(path)) {
        require(`../api/${element}/${element}Route`).map(func => {
          app[func.verbo](func.rota, api(func.metodo));
        });
      }
    });
  });
};

function api(metodo) {
  return async (req, res) => {
    try {
      let retorno = await metodo(req);
      res.status(200).json(retorno);
    } catch (e) {
      return res.status(e.statusCode || error.statusCode).json(e.userMessage ? e : error);
    }
  }
}