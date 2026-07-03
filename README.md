# GroupMaker

Sistema para gerenciamento de grupos e membros.

---

# 🚀 Stack

| Tecnologia      | Versão |
| --------------- | ------ |
| Node.js         | 22     |
| React           | 19     |
| Java            | 21     |
| Springboot      | 4.1    |
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

## 🛠️ Tecnologias e Configurações

- **Linguagem:** Java 21
- **Framework Principal:** Spring Boot 4.1.0
- **Gerenciador de Dependências:** Maven
- **Empacotamento:** Jar
- **Configuração de Ambiente:** application.properties

## 📦 Dependências Incluídas

- **Spring Web:** Estrutura para criação de endpoints RESTful e aplicações web MVC utilizando o servidor embarcado Apache Tomcat.
- **Spring Security:** Mecanismo robusto e customizável para autenticação, autorização e controle de acesso aos recursos da API.
- **Spring Boot Actuator:** Ferramenta operacional que expõe endpoints prontos para monitoramento de saúde (*health check*), métricas e sessões da aplicação.
- **Lombok:** Biblioteca de anotações que reduz drasticamente o código boilerplate (geração automática de getters, setters, construtores, etc.).
- **Spring Boot DevTools:** Ferramentas de desenvolvimento que ativam reinicializações rápidas do servidor (*LiveReload*) e otimizações em tempo de código.

### Passos para Execução

1. **Clonar o repositório:**
   ```bash
   cd api
   ```

2. **Compilar o projeto:**
   ```bash
   ./mvnw clean install
   ```

3. **Executar a aplicação:**
   ```bash
   ./mvnw spring-boot:run
   ```

A API estará disponível por padrão no endereço: `http://localhost:8080`.

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