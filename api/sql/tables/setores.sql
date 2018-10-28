CREATE TABLE Setores(
	`Cod_Setor` int NOT NULL,
	`Sequencia` int NOT NULL,
	`Setor` varchar(200) NULL,
	`Setor_Recebedor` varchar(200) NULL,
	`Status` varchar(1) NULL,
	`Localiza` char(1) NULL,
	`Codigo_Sequencial_Setor` int NOT NULL,
	`email` varchar(100) NULL,
	`EnviaSN` char(1) NULL,
	`CodSetor_Recebedor` int NULL,
	`FinalSN` varchar(1) DEFAULT 'N',
	`RecebeTramiteSN` varchar(1) DEFAULT 'S',
	`Lotacao` varchar(5) NULL,
	`AdminPonto` varchar(1) NULL,
	`Codigo_CNES` int NULL,
	`Codi_UsuaResponsavel` int NULL,
	`DivulgaNoticiaSN` char(1) NULL,
	`Codigo_Saude` int NULL,
	`NomeCompletoSetor` varchar(200) NULL,
	`CodigoSetorPai` int NULL,
	`ControlaPrazoSN` char(1) NULL,
	`emailEsic` varchar(100) NULL,
 CONSTRAINT `PK_Setores` PRIMARY KEY 
(
	`Codigo_Sequencial_Setor` ASC
) ,
 CONSTRAINT `IX_Setores` UNIQUE 
(
	`Codigo_Sequencial_Setor` ASC
) 
);