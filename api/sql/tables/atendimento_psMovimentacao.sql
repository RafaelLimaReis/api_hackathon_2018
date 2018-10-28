CREATE TABLE Atendimento_PSMovimentacao(
	`Num_Atendimento` varchar(10) NOT NULL,
	`Seq` int NOT NULL,
	`DataHoraMov` datetime(3) NOT NULL,
	`CodTipoMov` int NOT NULL,
	`Codi_UsuaMov` int NULL,
	`ObservacaoMov` varchar(2500) NULL,
	`CodSetorMov` int NOT NULL,
	`CodSetorEncaminhado` int NULL,
 CONSTRAINT `PK_AtendimentoPSMovimentacao` PRIMARY KEY 
(
	`Num_Atendimento` ASC,
	`Seq` ASC,
	`DataHoraMov` ASC,
	`CodTipoMov` ASC
) 
);