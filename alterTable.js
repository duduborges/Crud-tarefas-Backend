import { query } from './database.js';

const createTableSQL = `
  ALTER TABLE tarefas 
    add concluido varchar(7)
`;

query(createTableSQL)
     .then(() => {
          console.log('Tabela alterada com sucesso');
     })
     .catch((err) => {
          console.error('Erro ao alterar tabela:', err);
     });
