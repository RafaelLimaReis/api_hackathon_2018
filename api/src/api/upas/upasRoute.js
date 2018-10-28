const upasController = require('./upasController');

module.exports = [
    {
        verbo: 'get',
        rota: '/upas/',
        metodo: upasController.getUpas,
        public: true
    },
    {
        verbo: 'get',
        rota: '/upas/detalhes/:upa',
        metodo: upasController.getDetails,
        public: true,
    },
    {
        verbo: 'get',
        rota: '/upas/:data',
        metodo: upasController.upaForHour,
        public: true
    },
    {
        verbo: 'get',
        rota: '/upas/mediumTime/:startDate/:endDate',
        metodo: upasController.mediumTime,
        public: true
    },
    {
        verbo: 'get',
        rota: '/upas/:upa/:day',
        metodo: upasController.upaWeek,
        public: true
    },
    {
        verbo: 'get',
        rota: '/upas/:upa/:dayStart/:dayEnd',
        metodo: upasController.classification,
        public: true
    }
];