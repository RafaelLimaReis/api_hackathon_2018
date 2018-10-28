const database = require('./../../configs/database');
const moment = require('moment');
moment.locale('pt-BR');

module.exports = {
    getDetails,
    upaForHour,
    getUpas,
    upaWeek,
    getAverageTime,
    mediumTime,
    classification
}

async function getDetails(upa){

    let codigo = null;

    if(upa == 303){
        codigo = '310,307,308,328';
    } else if (upa == 339) {
        codigo = '346,343';
    } else if (upa == 165){
        codigo = '166,179';
    }

    const startDate = moment().format('YYYY-MM-DD HH:mm:ss');
    const endDate = moment().format('YYYY-MM-DD HH:mm:ss');
    // datas devem ser usadas caso atualizar base

   return new Promise (function(resolve, reject) {
        database.query(`SELECT DISTINCT( a.num_atendimento ),
                                        ap.data_hora_boletim,
                                        p.nome,
                                        p.dt_nasc,
                                        am.descricao,
                                        ap.motivo_atendimento AS complementomotivo,
                                        ap.classificacaoatual, a.codsetormov, p.sexo, p.cartao_sus
                        FROM   Atendimento_PSMovimentacao a
                        LEFT JOIN Atendimento_PSMovimentacao b
                            ON a.num_atendimento = b.num_atendimento
                                AND b.codsetormov IN (${codigo})
                        INNER JOIN Atendimento_Pronto_Socorro ap
                            ON ap.num_atendimento = a.num_atendimento
                        INNER JOIN Aux_PSMotivoAtendimento am
                            ON am.codigo = ap.codmotatend
                        INNER JOIN pacientes p
                            ON ( p.matricula = ap.matricula )  
                        WHERE  ap.data_hora_boletim BETWEEN '2018/10/20 00:00:00' AND '2018/10/20 23:59:59'
                        AND a.codsetormov  in (${upa})	
                        AND b.num_atendimento IS NULL
                        AND ap.codmotatend <> 31
                        AND NOT EXISTS (SELECT aps.*
                                        FROM Atendimento_PSMovimentacao aps
                                        WHERE aps.num_atendimento = a.num_atendimento
                                        AND aps.codtipomov      = 10)
                        ORDER  BY classificacaoatual, dt_nasc;`, 
        (error, results, fields) => {
        if (error) reject(error);
        resolve(results);
       
        });
   });
};  

async function upaForHour(upa)
{
    let codUnity = null;
    if (upa.toUpperCase() === 'AERO') {
        codUnity = 2049268;
    }else if(upa.toUpperCase() === 'ANITA') {
        codUnity = 2049273;
    }else if(upa.toUpperCase() === 'PSR') {
        codUnity = 91821;
    }else {
        return null;
    }

    const startDate = moment().format('YYYY-MM-DD HH:mm:ss');
    const endDate = moment().subtract(12, 'hours').format('YYYY-MM-DD HH:mm:ss');
    // datas devem ser usadas caso atualizar base
    
    return new Promise(function (resolve, reject) {
        database.query(`SELECT HOUR(data_hora_boletim) AS Hora,
            Count(*) AS Qtde
            FROM   Atendimento_Pronto_Socorro
            WHERE  data_hora_boletim BETWEEN ? AND ?
            AND cod_unidade = ?
            GROUP  BY HOUR(data_hora_boletim)
            ORDER  BY hora;`, ['2018/10/20 00:00:00', '2018/10/20 23:59:59', codUnity], function (err, results) {
                if (err) reject(err);
                resolve(results);
            });
   });  
}

