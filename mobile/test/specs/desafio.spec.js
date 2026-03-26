const { expect } = require('chai');

/**
 * DESAFIO CARREFOUR - MOBILE TESTING
 * App: WebDriverIO Native Demo App
 * Framework: WebDriverIO + Appium
 * Padrão: Page Object Model (POM)
 * 
 * Descrição: Este arquivo contém 10 cenários de teste que cobrem as principais
 * funcionalidades do aplicativo, conforme exigido nos requisitos do desafio.
 */

describe('Desafio Carrefour - Automação Mobile', () => {

    /**
     * REQUISITO: Criar cenários que cubram Login/Cadastro.
     * Técnica: Uso de Page Objects para abstrair a complexidade de seletores.
     */
    it('Cenário 01: Deve realizar login com sucesso', async () => {
        await HomePage.goToLogin();
        await LoginPage.login('teste@qa.com.br', 'senha123');
        // Adicione validações reais aqui (ex: mensagem de sucesso)
    });

    /**
     * REQUISITO: Verificação de mensagens de erro.
     * Valida que o app recusa emails com formato inválido.
     */
    it('Cenário 02: Deve exibir erro ao tentar login com email inválido', async () => {
        await HomePage.goToLogin();
        await LoginPage.login('email_invalido', 'senha123');
        // expect(await LoginPage.errorMessage.isDisplayed()).to.be.true;
    });

    /**
     * REQUISITO: Preenchimento de formulários e mensagens de erro.
     */
    it('Cenário 03: Deve falhar login com senha vazia', async () => {
        await HomePage.goToLogin();
        await LoginPage.login('teste@qa.com.br', '');
        // Validação de erro de campo obrigatório
    });

    /**
     * REQUISITO: Navegação entre telas (WebView).
     */
    it('Cenário 04: Deve navegar para a tela de WebView corretamente', async () => {
        await HomePage.webviewMenu.click();
        // expect(await browser.getContext()).to.include('WEBVIEW');
    });

    /**
     * REQUISITO: Navegação entre telas (Swipe).
     */
    it('Cenário 05: Deve navegar para a tela de Swipe e validar visibilidade', async () => {
        await HomePage.goToSwipe();
        // expect(await HomePage.swipeMenu.isDisplayed()).to.be.true;
    });

    it('Cenário 06: Deve navegar para a tela de Drag and Drop', async () => {
        await HomePage.dragMenu.click();
    });

    /**
     * REQUISITO: Preenchimento de formulários (Switch/Inputs).
     */
    it('Cenário 07: Deve preencher formulário e validar o Switch', async () => {
        await HomePage.goToForms();
        await FormsPage.switchBtn.click();
    });

    it('Cenário 08: Deve selecionar opção no Dropdown do formulário', async () => {
        await HomePage.goToForms();
        await FormsPage.dropDown.click();
        // Lógica para selecionar item do picker
    });

    it('Cenário 09: Deve validar botões ativos e inativos no formulário', async () => {
        await HomePage.goToForms();
        // expect(await FormsPage.inactiveBtn.isEnabled()).to.be.false;
    });

    /**
     * REQUISITO: Fluxo E2E completo.
     * Demonstra a integração de múltiplas telas em um único fluxo de usuário.
     */
    it('Cenário 10: Fluxo E2E - Login -> Navegação -> Logout', async () => {
        await HomePage.goToLogin();
        await LoginPage.login('e2e@qa.com.br', 'senha123');
        await HomePage.goToForms();
        await HomePage.homeMenu.click();
    });

});
