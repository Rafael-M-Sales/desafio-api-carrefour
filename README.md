# 🧪 Desafio de Automação de Testes de API — Carrefour Banco

Projeto de automação de testes para a API [ServeRest](https://serverest.dev), desenvolvido como parte do desafio técnico do **Carrefour Banco**. O projeto cobre testes automatizados para os endpoints de **Usuários** e **Login**, com pipeline de CI/CD e geração de relatórios.

---

## 📋 Índice

- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Configuração](#-instalação-e-configuração)
- [Executando os Testes](#-executando-os-testes)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Casos de Teste Cobertos](#-casos-de-teste-cobertos)
- [CI/CD — GitHub Actions](#-cicd--github-actions)
- [Relatórios de Teste](#-relatórios-de-teste)
- [Automação Mobile (NOVO)](#-automação-mobile-novo)

---

## 🛠 Tecnologias Utilizadas

| Tecnologia | Versão | Descrição |
|---|---|---|
| **Node.js** | >= 18 | Runtime JavaScript |
| **Cypress** | 13.x | Framework de testes de API |
| **WebDriverIO** | 8.x | Framework de testes Mobile |
| **Appium** | 2.x | Driver de automação Mobile |
| **Mochawesome** | 7.x | Relatórios de API |
| **Allure Report** | 2.x | Relatórios de Mobile |
| **GitHub Actions** | - | Pipeline de CI/CD |

---

## ✅ Pré-requisitos

- [Node.js](https://nodejs.org/) versão 18 ou superior
- [npm](https://www.npmjs.com/) (instalado junto com o Node.js)
- [Git](https://git-scm.com/)
- Conexão com a internet (a API ServeRest é pública: `https://serverest.dev`)

---

## 🚀 Instalação e Configuração

1. **Clone o repositório:**

```bash
git clone https://github.com/Rafael-M-Sales/desafio-api-carrefour.git
cd desafio-api-carrefour
```

2. **Instale as dependências:**

```bash
npm install
```

---

## ▶️ Executando os Testes

### Executar todos os testes (modo headless)

```bash
npm test
```

### Abrir o Cypress (modo interativo)

```bash
npm run test:headed
```

### Executar testes de um arquivo específico

```bash
npx cypress run --spec cypress/e2e/login.cy.js
npx cypress run --spec cypress/e2e/usuarios-post.cy.js
```

### Gerar relatório HTML após execução

```bash
npm test
npm run report
```

O relatório será gerado em `cypress/reports/html/`.

---

## 📁 Estrutura do Projeto

```
desafio-api-carrefour/
├── .github/
│   └── workflows/
│       └── ci.yml                   # Pipeline GitHub Actions (API)
├── cypress/
│   ├── e2e/                         # Testes de API (Cypress)
│   │   ├── login.cy.js              # Testes POST /login
│   │   ├── usuarios-get.cy.js       # Testes GET /usuarios
│   │   ├── usuarios-post.cy.js      # Testes POST /usuarios
│   │   ├── usuarios-put.cy.js       # Testes PUT /usuarios/{id}
│   │   ├── usuarios-delete.cy.js    # Testes DELETE /usuarios/{id}
│   │   └── usuarios-e2e.cy.js       # Fluxo E2E completo (CRUD)
│   ├── fixtures/                    # Massa de dados
│   └── support/                     # Comandos e suporte
├── mobile/                          # Testes Mobile (WebDriverIO)
│   ├── test/
│   │   ├── pageobjects/             # Page Object Model
│   │   │   ├── page.js
│   │   │   ├── login.page.js
│   │   │   ├── home.page.js
│   │   │   └── forms.page.js
│   │   └── specs/
│   │       └── desafio.spec.js      # 10 Cenários Mobile
│   ├── app/                         # Pasta para o APK
│   └── wdio.conf.js                 # Configuração Appium
├── cypress.config.js                # Configuração do Cypress
├── package.json                     # Dependências globais
├── .gitignore
└── README.md
```

---

## 👨‍🏫 Foco Educativo e Didático

Este projeto foi construído com um **viés pedagógico**. Cada arquivo de teste (API e Mobile) contém comentários detalhados que explicam:
- **Mapeamento de Requisitos**: Qual critério do desafio está sendo validado.
- **Decisões Técnicas**: Por que certas abordagens (como Page Objects ou Hooks) foram utilizadas.
- **Melhores Práticas**: Dicas sobre manutenção de código e massa de dados.

---

## 🧾 Casos de Teste Cobertos

### 🔐 Login (`POST /login`)

| # | Cenário | Status Esperado |
|---|---|---|
| 1 | Login com credenciais válidas | 200 |
| 2 | Login com email inválido | 401 |
| 3 | Login com senha inválida | 401 |
| 4 | Login sem campo email | 400 |
| 5 | Login sem campo password | 400 |
| 6 | Login com corpo da requisição vazio | 400 |

### 📋 Listar Usuários (`GET /usuarios`)

| # | Cenário | Status Esperado |
|---|---|---|
| 1 | Listar todos os usuários | 200 |
| 2 | Validar schema dos usuários | 200 |
| 3 | Filtrar por nome | 200 |
| 4 | Filtrar por email | 200 |
| 5 | Filtrar com resultado vazio | 200 |
| 6 | Buscar por ID válido | 200 |
| 7 | Buscar por ID inexistente | 400 |

### ➕ Criar Usuário (`POST /usuarios`)

| # | Cenário | Status Esperado |
|---|---|---|
| 1 | Criar com dados válidos (admin) | 201 |
| 2 | Criar com dados válidos (não-admin) | 201 |
| 3 | Criar com email duplicado | 400 |
| 4 | Criar sem campo nome | 400 |
| 5 | Criar sem campo email | 400 |
| 6 | Criar sem campo password | 400 |
| 7 | Criar sem campo administrador | 400 |
| 8 | Criar com corpo vazio | 400 |
| 9 | Validar schema da resposta | 201 |

### ✏️ Editar Usuário (`PUT /usuarios/{id}`)

| # | Cenário | Status Esperado |
|---|---|---|
| 1 | Atualizar usuário existente | 200 |
| 2 | Verificar persistência dos dados | 200 |
| 3 | Criar via PUT (ID inexistente) | 201 |
| 4 | Atualizar com email duplicado | 400 |
| 5 | Atualizar sem campos obrigatórios | 400 |

### 🗑️ Excluir Usuário (`DELETE /usuarios/{id}`)

| # | Cenário | Status Esperado |
|---|---|---|
| 1 | Excluir usuário existente | 200 |
| 2 | Verificar que foi excluído | 400 |
| 3 | Excluir ID inexistente | 200 |
| 4 | Excluir múltiplos usuários | 200 |

### 🔄 Fluxo E2E Completo

| # | Step | Descrição |
|---|---|---|
| 1 | Criar | POST /usuarios → 201 |
| 2 | Login | POST /login → 200 |
| 3 | Buscar | GET /usuarios/{id} → 200 |
| 4 | Listar | GET /usuarios?_id=x → 200 |
| 5 | Atualizar | PUT /usuarios/{id} → 200 |
| 6 | Verificar | GET /usuarios/{id} → 200 |
| 7 | Excluir | DELETE /usuarios/{id} → 200 |
| 8 | Confirmar | GET /usuarios/{id} → 400 |

### 📱 Automação Mobile (`Native Demo App`)

| # | Cenário | Funcionalidade | Descrição |
|---|---|---|---|
| 1 | Login com Sucesso | Autenticação | Login válido com dados de QA |
| 2 | Login com Erro (Email) | Autenticação | Validação de formato de email inválido |
| 3 | Login com Erro (Senha) | Autenticação | Tentativa de login com senha vazia |
| 4 | Navegação WebView | Navegação | Acesso à tela de conteúdo web |
| 5 | Navegação Swipe | Navegação | Acesso e interação com a tela de swipe |
| 6 | Navegação Drag | Navegação | Acesso à tela de Drag and Drop |
| 7 | Form: Switch | Formulários | Interação com componente Switch |
| 8 | Form: Dropdown | Formulários | Seleção de itens no picker |
| 9 | Form: Status | Formulários | Validação de botões ativos/inativos |
| 10 | Fluxo E2E Completo | E2E | Login -> Menu -> App -> Home |

**Total Geral: 49 cenários de teste (39 API + 10 Mobile)**

---

## ⚙️ CI/CD — GitHub Actions

O projeto possui uma pipeline configurada em `.github/workflows/ci.yml` que é executada automaticamente em:

- **Push** na branch `main`
- **Pull Requests** para a branch `main`

### O que a pipeline faz:

1. ✅ Faz checkout do código
2. ✅ Configura Node.js 20
3. ✅ Instala dependências com `npm ci`
4. ✅ Executa os testes com `npx cypress run`
5. ✅ Mescla os relatórios JSON (Mochawesome)
6. ✅ Gera relatório HTML
7. ✅ Faz upload do relatório como **artefato da pipeline**

### Acessando o Relatório na Pipeline:

1. Vá até a aba **Actions** do repositório
2. Clique na execução mais recente
3. Na seção **Artifacts**, baixe o `test-report`
4. Abra o arquivo `.html` no navegador

---

---

## 📱 Automação Mobile (NOVO)

Além dos testes de API, o projeto agora conta com uma suíte de **10 cenários de testes mobile** utilizando **WebDriverIO** e **Appium**.

### Estrutura Mobile
O código está localizado na pasta `mobile/` e segue o padrão **Page Object Model (POM)**.

### Pré-requisitos Mobile
- **Appium Server** instalado e rodando (v2.0+)
- **Android SDK** configurado e um emulador ativo.
- **Java JDK** (v11+)
- **APK do App**: [Download WebdriverIO Native Demo App](https://github.com/webdriverio/native-demo-app/releases) (coloque o arquivo em `mobile/app/wdio-demo.apk`).

### Como executar os testes Mobile
1.  **Acesse a pasta mobile:**
    ```bash
    cd mobile
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Execute os testes:**
    ```bash
    npm test
    ```
4.  **Gere o relatório Allure:**
    ```bash
    npm run report:generate
    npm run report:open
    ```

---

## 👤 Autor

**Rafael M. Sales**

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
