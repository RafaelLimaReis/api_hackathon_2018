CREATE TABLE Atendimento_PSAcolhimento(
	`Num_Atendimento` char(10) NOT NULL,
	`Sequencia` int NOT NULL,
	`PA` char(10) NULL,
	`Medicado` Tinyint NULL,
	`FC` int NULL,
	`Temp` Double NULL,
	`NegaFebre` int NULL,
	`Sat` int NULL,
	`FR` int NULL,
	`Dextro` char(3) NULL,
	`Insulina` int NULL,
	`InsulinaQtde` int NULL,
	`Via` int NULL,
	`Glasgow` int NULL,
	`Observacao` Varchar(500) NULL,
	`Data_hora` datetime(3) NULL,
	`Cod_Prof` char(10) NULL,
	`Dor` int NULL,
	`TipoDor` int NULL,
	`ParesiaFacial` int NULL,
	`ForcaMotora` int NULL,
	`Fala` int NULL,
 CONSTRAINT `PK_Atendimento_PSAcolhimento` PRIMARY KEY 
(
	`Num_Atendimento` ASC,
	`Sequencia` ASC
) 
);
