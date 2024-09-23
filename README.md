# Gerenciador de Projetos com NestJS

Este é um projeto de **Gerenciamento de Projetos** desenvolvido com **NestJS** e **TypeORM**, que oferece operações completas para manipulação de **usuários** e **tarefas**. A API permite criar, atualizar, listar e remover tanto usuários quanto tarefas, além de gerenciar a relação **Many-to-Many** entre eles.

## Funcionalidades

- **Gerenciamento de Usuários**: Criar, listar, atualizar e deletar usuários.
- **Gerenciamento de Tarefas**: Criar, listar, atualizar e deletar tarefas.
- **Atribuição de Tarefas a Usuários**: Relacionar múltiplas tarefas a múltiplos usuários.
- **Documentação Automática**: Geração automática de documentação da API usando **Swagger**.

## Tecnologias Utilizadas

- **NestJS**: Framework Node.js para construção de APIs escaláveis e eficientes.
- **TypeORM**: ORM para interações com banco de dados.
- **Swagger**: Documentação automática da API.

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   ```

2. Acesse o diretório do projeto:

   ```bash
   cd nome-do-repositorio
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Configure as variáveis de ambiente no arquivo `.env`:

   ```bash
   DATABASE_URL=postgres://usuario:senha@localhost:5432/nome_do_banco
   ```

5. Execute as migrações do banco de dados (se necessário):

   ```bash
   npm run typeorm migration:run
   ```

6. Inicie o servidor:
   ```bash
   npm run start
   ```

## Endpoints

### Usuários

- **POST /users**: Cria um novo usuário.
- **GET /users**: Retorna todos os usuários.
- **GET /users/:id**: Retorna um usuário específico.
- **PATCH /users/:id**: Atualiza um usuário existente.
- **DELETE /users/:id**: Remove um usuário.

### Tarefas

- **POST /tasks**: Cria uma nova tarefa.
- **GET /tasks**: Retorna todas as tarefas.
- **GET /tasks/:id**: Retorna uma tarefa específica.
- **PATCH /tasks/:id**: Atualiza uma tarefa existente.
- **DELETE /tasks/:id**: Remove uma tarefa.

### Atribuição de Tarefas a Usuários

- **PATCH /users/:userId/tasks**: Atribui tarefas a um usuário.
- **GET /users/:userId/tasks**: Retorna todas as tarefas atribuídas a um usuário.
- **DELETE /users/:userId/tasks/:taskId**: Remove uma tarefa de um usuário.

## Documentação da API

A documentação da API pode ser acessada via **Swagger** após iniciar o servidor:

```
http://localhost:3000/api-docs
```

## Exemplo de Uso

Aqui está um exemplo de como criar uma tarefa via `POST /tasks`:

```json
{
  "name": "Nova Tarefa",
  "description": "Descrição da tarefa",
  "dueDate": "2024-09-30T12:00:00Z"
}
```

## Contribuindo

Se você deseja contribuir para este projeto, sinta-se à vontade para abrir um pull request ou relatar problemas na seção de **Issues**.

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para mais informações.
