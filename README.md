# Node.js ORM Benchmarks
Este repositório não tem como objetivo apontar de forma direta qual o melhor ORM, novos cenários ou até mesmo novas execuções do cenário abaixo (básico) podem modificar a performance de cada um.

### Testes:
1.  Inserção de dados na tabela de usuário
2.  Inserção de dados na tabela de posts
3.  Obter dados da tabela de usuário
4.  Obter dados da tabela de posts
5.  Obter todos os posts de um usuário

### Tabelas
- Usuário
  ```
  id: auto increment,
  first_name: string,
  last_name: string,
  created_at: timestamp,
  updated_at: timestamp,
  deleted_at: timestamp
  ```

- Post
  ```
  id: auto increment,
  user_id: integer (fk),
  title: string,
  description: string,
  content: text,
  likes: bigInteger,
  private: boolean,
  col_float: float
  col_decimal: decimal,
  col_date: date,
  col_enum: enu(['value1', 'value2']),
  col_json: json,
  col_jsonb: jsonb,
  created_at: timestamp,
  updated_at: timestamp,
  deleted_at: timestamp
  ```

## Resultados

### Tempo gasto para executar as queries
<div align="center">
  <img src="results/create_user.png" alt="resultado para o criar usuario" />
</div>
<div align="center">
  <img src="results/create_post.png" alt="resultado para o criar os posts" />
</div>
<div align="center">
  <img src="results/select_users.png" alt="resultado para o buscar usuarios" />
</div>
<div align="center">
  <img src="results/select_posts.png" alt="resultado para o buscar os posts" />
</div>
<div align="center">
  <img src="results/eager_loading.png" alt="resultado buscar os posts de um usuario (eager loading)" />
</div>