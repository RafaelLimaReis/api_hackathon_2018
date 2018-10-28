const ngaRepository = require('./ngaRepository'),
error = require('../../configs/error');

module.exports = {
    getExemplo,
    getExemplo1
}

async function getExemplo(data) {
   try {

    const retorno = await ngaRepository.getExemplo();

   } catch (error) {
       throw error;
   }
} 

async function getExemplo1(){
    try {

        const retorno = await ngaRepository.getExemplo();

    } catch (error) {
        throw error;
    }
}
