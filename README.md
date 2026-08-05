# Vet Clinic — Test Strategy

Projeto de portfólio focado em **engenharia de qualidade / automação de testes**.
O domínio (clínica veterinária) é propositalmente enxuto — a profundidade está na
camada de QA: arquitetura de automação, quality gates no CI, contract/performance/
segurança/acessibilidade e documentação de decisões técnicas.

## Domínio

- **Entidades:** Tutor, Pet, Veterinário
- **Fluxo central:** agendamento de consultas com regra de conflito de horário
- **Papéis:** Admin (gerencia tutores, pets e veterinários) · Veterinário (dashboard
  do dia, conclui consultas, registra observações)

## Stack

| Camada    | Tecnologia                          |
|-----------|-------------------------------------|
| Backend   | Node.js + Express                   |
| Banco     | PostgreSQL (Docker)                 |
| Frontend  | Next.js + React                     |
| Testes    | Jest, Supertest, Cypress            |
| Infra     | Docker Compose, GitHub Actions      |

## Rodando o banco (desenvolvimento)

```bash
cp .env.example .env      # primeira vez
docker compose up -d db   # sobe o Postgres em background
docker compose ps         # confere se está "healthy"
docker compose down       # para o banco (dados persistem no volume)
```

## Estrutura

```
backend/    # API Express + testes (Jest, Supertest)
frontend/   # App Next.js + testes E2E (Cypress)
docker-compose.yml
```

> Status: **Fase 1 — MVP em construção** (etapa 2: setup do ambiente ✅).
