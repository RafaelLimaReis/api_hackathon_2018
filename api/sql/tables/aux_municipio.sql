CREATE TABLE aux_municipio(
	`Uf` varchar(2) NOT NULL,
	`CODMUNIC` varchar(4) NOT NULL,
	`NOME` varchar(40) NULL,
	`CONDIC` varchar(2) NULL,
	`TETOPAB` Decimal(15,4) NULL,
	`CALCPAB` Decimal(15,4) NULL,
	`DTHABIL` varchar(6) NULL,
	`Cod_UF` varchar(2) NULL,
	`Cod_IBGE` char(7) NULL,
	`Regiao` varchar(1) NULL,
	`DistKmFranca` int NULL
);