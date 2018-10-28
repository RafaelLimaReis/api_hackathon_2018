const upasRepository = require('./upasRepository');
const moment = require('moment');
const error = require('../../configs/error');

module.exports = {
    getDetails,
    upaForHour,
    getUpas,
    upaWeek,
    mediumTime,
    classification
}

async function getDetails(upa){

    const data = await upasRepository.getDetails(upa);
    
    let currentYear = moment();
    let qtdPatient = 0;
    let qtdOldMan = 0;
    let qtdWithoutClassification = 0;
    let qtdBlueClassification = 0;
    let qtdGreenClassification = 0;
    let qtdYellowClassification = 0;
    let qtdRedClassification = 0;

    let values = [];

    currentYear = moment(currentYear,"DD/MM/YYYY").year();
    qtdPatient = data.length;

    data.forEach((res) => {
        let age = moment(res.dt_nasc,"DD/MM/YYYY").year();
        age = currentYear - age;

        if(age >= 60){
            qtdOldMan += 1;
        }

        switch(res.classificacaoatual) {
            case 0:
                qtdWithoutClassification += 1;
                break;
            case 1:
                qtdBlueClassification += 1;
                break;
            case 2:
                qtdGreenClassification += 1;
                break;
            case 3:
                qtdYellowClassification += 1;
                break;
            case 4:
                qtdRedClassification += 1;
                break;
        }
    });

    const dataAverageTime = await upasRepository.getAverageTime(upa);

    let sumTimeMedium = 0;
    let countData = 0;

    dataAverageTime.forEach((res) => {
        if(res.classificacaomotivoatendimento == 0 || res.classificacaomotivoatendimento == 1 || res.classificacaomotivoatendimento == 2){
            sumTimeMedium += res.tempoconsulta;
            countData += 1;
        }
    });

    let medium = sumTimeMedium / countData;
    
    values.push({
        'description':'Média do tempo de espera',
        'total': medium,
        'cor':'w3-metro-dark-green'
    },{
        'description':'Total de Pacientes',
        'total': qtdPatient,
        'cor':'w3-metro-dark-blue'
    },{
        'description':'Sem Classificação',
        'total': qtdWithoutClassification,
        'cor':'w3-metro-light-blue'
    }, {
        'description':'Classificação Azul',
        'total': qtdBlueClassification,
        'cor':'w3-metro-blue'
    }, {
        'description':'Classificação Verde',
        'total': qtdGreenClassification,
        'cor':'w3-metro-green'
    }, {
        'description':'Classificação Amarelo',
        'total': qtdYellowClassification,
        'cor':'w3-metro-yellow'
    }, {
        'description':'Classificação Vermelho',
        'total': qtdRedClassification,
        'cor':'w3-metro-red'
    }, 
    {
        'description':'Idosos',
        'total': qtdOldMan,
        'cor':'w3-metro-purple'
    });
    
    return values;
    
}

async function getUpas(){
    
    const data = await upasRepository.getUpas();
    
    let qtdUpaAnita = 0;
    let qtdUpaAero = 0;
    let qtdPSR = 0;

    let values = [];

    data.forEach((res) => {
        switch(res.codsetormov) {
            case 303:
                qtdUpaAero += 1;
                break;
            case 339:
                qtdUpaAnita += 1;
                break;
            case 165:
                qtdPSR += 1;
                break;
        }
    });

    values.push({
        'id': 303,
        'description': 'Upa Aeroporto',
        'total': qtdUpaAero
    },{
        'id': 339,
        'description': 'Upa Anita',
        'total': qtdUpaAnita
    },{
        'id': 165,
        'description': 'Pronto Socorro',
        'total': qtdPSR
    });

    return values;   
}

async function upaForHour(upa) {
    const data = await upasRepository.upaForHour(upa);
    
    const response = {
        hours: [],
        values: []
    }
    
    data.forEach((value, i) => {
        response.hours.push(`${value.Hora}h`);
        response.values.push(value.Qtde);
    });
    return response;
}

async function upaWeek(upa, day) {
    const data = await upasRepository.upaWeek(upa, day);
    
    const response = {
        hours: [],
        values: []
    }

    data.forEach((value, i) => {
        response.hours.push(`${value.Hora}h`);
        response.values.push(value.Qtde);
    });
    return response;
}

async function mediumTime(startDate, endDate){

    const data = await upasRepository.mediumTime(startDate, endDate);

    let sumTimeMedium = 0;
    let countData = 0;

    let values = [];
    data.forEach((res) => {
        if(res.classificacaomotivoatendimento == 0 || res.classificacaomotivoatendimento == 1 || res.classificacaomotivoatendimento == 2){
            sumTimeMedium += res.tempoconsulta;
            countData += 1;
        }
    });

    let medium = sumTimeMedium / countData;
    
    values.push({
        'description':'Média do tempo de espera',
        'total': medium,
    });

    return values;
}

async function classification(upa, dayStart, dayEnd) {
    const data = await upasRepository.classification(upa, dayStart, dayEnd);
    let hour = -1;
    const response = {
        hours: [],
        values: [{
            'description': 'Normal',
            'number': 1,
            'quantity': [],
            'color': 'rgba(45, 137, 239, 0.5)'
        }, 
        {
            'description': 'Médio',
            'number': 2,
            'quantity': [],
            'color': 'rgba(0, 163, 0, 0.5)'
        },
        {
            'description': 'Grave',
            'number': 3,
            'quantity': [],
            'color': 'rgba(255, 196, 13, 0.5)'
        },
        {
            'description': 'Gravissimo',
            'number': 4,
            'quantity': [],
            'color': 'rgba(238, 17, 17, 0.5)'
        },
        ]
    }
    data.forEach((value, i) => {
        if (i == 0 || value.Hora > data[i - 1].Hora) {
            response.hours.push(`${value.Hora}h`);
            hour++;
        }
    });

    let start = 0;
    data.forEach((value, i) => {
        response.values.forEach((res, i) => {
            if (res.number === value.ClassificacaoAtual) {
                res.quantity[value.Hora] = value.Qtde;
            } else {
                if (res.quantity[value.Hora] == undefined) {
                    res.quantity[value.Hora] = 0;
                }
            };
        });
    });

    console.log(hour);
    return response;
}


