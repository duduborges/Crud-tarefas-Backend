import { query } from './database.js';

const createTableSQL = `
  CREATE TABLE tarefas (
    id VARCHAR(255) PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL, 
    descricao VARCHAR(255) NOT NULL,
    cor VARCHAR(255) 
  );
`;

query(createTableSQL)
     .then(() => {
          console.log('Tabela criada com sucesso');
     })
     .catch((err) => {
          console.error('Erro ao criar tabela:', err);
     });
