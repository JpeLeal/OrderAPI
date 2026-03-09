# OrderAPI

API REST para gerenciamento de pedidos e itens, constru�da com Node.js, Express e PostgreSQL.

## Tecnologias
- Node.js
- Express 5
- PostgreSQL (`pg`)
- Dotenv

## Estrutura do projeto
```text
OrderAPI/
  server.js
  package.json
  src/
    app.js
    config/
      dbConfig.js
    routes/
      orderRoutes.js
    controllers/
      controller.js
    services/
      orderService.js
```

## Pr�-requisitos
- Node.js 18+
- PostgreSQL ativo
- Tabelas `"Order"` e `Items` j� criadas no banco

## Vari�veis de ambiente
Crie um arquivo `.env` na raiz de `OrderAPI/`:

```env
DB_USER=seu_usuario
DB_HOST=localhost
DB_NAME=seu_banco
DB_PASSWORD=sua_senha
DB_PORT=5432
```

## Instala��o
```bash
npm install
```

## Execu��o
```bash
npm run dev
```
ou
```bash
npm start
```

A API sobe na porta `3000`.

## Endpoints
Base URL: `http://localhost:3000/order`

### 1. Criar pedido
`POST /`

Body esperado:
```json
{
  "numeroPedido": 123,
  "valorTotal": 100,
  "dataCriacao": "2026-03-09T12:00:00.000Z",
  "items": [
    {
      "idItem": 1,
      "quantidadeItem": 2,
      "valorItem": 50
    }
  ]
}
```

Regras:
- `valorTotal` deve ser igual � soma de `quantidadeItem * valorItem` de todos os itens.
- Em inconsist�ncia, retorna `400`.

### 2. Listar pedidos
`GET /list`

Retorna pedidos ordenados por `creationDate` (mais recentes primeiro).

### 3. Buscar pedido por ID
`GET /:id`

Retorna pedido com seus itens.
- `404` se n�o encontrar.

### 4. Atualizar pedido
`PUT /:id`

Body esperado (mesma estrutura do cadastro, exceto `numeroPedido`, pois o ID vem na URL):
```json
{
  "valorTotal": 120,
  "dataCriacao": "2026-03-09T12:00:00.000Z",
  "items": [
    {
      "idItem": 10,
      "quantidadeItem": 3,
      "valorItem": 40
    }
  ]
}
```

### 5. Deletar pedido
`DELETE /:id`

Remove itens e pedido.
- `404` se pedido n�o existir.

## Fluxo interno
- `routes` define as rotas HTTP.
- `controller` recebe requisi��es/respostas.
- `service` cont�m regras de neg�cio e consultas SQL.
- `dbConfig` cria pool de conex�o PostgreSQL e testa conex�o ao iniciar.

## Observa��es
- O servidor usa porta fixa (`3000`) em `server.js`.
- A cria��o e atualiza��o de pedido usam transa��o (`BEGIN/COMMIT/ROLLBACK`) para manter consist�ncia.