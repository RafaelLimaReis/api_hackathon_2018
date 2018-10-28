CREATE TABLE Aux_PSMotivoAtendimento(
	`Codigo` smallint NOT NULL,
	`Descricao` varchar(50) NOT NULL,
	`ObservacoesPertinentes` varchar(1000) NULL,
	`ObservacoesGerais` varchar(500) NULL,
	`Classificacao` int NULL,
	`Inativo` Tinyint DEFAULT 0,
 CONSTRAINT `PK_Aux_PSMotivoAtendimento1` PRIMARY KEY 
(
	`Codigo` ASC
) 
);