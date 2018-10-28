const ngaService = require('./ngaService');

module.exports = {
    getExemplo,
    getExemplo1
};

async function getExemplo(req) {
    return await ngaService.getExemplo(req.params.data);
}

async function getExemplo1(){
    return await ngaService.getExemplo1();
}