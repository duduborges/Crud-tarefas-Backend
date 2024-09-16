import express from 'express';
import cors from 'cors';
import { DatabaseTarefa } from './services.js';

const app = express();
const database = new DatabaseTarefa();

app.use(cors({
     origin: '*',
     methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());

app.listen(3333, () => {
     console.log('Servidor rodando na porta 3333');
});

//----------------ROTAS---DO---CRUD---------------------//

//teste 

app.get("/", (req, res) => {
     return res.send("teste");
});

// Criar (rota POST)

app.post('/tarefas', async (req, res) => {
     try {
          const body = req.body;
          await database.createTarefa(body);
          res.status(201).send("Tarefa criada com sucesso!");
     } catch (error) {
          console.error("Erro ao criar tarefa!", error);
          res.status(500).send("Erro ao criar tarefa.");
     }
});

// Mostrar as tarefas (rota GET)

app.get('/tarefas', async (req, res) => {
     try {
          const tarefas = await database.listTarefa();
          res.status(200).json(tarefas);
     } catch (error) {
          console.error("Erro ao buscar tarefas!", error);
          res.status(500).send("Erro ao buscar tarefas.");
     }
});

// Mostrar tarefa por ID (rota GET com ID)

app.get("/tarefas/:id", async (req, res) => {
     try {
          const tarefaID = req.params.id;
          const tarefa = await database.listTarefaByID(tarefaID);
          if (tarefa.length > 0) {
               res.status(200).json(tarefa);
          } else {
               res.status(404).send("Tarefa não encontrada.");
          }
     } catch (error) {
          console.error("Erro ao buscar tarefa por ID!", error);
          res.status(500).send("Erro ao buscar tarefa por ID.");
     }
});

// Deletar tarefa (rota DELETE)

app.delete("/tarefas/:id", async (req, res) => {
     try {
          const tarefaID = req.params.id;

          await database.deleteTarefa(tarefaID);
          res.status(200).send("Tarefa deletada com sucesso.");
     } catch (error) {
          if (error.message === 'Tarefa não encontrada') {
               res.status(404).send("Tarefa não encontrada.");
          } else {
               console.error("Erro ao deletar tarefa!", error);
               res.status(500).send("Erro ao deletar tarefa.");
          }
     }
});


// Atualizar tarefa (rota PUT)

app.put('/tarefas/:id', async (req, res) => {
     try {
          const tarefaID = req.params.id;
          const { titulo, descricao, cor } = req.body;

          const alteracoes = {
               titulo,
               descricao,
               cor,
          };

          await database.updateTarefa(tarefaID, alteracoes);
          res.status(200).send("Tarefa atualizada com sucesso.");
     } catch (error) {
          if (error.message === 'Tarefa não encontrada') {
               res.status(404).send("Tarefa não encontrada.");
          } else {
               console.error("Erro ao atualizar tarefa!", error);
               res.status(500).send("Erro ao atualizar tarefa.");
          }
     }
});