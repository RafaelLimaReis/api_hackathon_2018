const ngaController = require('./ngaController');

module.exports = [{
    verbo: 'get',
    rota: '/nga/getExemplo',
    metodo: ngaController.getExemplo,
    public: true
    
}, {
    verbo: 'get',
    rota: '/nga/getExemplo1/:data',
    metodo: ngaController.getExemplo1,
    public: true
}
];