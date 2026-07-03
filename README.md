# GroupMaker

Sistema para gerenciamento de grupos e membros.

---

# 🚀 Stack

| Tecnologia      | Versão |
| --------------- | ------ |
| Node.js         | 22     |
| React           | 19     |
| Java            | 21     |
| Springboot      | 4.0    |
| Package Manager | pnpm   |

---

# ☁️ Deploy

- **Frontend:** Vercel
- **Database:** Neon

---

# 📦 Criação do Projeto

## Frontend

### 1. Criar o Projeto
Execute o gerador do Vite selecionando o template de TypeScript:
```bash
pnpm create vite@latest web -- --template react-ts
```

### 2. Acessar a pasta e instalar dependências
Entre na pasta do frontend:
```bash
cd web 
```

Instale e force o React 19 (Core + Tipagens):
```bash
pnpm add react@19 react-dom@19
pnpm add -D @types/react@19 @types/react-dom@19 
```

Instale os plugins de compilação, ESLint e o Tailwind v4:
```bash
pnpm add -D tailwindcss @tailwindcss/vite @babel/core @rolldown/plugin-babel babel-plugin-react-compiler eslint-plugin-react-compiler
```

---

### 3. Scripts Disponíveis

Rodar o projeto em modo de desenvolvimento:
```bash
pnpm run dev
```

Gerar o build otimizado para produção:
```bash
pnpm run build
```

Visualizar o build localmente antes do deploy:
```bash
pnpm run preview
```

## Backend

```bash
```

```bash
cd api
```

Instale as dependências:

```bash
```
---

# ▶️ Executando o Projeto

## Frontend

Inicie o ambiente de desenvolvimento:

```bash
pnpm dev
```

Build de produção:

```bash
pnpm build
```

Executar em produção:

```bash
pnpm start
```

---

## Backend

Modo desenvolvimento:

```bash
pnpm start:dev
```

Build:

```bash
pnpm build
```

Modo produção:

```bash
pnpm start:prod
```

---

# 🗃️ Estrutura do Banco de Dados

## `refresh_token`

| Campo      | Tipo     |
| ---------- | -------- |
| id         | UUID     |
| user_id    | UUID     |
| token      | String   |
| expires_at | DateTime |
| revoked    | Boolean  |

---

## `user`

| Campo      | Tipo     |
| ---------- | -------- |
| id         | UUID     |
| name       | String   |
| photo_url  | String   |
| user_name  | String   |
| password   | String   |
| created_at | DateTime |
| updated_at | DateTime |

---

## `group`

| Campo           | Tipo            |
| --------------- | --------------- |
| id              | UUID            |
| name            | String          |
| description     | String          |
| parent_group_id | UUID (nullable) |
| created_by      | UUID            |
| created_at      | DateTime        |
| updated_at      | DateTime        |

---

## `group_member`

| Campo     | Tipo     |
| --------- | -------- |
| id        | UUID     |
| group_id  | UUID     |
| user_id   | UUID     |
| is_admin  | Boolean  |
| joined_at | DateTime |

---

# 📁 Estrutura do Projeto

```
groupmaker/
│
├── frontend/    # Next.js
├── backend/     # NestJS
└── README.md
```

---

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.