async function getUpas(){
    const startDate = moment().format('YYYY-MM-DD HH:mm:ss');
    const endDate = moment().format('YYYY-MM-DD HH:mm:ss');
    // datas devem ser usadas caso atualizar base
    return new Promise(function(resolve,reject){
        database.query(`SELECT DISTINCT( a.num_atendimento ),
                                        ap.data_hora_boletim,
                                        p.nome,
                                        p.dt_nasc,
                                        am.descricao,
                                        ap.motivo_atendimento AS complementomotivo,
                                        ap.classificacaoatual, a.codsetormov, p.sexo, p.cartao_sus
                        FROM   Atendimento_PSMovimentacao a
                        LEFT JOIN Atendimento_PSMovimentacao b
                            ON a.num_atendimento = b.num_atendimento
                                AND b.codsetormov IN (166, 179, 346, 343, 310, 307, 308, 328)
                        INNER JOIN Atendimento_Pronto_Socorro ap
                            ON ap.num_atendimento = a.num_atendimento
                        INNER JOIN Aux_PSMotivoAtendimento am
                            ON am.codigo = ap.codmotatend
                        INNER JOIN pacientes p
                            ON ( p.matricula = ap.matricula )  
                        WHERE  ap.data_hora_boletim BETWEEN '2018/10/20 00:00:00' AND '2018/10/20 23:59:59'
                        AND a.codsetormov  in (165, 339, 303)	
                        AND b.num_atendimento IS NULL
                        AND ap.codmotatend <> 31
                        AND NOT EXISTS (SELECT aps.*
                                        FROM Atendimento_PSMovimentacao aps
                                        WHERE aps.num_atendimento = a.num_atendimento
                                        AND aps.codtipomov      = 10)
                        ORDER  BY classificacaoatual, dt_nasc;`, 
        (error, results, fields) => {
        if (error) reject(error);
        resolve(results);

        });
    });
}

async function upaWeek(upa, day)
{
    let codUnity = null;
    if (upa.toUpperCase() === 'AERO') {
        codUnity = 2049268;
    }else if(upa.toUpperCase() === 'ANITA') {
        codUnity = 2049273;
    }else if(upa.toUpperCase() === 'PSR') {
        codUnity = 91821;
    }else {
        return null;
    }

    const myDate = new Date().getDay();
    let date = null; 

    if (myDate < day) {
       date = moment().add((day - myDate), 'days').subtract(7, 'days');
    } else if (myDate == day) {
        date = moment().subtract((7), 'days');
    } else {
        date = moment().subtract((myDate - day), 'days');
    }

    const startDate = date.hours(0).minutes(0).seconds(0).format('YYYY-MM-DD HH:mm:ss');
    const endDate = date.hours(23).minutes(59).seconds(59).format('YYYY-MM-DD HH:mm:ss');

    return new Promise(function (resolve, reject) {
        database.query(`SELECT HOUR(data_hora_boletim) AS Hora,
            Count(*) AS Qtde
            FROM   Atendimento_Pronto_Socorro
            WHERE  data_hora_boletim BETWEEN ? AND ?
            AND cod_unidade = ?
            GROUP  BY HOUR(data_hora_boletim)
            ORDER  BY hora;`, [startDate, endDate, codUnity], function (err, results) {
                if (err) reject(err);
                resolve(results);
            });
    });
}

async function getAverageTime(upa){

    let codUnity = null;
    if (upa == 303) {
        codUnity = 2049268;
    }else if(upa == 339) {
        codUnity = 2049273;
    }else if(upa == 165) {
        codUnity = 91821;
    }

    const startDate = moment().format('YYYY-MM-DD HH:mm:ss');
    const endDate = moment().format('YYYY-MM-DD HH:mm:ss');
    // datas devem ser usadas caso atualizar base

    return new Promise((resolve, reject) => {
        database.query(`SELECT aps.num_atendimento,
                                aa.sequencia,
                                aps.data_hora_boletim AS DataEmissaoFicha,
                                aa.data_hora AS DataAcolhimento,
                                c.hora_ini_atend AS horainicialconsulta,
                                am.descricao,
                                TIMESTAMPDIFF(minute,aps.data_hora_boletim,aa.data_hora) AS tempoacolhimento,
                                aps.classificacaoatual AS classficacaoboletim,
                                TIMESTAMPDIFF(minute,aa.data_hora, c.hora_ini_atend) AS tempoconsulta,
                                am.classificacao AS classificacaomotivoatendimento,
                                p.nome
                        FROM   atendimento_pronto_socorro aps
                        INNER JOIN atendimento_psacolhimento aa 
                            ON ( aa.num_atendimento = aps.num_atendimento )
                        INNER JOIN pacientes p               
                            ON ( p.matricula = aps.matricula )
                        INNER JOIN aux_psmotivoatendimento am               
                            ON ( am.codigo = aps.codmotatend )
                        LEFT JOIN consultas c              
                            ON ( c.cod_paciente = aps.matricula
                                    AND c.num_atendimentops = aps.num_atendimento
                                    AND c.cons_paciente = (SELECT c2.cons_paciente
                                                            FROM consultas c2 
                                                            WHERE c2.cod_paciente = aps.matricula
                                                                AND c2.num_atendimentops = aps.num_atendimento
                                                            ORDER  BY c2.cons_paciente LIMIT 1) )
                        WHERE  aps.data_hora_boletim BETWEEN '2018/10/20 00:00:00' AND '2018/10/20 23:59:59'
                        AND CONVERT(aps.data_hora_boletim, char(8)) BETWEEN '00:00:00' AND '23:59:59'
                        AND aps.cod_unidade = ${codUnity}`, 
        (error, results, fields) => {
        if (error) reject(error);
        resolve(results);
        });
    });
}

