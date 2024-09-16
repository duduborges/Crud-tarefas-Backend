import { randomUUID } from "crypto";
import { query } from './database.js';

export class DatabaseTarefa {

     // Listar todas as tarefas
     async listTarefa() {
          const results = await query('SELECT * FROM tarefas');
          return results;
     };

     // Listar tarefa por ID
     async listTarefaByID(id) {
          const tarefas = await query('SELECT * FROM tarefas WHERE id = ?', [id]);
          return tarefas;
     }

     // Listar tarefa não concluidas
     async listTarefaByConcluida() {
          const tarefas = await query('SELECT * FROM tarefas WHERE concluido = true');
          return tarefas;
     }

     // Listar tarefas não concluidas
     async listTarefaByNaoConcluida() {
          const tarefas = await query('SELECT * FROM tarefas WHERE concluido = false ');
          return tarefas;
     }

     // Criar nova tarefa
     async createTarefa(tarefa) {
          const id = randomUUID();
          const { titulo, descricao, cor, corTexto, concluido } = tarefa;

          await query(
               'INSERT INTO tarefas (id, titulo, descricao, cor, corTexto, concluido) VALUES (?, ?, ?, ?, ?, ?)',
               [id, titulo, descricao, cor, corTexto, concluido]
          );
     }

     // Atualizar tarefa por ID
     async updateTarefa(id, tarefa) {
          const { titulo, descricao, cor, corTexto, concluido } = tarefa;

          const existe = await query('SELECT * FROM tarefas WHERE id = ?', [id]);
          if (existe.length === 0) {
               throw new Error('Tarefa não encontrada');
          }
          await query(
               'UPDATE tarefas SET titulo = ?, descricao = ?, cor = ?, corTexto = ?,  concluido =? WHERE id = ?',
               [titulo, descricao, cor, corTexto, concluido, id]
          );
     }

     // Deletar tarefa por ID
     async deleteTarefa(id) {
          const existe = await query('SELECT * FROM tarefas WHERE id = ?', [id]);
          if (existe.length === 0) {
               throw new Error('Tarefa não encontrada');
          }

          await query('DELETE FROM tarefas WHERE id = ?', [id]);
     }

     // Marcar concluido

     async concluirTarefa(id, tarefa) {
          const { concluido } = tarefa;

          const existe = await query('SELECT * FROM tarefas WHERE id = ?', [id]);
          if (existe.length === 0) {
               throw new Error('Tarefa não encontrada');
          }
          await query(
               'UPDATE tarefas SET concluido =? WHERE id = ?',
               [corTexto, concluido, id]
          );
     }
}
