create database outsiders_database;

use outsiders_database;

select * from consultas;

select * from Atendimento_Pronto_Socorro;

SELECT DISTINCT( a.num_atendimento ),
        ap.data_hora_boletim,
        p.nome,
        p.dt_nasc,
        am.descricao,
        ap.motivo_atendimento AS complementomotivo,
        ap.classificacaoatual, a.codsetormov, p.sexo, p.cartao_sus
FROM   Atendimento_PSMovimentacao a
       LEFT JOIN Atendimento_PSMovimentacao b
              ON a.num_atendimento = b.num_atendimento
                 AND b.codsetormov IN (166, 179)
       INNER JOIN Atendimento_Pronto_Socorro ap
               ON ap.num_atendimento = a.num_atendimento
       INNER JOIN Aux_PSMotivoAtendimento am
               ON am.codigo = ap.codmotatend
       INNER JOIN pacientes p
               ON ( p.matricula = ap.matricula )  
       WHERE  ap.data_hora_boletim BETWEEN '2018/10/20 00:00:00' AND '2018/10/20 23:59:59'
       AND a.codsetormov  in (165)	
       AND b.num_atendimento IS NULL
       AND ap.codmotatend <> 31
       AND NOT EXISTS (SELECT aps.*
                       FROM   Atendimento_PSMovimentacao aps
                       WHERE      aps.num_atendimento = a.num_atendimento
                              AND aps.codtipomov      = 10)
ORDER  BY classificacaoatual, dt_nasc;

SELECT DISTINCT( a.num_atendimento ),
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
                       FROM   Atendimento_PSMovimentacao aps
                       WHERE      aps.num_atendimento = a.num_atendimento
                              AND aps.codtipomov      = 10)
ORDER  BY classificacaoatual, dt_nasc;



SELECT aps.num_atendimento,
       aa.sequencia,
       aps.cod_unidade,
       aps.data_hora_boletim                             AS DataEmissaoFicha,
       aa.data_hora                                      AS DataAcolhimento,
       c.hora_ini_atend                                  AS horainicialconsulta,
       am.descricao,
       TIMESTAMPDIFF(minute,aps.data_hora_boletim,aa.data_hora) AS tempoacolhimento,
       aps.classificacaoatual                            AS classficacaoboletim,
       TIMESTAMPDIFF(minute,aa.data_hora, c.hora_ini_atend)      AS tempoconsulta,
       am.classificacao                                  AS classificacaomotivoatendimento,
       p.nome
FROM   atendimento_pronto_socorro aps
       INNER JOIN atendimento_psacolhimento aa               ON ( aa.num_atendimento = aps.num_atendimento )
       INNER JOIN pacientes p               ON ( p.matricula = aps.matricula )
       INNER JOIN aux_psmotivoatendimento am               ON ( am.codigo = aps.codmotatend )
       LEFT JOIN consultas c              ON ( c.cod_paciente = aps.matricula
                   AND c.num_atendimentops = aps.num_atendimento
                   AND c.cons_paciente = (SELECT c2.cons_paciente
                                          FROM   consultas c2 WHERE      c2.cod_paciente      = aps.matricula
                                                 AND c2.num_atendimentops = aps.num_atendimento
                                          ORDER  BY c2.cons_paciente LIMIT 1) )
WHERE  aps.data_hora_boletim BETWEEN '2018/10/20 00:00:00' AND '2018/10/20 23:59:59'
       AND CONVERT(aps.data_hora_boletim, char(8)) BETWEEN '00:00:00' AND '23:59:59'
       AND aps.cod_unidade in (91821, 2049273, 2049268)
       
   