async function mediumTime(startDate, endDate){

    startDate = moment().format('YYYY-MM-DD HH:mm:ss');
    endDate = moment().format('YYYY-MM-DD HH:mm:ss');
    // datas devem ser usadas caso atualizar base

    return new Promise((resolve, reject) => {
        database.query(`SELECT aps.num_atendimento,
                                aa.sequencia,
                                aps.cod_unidade,
                                aps.data_hora_boletim AS DataEmissaoFicha,
                                aa.data_hora AS DataAcolhimento,
                                c.hora_ini_atend AS horainicialconsulta,
                                am.descricao,
                                TIMESTAMPDIFF(minute,aps.data_hora_boletim,aa.data_hora) AS tempoacolhimento,
                                aps.classificacaoatual AS classficacaoboletim,
                                TIMESTAMPDIFF(minute,aa.data_hora, c.hora_ini_atend) AS tempoconsulta,
                                am.classificacao AS classificacaomotivoatendimento,
                                p.nome
                        FROM   atendimento_pronto_socorro aps
                        INNER JOIN atendimento_psacolhimento aa 
                            ON ( aa.num_atendimento = aps.num_atendimento )
                        INNER JOIN pacientes p               
                            ON ( p.matricula = aps.matricula )
                        INNER JOIN aux_psmotivoatendimento am               
                            ON ( am.codigo = aps.codmotatend )
                        LEFT JOIN consultas c              
                            ON ( c.cod_paciente = aps.matricula
                                    AND c.num_atendimentops = aps.num_atendimento
                                    AND c.cons_paciente = (SELECT c2.cons_paciente
                                                            FROM consultas c2 
                                                            WHERE c2.cod_paciente = aps.matricula
                                                                AND c2.num_atendimentops = aps.num_atendimento
                                                            ORDER  BY c2.cons_paciente LIMIT 1) )
                        WHERE  aps.data_hora_boletim BETWEEN '2018/10/20 00:00:00' AND '2018/10/20 23:59:59'
                        AND CONVERT(aps.data_hora_boletim, char(8)) BETWEEN '00:00:00' AND '23:59:59'
                        AND aps.cod_unidade in (91821, 2049273, 2049268)`, 
        (error, results, fields) => {
        if (error) reject(error);
        resolve(results);
        });
    });
};

async function classification(upa, dayStart, dayEnd)
{
    let codUnity = null;
    if (upa.toUpperCase() === 'AERO') {
        codUnity = 2049268;
    }else if(upa.toUpperCase() === 'ANITA') {
        codUnity = 2049273;
    }else if(upa.toUpperCase() === 'PSR') {
        codUnity = 91821;
    }else {
        return null;
    }

    const startDate = moment(dayStart, 'YYYY-MM-DD').format('YYYY-MM-DD HH:mm:ss');
    const endDate = moment(dayEnd, 'YYYY-MM-DD')
        .hours(23).minutes(59).seconds(59)    
        .format('YYYY-MM-DD HH:mm:ss');

    return new Promise(function (resolve, reject) {
        database.query(`SELECT HOUR(data_hora_boletim) AS Hora,
		ClassificacaoAtual,
       CAST((Count(*)/ (TIMESTAMPDIFF(DAY, ?, ?) + 1)) AS DECIMAL(4,0))                           AS Qtde
        FROM   Atendimento_Pronto_Socorro
        WHERE  data_hora_boletim BETWEEN ? AND ?
            AND cod_unidade = ?
        GROUP  BY ClassificacaoAtual, HOUR(data_hora_boletim)
        ORDER  BY hora;`, [startDate, endDate, startDate, endDate, codUnity], function (err, results) {
                if (err) reject(err);
                resolve(results);
            });
    });
}