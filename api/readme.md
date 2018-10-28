## API HELPERS
Exemplos de como dar start na api e/ou criar novas querys para o banco.
### DATABASE
##### CONFIGURAÇÃO
 - Copiar `.env.exemple` e renomear para `.env`
 - Preencher todas as variaveis de ambiente

##### QUERYS
- Dar `require` no arquivo `database.js`:
```javascript
 const database = require('../configs/database.js')
```
- Seguir a estrutura de query a seguir:
```javascript
 database.query('QUERY', (error, results, fields) => {
  if (error) throw error;
  console.log(results);
});
```
##### START
Para inicializar a api, vá até a pasta do projeto e execute o seguinte comando:
`npm start`