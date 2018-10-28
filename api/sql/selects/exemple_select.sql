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
                 AND b.codsetormov IN ( 166, 179 )
       INNER JOIN Atendimento_Pronto_Socorro ap
               ON ap.num_atendimento = a.num_atendimento
       INNER JOIN Aux_PSMotivoAtendimento am
               ON am.codigo = ap.codmotatend
       INNER JOIN pacientes p
               ON ( p.matricula = ap.matricula )  
       WHERE  ap.data_hora_boletim BETWEEN '2018/10/20 00:00:00' AND '2018/10/20 23:59:59'
       AND a.codsetormov  in ('165')	
       AND b.num_atendimento IS NULL
       AND ap.codmotatend <> 31
       AND NOT EXISTS (SELECT aps.*
                       FROM   Atendimento_PSMovimentacao aps
                       WHERE      aps.num_atendimento = a.num_atendimento
                              AND aps.codtipomov      = 10)
ORDER  BY classificacaoatual, dt_nasc