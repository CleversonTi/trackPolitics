# 🏛️ Track Politics

**Track Politics** é um portal que permite visualizar dados de deputados federais do Brasil, incluindo suas informações pessoais e despesas. A aplicação é desacoplada, com frontend, backend e banco de dados funcionando de forma independente e se comunicando por API.

---

## ⚙️ Estrutura do Projeto

Este projeto está organizado de forma **completamente desacoplada** (decoupled architecture), seguindo as melhores práticas modernas de desenvolvimento web:

| Camada        | Tecnologia | Hospedagem |
|---------------|------------|-------------|
| Frontend      | React + Vite | [Vercel](https://track-politics-vaqi.vercel.app) |
| Backend       | Laravel 10+ | [Render](https://dashboard.render.com/web/srv-d23aenadbo4c7381nmfg) |
| Banco de Dados| PostgreSQL | [Supabase](https://supabase.com/dashboard/project/jatjpucvoptztowwqsvy/database/migrations?showConnect=true) |

---

## 📦 Tecnologias Utilizadas

### 💻 Frontend
- Vite + React + TypeScript
- Axios para requisições HTTP
- SCSS Modules
- Deploy via Vercel:  
  🔗 [https://track-politics-vaqi.vercel.app](https://track-politics-vaqi.vercel.app)

### 🔧 Backend
- Laravel 10+
- API RESTful
- Artisan Commands
- Seeders para popular base de dados
- CORS configurado para ambientes externos
- Deploy via Render:  
  🔗 [https://trackpolitics-2.onrender.com/api](https://trackpolitics-2.onrender.com/api)

### 🗃️ Banco de Dados
- PostgreSQL (Supabase)
- Gerenciado separadamente do backend
- Integrado com Laravel via `.env`

---

## 🐳 Docker & Desenvolvimento Local

O projeto utiliza um arquivo `docker-compose.yml` **modularizado**, que sobe os containers separadamente para cada parte da aplicação:

- `jobs_retta`: Laravel (Backend)
- `react_retta`: React (Frontend)
- `db_retta`: MySQL (para testes locais)
- `phpmyadmin`: Interface gráfica para MySQL (opcional)

### Exemplo de uso:

```bash
docker compose up -d --build
```

📂 Estrutura:

```
jobsRETTA/
├── backend/     # Laravel API
├── frontend/    # React App
├── docker-compose.yml
```

### Acesso local:

- Backend (Laravel): `http://localhost:8000`
- Frontend (React): `http://localhost:3000`
- phpMyAdmin (opcional): `http://localhost:8080` (usuário/senha definidos no `.env`)

---

## 🌍 Links Úteis

| Ambiente       | URL                                                                 |
|----------------|----------------------------------------------------------------------|
| Frontend       | [https://track-politics-vaqi.vercel.app](https://track-politics-vaqi.vercel.app) |
| Backend API    | [https://trackpolitics-2.onrender.com/api](https://trackpolitics-2.onrender.com/api) |
| Painel Render  | [Render Backend](https://dashboard.render.com/web/srv-d23aenadbo4c7381nmfg) |
| Painel Vercel  | [Vercel Frontend](https://vercel.com/cleversons-projects-deaeab14/track-politics-vaqi) |
| Supabase       | [Banco de Dados](https://supabase.com/dashboard/project/jatjpucvoptztowwqsvy/database/migrations?showConnect=true) |

## 👨‍💻 Desenvolvedor

- **Cleverson Ramos**
- [LinkedIn](https://www.linkedin.com/in/cleverson-ti-ramos/)

---