# JARVIS Home

> Sistema de automacao residencial inteligente com agentes LangGraph, backend FastAPI e frontend Next.js.

---

## Sobre o Projeto

O **JARVIS Home** e uma plataforma de automacao residencial que utiliza agentes inteligentes (LangGraph) para gerenciar dispositivos, automacoes e integracoes de forma autonoma. O sistema permite criar regras de automacao, monitorar eventos em tempo real e integrar com dispositivos via MQTT, Docker e notificacoes.

## Arquitetura

```
┌─────────────────────────────────────────────────────────┐
│                    Docker Compose                       │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │ Frontend │  │ Backend  │  │ Postgres │  │ Redis  │ │
│  │ Next.js  │  │ FastAPI  │  │   16     │  │   7    │ │
│  │ :3000    │──│ :8000    │──│ :5432    │  │ :6379  │ │
│  └──────────┘  └──────────┘  └──────────┘  └────────┘ │
│                      │                                  │
│              ┌───────┴───────┐                         │
│              │   LangGraph   │                         │
│              │   Agentes IA  │                         │
│              └───────────────┘                         │
└─────────────────────────────────────────────────────────┘
```

## Stack Tecnologica

| Camada | Tecnologias |
|---|---|
| **Frontend** | Next.js 14, React 18, TypeScript, Tailwind CSS, Radix UI, Lucide Icons |
| **Backend** | FastAPI 0.115, Python 3.12, Pydantic v2, SQLAlchemy 2.0 (async), Alembic |
| **IA / Agentes** | LangGraph, LangChain, Google Gemini (langchain-google-genai) |
| **Banco de Dados** | PostgreSQL 16 (asyncpg) |
| **Cache** | Redis 7 |
| **Integracoes** | MQTT (paho-mqtt), Docker SDK, WebSockets, SMTP |
| **Autenticacao** | JWT (python-jose), bcrypt (passlib) |
| **Infra** | Docker, Docker Compose |

## Estrutura do Projeto

```
JARVIS_Home/
├── backend/
│   ├── main.py                 # App FastAPI (CORS, lifespan, rotas)
│   ├── requirements.txt        # Dependencias Python
│   ├── core/
│   │   ├── config.py           # Settings (pydantic-settings, .env)
│   │   └── security.py         # JWT, bcrypt, OAuth2
│   ├── api/
│   │   └── deps.py             # Dependencies (DB session, Redis, auth)
│   ├── models/
│   │   ├── database.py         # Engine async, session factory, Base
│   │   ├── models.py           # ORM: User, Session, Automation, Event, Integration
│   │   └── schemas.py          # Pydantic schemas (Create/Update/Response)
│   └── alembic/
│       ├── env.py              # Config async do Alembic
│       ├── script.py.mako      # Template de migrations
│       └── versions/           # Migrations geradas
├── frontend/
│   ├── package.json            # Dependencias Node.js
│   ├── tsconfig.json           # TypeScript strict mode
│   ├── tailwind.config.ts      # Tema JARVIS (navy/cyan/glow)
│   ├── next.config.js          # Config Next.js
│   ├── postcss.config.js       # PostCSS + Tailwind
│   ├── app/
│   │   ├── layout.tsx          # Root layout (dark mode, Inter font)
│   │   ├── page.tsx            # Home page com navegacao
│   │   └── globals.css         # Tailwind directives + tema escuro
│   └── lib/
│       └── utils.ts            # Utilitario cn() (clsx + tailwind-merge)
├── infra/
│   └── docker/
│       ├── Dockerfile.backend  # Python 3.12-slim + uvicorn
│       └── Dockerfile.frontend # Node 20-alpine + Next.js build
├── docker-compose.yml          # Orquestracao dos servicos
├── .env.example                # Variaveis de ambiente (template)
└── .gitignore
```

## Modelos de Dados

| Modelo | Descricao | Campos Principais |
|---|---|---|
| **User** | Usuarios do sistema | email, username, hashed_password, is_active, is_superuser |
| **Session** | Sessoes de agentes IA | name, status (active/paused/stopped/error), type, config |
| **Automation** | Regras de automacao | name, trigger_type, trigger_config, action_type, action_config, is_active |
| **Event** | Eventos do sistema | event_type, source, data, priority (low/medium/high/critical), processed |
| **Integration** | Integracoes externas | name, type (mqtt/docker/notification/custom), config, status |

## Como Rodar

### Pre-requisitos

- [Docker](https://docs.docker.com/get-docker/) e [Docker Compose](https://docs.docker.com/compose/install/)

### Setup

```bash
# 1. Clone o repositorio
git clone https://github.com/barbaragodoy/JARVIS_Home.git
cd JARVIS_Home

# 2. Configure as variaveis de ambiente
cp .env.example .env
# Edite o .env com suas configuracoes (API keys, senhas, etc.)

# 3. Suba os servicos
docker compose up --build

# 4. Acesse
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# Docs (Swagger): http://localhost:8000/docs
```

### Desenvolvimento Local (sem Docker)

**Backend:**
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

| Metodo | Rota | Descricao |
|---|---|---|
| `GET` | `/` | Status da API (versao, nome) |
| `GET` | `/health` | Health check |
| `GET` | `/docs` | Documentacao Swagger |
| `GET` | `/redoc` | Documentacao ReDoc |

> Rotas de CRUD (eventos, integracoes, automacoes, sessoes) serao adicionadas nas proximas ondas.

## Variaveis de Ambiente

Veja `.env.example` para a lista completa. Principais:

| Variavel | Descricao |
|---|---|
| `DATABASE_URL` | URL de conexao PostgreSQL |
| `REDIS_URL` | URL de conexao Redis |
| `SECRET_KEY` | Chave secreta para JWT |
| `GEMINI_API_KEY` | API key do Google Gemini |
| `MQTT_BROKER_HOST` | Host do broker MQTT |
| `NEXT_PUBLIC_API_URL` | URL da API para o frontend |

## Roadmap

- [x] **Onda 1** — Infraestrutura e Setup Base
  - Docker Compose, Dockerfiles, .env
  - Backend FastAPI (config, security, dependencies)
  - Frontend Next.js (tema JARVIS, home page)
  - Modelos de dados (SQLAlchemy + Pydantic + Alembic)
- [ ] **Onda 2** — CRUD e Rotas da API
- [ ] **Onda 3** — Agentes LangGraph
- [ ] **Onda 4** — Integracoes (MQTT, Docker, Notificacoes)
- [ ] **Onda 5** — Dashboard e UI Completa
- [ ] **Onda 6** — Testes e CI/CD

## Licenca

Este projeto e privado.

---

Desenvolvido com FastAPI, Next.js e LangGraph.
