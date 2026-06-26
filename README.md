# ⚙️ LiveFlow — Backend

API REST do projeto LiveFlow, construída com **Fastify**, **Prisma ORM** e **PostgreSQL**, rodando sobre **Bun** como runtime. Inclui documentação automática via Swagger, containerização com Docker e pipeline de qualidade com Biome + Husky + Commitlint.

> 🔗 Repositório do frontend: [SyncFlow-Frontend](https://github.com/LeonardoMainardes/SyncFlow-Frontend)

---

## ✨ Destaques técnicos

- **Fastify** — framework HTTP de alta performance para Node/Bun
- **Prisma ORM** — modelagem e acesso ao banco com tipagem completa em TypeScript
- **PostgreSQL** via **Docker Compose** — banco de dados relacional containerizado
- **Swagger UI** (`@fastify/swagger` + `@fastify/swagger-ui`) — documentação interativa da API gerada automaticamente
- **Bun** — runtime ultra-rápido como alternativa ao Node.js
- **Biome** — linter e formatter moderno em substituição ao ESLint + Prettier
- **Husky + lint-staged** — hooks de pre-commit para garantir qualidade antes de cada commit
- **Commitlint** — padronização de mensagens de commit com Conventional Commits

---

## 🛠️ Tecnologias utilizadas

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)

---

## 🚀 Como rodar localmente

### Pré-requisitos

- [Bun](https://bun.sh/) instalado
- [Docker](https://www.docker.com/) e Docker Compose

### 1. Clone o repositório

```bash
git clone https://github.com/LeonardoMainardes/SyncFlow-Backend.git
cd SyncFlow-Backend
```

### 2. Instale as dependências

```bash
bun install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo de exemplo e preencha com suas credenciais:

```bash
cp .env.example .env
```

O `.env.example` contém as variáveis necessárias:

```env
# Banco de dados
DB_USER=
DB_PASSWORD=
DB_NAME=syncflow

# Prisma
DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@localhost:5432/${DB_NAME}"
```

### 4. Suba o banco de dados com Docker

```bash
docker-compose up -d postgres
```

### 5. Execute as migrations do Prisma

```bash
bunx prisma migrate dev
```

### 6. Inicie o servidor

```bash
bun run dev
```

A API estará disponível em `http://localhost:8888`

### Documentação Swagger

Acesse `http://localhost:8888/docs` para ver e testar os endpoints interativamente.

---

## 🐳 Rodando com Docker Compose completo

Para subir a API e o banco juntos (certifique-se de ter o `.env` configurado):

```bash
docker-compose up --build
```

| Serviço    | Porta |
|------------|-------|
| API        | 8888  |
| PostgreSQL | 5432  |

---

## 📁 Estrutura do projeto

```
/
├── src/
│   ├── routes/        # Definição dos endpoints
│   ├── controllers/   # Lógica das requisições
│   ├── services/      # Regras de negócio
│   └── server.ts      # Configuração do servidor Fastify
├── prisma/
│   └── schema.prisma  # Modelagem do banco de dados
├── .cursor/rules/     # Regras do Cursor AI para o projeto
├── .husky/            # Hooks de pre-commit
├── .env.example       # Variáveis de ambiente (template — vai ao Git)
├── .env               # Variáveis de ambiente (valores reais — no .gitignore)
├── Dockerfile
├── docker-compose.yml
├── biome.json         # Config do linter/formatter
└── commitlint.config.js
```

---

## 🔧 Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `bun run dev` | Inicia o servidor em modo desenvolvimento com hot reload |
| `bun run build` | Compila o TypeScript para JavaScript |
| `bun run start` | Inicia o servidor compilado em produção |
| `bun run lint` | Verifica o código com Biome |
| `bun run format` | Formata o código com Biome |
| `bunx prisma migrate dev` | Executa as migrations do banco |
| `bunx prisma studio` | Abre o Prisma Studio para visualizar os dados |

---

## 👨‍💻 Autor

Feito por **[Leonardo Mainardes](https://github.com/LeonardoMainardes)**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/leonardomainardes)
