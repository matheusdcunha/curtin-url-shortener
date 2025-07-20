# Curtin URL Shortener

Encurtador de URLs simples, rápido e moderno, desenvolvido com Node.js, Fastify, MongoDB e Redis.

## Sumário
- [Visão Geral](#visão-geral)
- [Como Rodar](#como-rodar)
- [Configuração de Variáveis de Ambiente](#configuração-de-variáveis-de-ambiente)
- [Como Usar a API](#como-usar-a-api)
- [Estrutura do Projeto](#estrutura-do-projeto)

---

## Visão Geral

> ⚠️ **Aviso:** Este projeto atualmente contempla apenas o backend. O frontend ainda está em desenvolvimento.

Este projeto é um serviço de encurtamento de URLs. Ele permite que você gere links curtos para URLs longas e faça o redirecionamento automático ao acessar o link curto.

- **Backend:** Node.js + Fastify
- **Banco de Dados:** MongoDB
- **Cache:** Redis (para acelerar redirecionamentos)
- **Testes:** Vitest

---

## Como Rodar

### Usando Docker Compose (Recomendado)

1. **Configure as variáveis de ambiente** (veja abaixo).
2. Na raiz do projeto, execute:

```sh
docker-compose -f backend/docker-compose.yml up --build
```

O serviço ficará disponível na porta definida pela variável `PORT` (padrão: 3333).

### Ambiente de Desenvolvimento com Docker Compose

Se quiser rodar apenas os serviços de banco de dados (MongoDB e Redis) via Docker, e o backend em modo desenvolvimento (hot reload), utilize o arquivo `docker-compose.dev.yml`:

1. **Configure as variáveis de ambiente** (veja abaixo).
2. Suba MongoDB e Redis:
   ```sh
   docker-compose -f backend/docker-compose.dev.yml up
   ```
3. Em outro terminal, inicie o backend em modo desenvolvimento:
   ```sh
   cd backend
   npm install
   npm run dev
   ```

Assim, você pode editar o código e ver as mudanças em tempo real, enquanto os bancos rodam em containers.

### Rodando Manualmente (Node.js)

1. Instale as dependências:
   ```sh
   cd backend
   npm install
   ```
2. Configure as variáveis de ambiente (veja abaixo).
3. Certifique-se de ter o MongoDB e o Redis rodando localmente.
4. Inicie o servidor em modo desenvolvimento:
   ```sh
   npm run dev
   ```

---

## Configuração de Variáveis de Ambiente

Crie um arquivo `.env` na pasta `backend` com o seguinte conteúdo (exemplo):

```
PORT=3333
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_DB_NAME=curtin
REDIS_HOST=localhost
REDIS_PORT=6379
```

---

## Como Usar a API

### 1. Criar uma URL Encurtada

- **Endpoint:** `POST /url`
- **Body:**
  ```json
  {
    "url": "https://exemplo.com/alguma-url-longa"
  }
  ```
- **Resposta:**
  ```json
  {
    "code": "abc123"
  }
  ```

### 2. Redirecionar para a URL Original

- **Endpoint:** `GET /:code`
- **Exemplo:** `GET /abc123`
- **Resposta:** Redireciona (HTTP 307) para a URL original.

---

## Estrutura do Projeto

```
backend/
  src/
    http/controllers/url/  # Rotas e controladores de URL
    models/                # Modelos do MongoDB
    repositories/          # Repositórios (Mongo, Redis, InMemory)
    use-cases/             # Casos de uso (lógica de negócio)
    utils/                 # Utilitários (ex: hash de URL)
    database/              # Conexão com o MongoDB
    shared/                # Recursos compartilhados (ex: cache Redis)
  Dockerfile
  docker-compose.yml
  package.json
```

---

## Observações
- As URLs encurtadas expiram em 5 dias.
- O cache Redis é utilizado para acelerar o redirecionamento.
- O projeto possui testes unitários e de integração (Vitest).

---
