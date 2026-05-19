# Automation Exercise – Playwright Test Suite

Suite de testes automatizados end-to-end e de API para o site [automationexercise.com](https://automationexercise.com), construída com arquitetura Page Object Model (POM), dados dinâmicos e boas práticas de clean code.

---

## Tecnologias

- **TypeScript**
- **Playwright**
- **Node.js**
- **@faker-js/faker**

---

## Estrutura do projeto

```
src/
  pages/        # Page Objects (um arquivo por página)
  fixtures/     # Injeção de dependência das pages via test.extend
  types/        # Interfaces de domínio (ui.ts, api.ts)
  utils/        # Fábrica de dados dinâmicos (dataFactory.ts)
tests/
  register.spec.ts      # Desafio 1 – Registro de novo usuário
  cart.spec.ts          # Desafio 2 – Manipulação de inventário / carrinho
  api-products.spec.ts  # Desafio 3 – Validação do endpoint GET /api/productsList
playwright.config.ts
tsconfig.json
```

---

## Instalação

**Pré-requisito:** Node.js 18 ou superior.

```bash
# 1. Clone o repositório
git clone https://github.com/mbalbinote/Totvs-se-o1.git
cd Totvs-se-o1

# 2. Instale as dependências
npm install

# 3. Instale os browsers do Playwright
npx playwright install
```

---

## Como usar

```bash
# Rodar todos os testes (headless)
npm test

# Rodar com browser visível
npm run test:headed

# Rodar um spec específico
npx playwright test tests/register.spec.ts --headed
npx playwright test tests/cart.spec.ts --headed
npx playwright test tests/api-products.spec.ts

# Modo debug interativo
npm run test:debug

# Abrir relatório HTML da última execução
npm run test:report
```

---

## Testes implementados

| Spec | Descrição |
|------|-----------|
| `register.spec.ts` | Fluxo completo de cadastro com dados dinâmicos, valida mensagem "ACCOUNT CREATED!" |
| `cart.spec.ts` | Adiciona 4 unidades de um produto e valida quantidade e valores no resumo do carrinho |
| `api-products.spec.ts` | Valida status 200, estrutura e integridade dos dados do endpoint `GET /api/productsList` |

---

>  This is a challenge by [Coodesh](https://coodesh.com/)
