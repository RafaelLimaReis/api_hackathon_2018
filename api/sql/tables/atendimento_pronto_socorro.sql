CREATE TABLE Atendimento_Pronto_Socorro(
	`Num_Atendimento` char(10) NOT NULL,
	`Data_Hora_Boletim` datetime(3) NULL,
	`Cod_Unidade` int NULL,
	`Usuario_Atendimento` varchar(20) NULL,
	`Matricula` int NULL,
	`Motivo_Atendimento` varchar(50) NULL,
	`Atendimento_Online` smallint NULL,
	`Nome_Acompanhante` varchar(50) NULL,
	`Documento_Acompanhante` varchar(20) NULL,
	`CodMotAtend` smallint NULL,
	`CodTipoEntrada` int NULL,
	`Codi_UsuaAtend` int NULL,
	`ClassificacaoAtual` int NULL,
	`CodigoIntercorrencia` int NULL,
	`DeficienteFisico` int NULL,
	`DeficienteVisual` int NULL,
	`Gestante` int NULL,
	`RAAT` int NULL,
 CONSTRAINT `PK_Atendimento_Pronto_Socorro_Novo` PRIMARY KEY 
(
	`Num_Atendimento` ASC
) 
);
