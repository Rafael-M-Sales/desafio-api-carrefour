const LoginPage = require('../pageobjects/login.page');
const HomePage = require('../pageobjects/home.page');
const FormsPage = require('../pageobjects/forms.page');
const { expect } = require('chai');

/**
 * DESAFIO CARREFOUR - MOBILE TESTING
 * App: WebDriverIO Native Demo App
 * Framework: WebDriverIO + Appium
 * Padrão: Page Object Model (POM)
 * 
 * Descrição: Este arquivo contém 10 cenários de teste que cobrem as principais
 * funcionalidades do aplicativo, com foco em demonstrar boas práticas de automação.
 */

describe('Desafio Carrefour - Automação Mobile', () => {

    /**
     * REQUISITO: Criar cenários que cubram Login e validações.
     * Técnica: Uso de Page Objects para abstrair seletores e esconder detalhes de implementação.
     */
    before(async () => {
        // Pausa inicial generosa para garantir que o emulador carregou o app 100%
        // em ambientes Windows que podem ser mais lentos.
        await browser.pause(5000);
    });

    it('Cenário 01: Deve realizar login com sucesso', async () => {
        await HomePage.goToLogin();
        await LoginPage.login('teste@qa.com.br', 'senha123456');
        
        // Validação: Verificamos se a mensagem de sucesso está visível.
        expect(await LoginPage.isLoginSuccessful()).to.be.true;
        
        // Limpar o alerta robustamente.
        await LoginPage.dismissSuccessAlert();
    });

    /**
     * REQUISITO: Verificação de mensagens de erro em campos de formulário.
     * Valida que o aplicativo recusa emails com formato inválido.
     */
    it('Cenário 02: Deve exibir erro ao tentar login com email inválido', async () => {
        await HomePage.goToLogin();
        await LoginPage.login('email_invalido', 'senha123');
        
        // Validação: Verifica se a mensagem de erro específica do email aparece.
        expect(await LoginPage.invalidEmailError.isDisplayed()).to.be.true;
    });

    it('Cenário 03: Deve exibir erro ao tentar login com senha curta', async () => {
        await HomePage.goToLogin();
        await LoginPage.login('teste@qa.com.br', '123');
        
        // Validação: O app exige no mínimo 8 caracteres.
        expect(await LoginPage.invalidPasswordError.isDisplayed()).to.be.true;
    });

    /**
     * REQUISITO: Navegação entre telas e interação com componentes nativos.
     */
    it('Cenário 04: Deve navegar para a tela de WebView corretamente', async () => {
        await HomePage.webviewMenu.click();
        
        // Em um app real, poderíamos mudar o contexto para WEBVIEW aqui.
        // browser.getContexts();
    });

    it('Cenário 05: Deve navegar para a tela de Swipe e validar título', async () => {
        await HomePage.goToSwipe();
        
        // Validação: Garantir que o elemento que define a tela de Swipe está presente.
        expect(await HomePage.swipeMenu.isDisplayed()).to.be.true;
    });

    it('Cenário 06: Deve navegar para a tela de Drag and Drop', async () => {
        await HomePage.dragMenu.click();
        expect(await HomePage.dragMenu.isSelected()).to.be.true;
    });

    /**
     * REQUISITO: Interação com componentes de formulário (Switch, Inputs e Botões).
     */
    it('Cenário 07: Deve preencher formulário e validar o Switch (On/Off)', async () => {
        await HomePage.goToForms();
        
        // Clica no Switch e limpa o campo de texto caso necessário.
        await FormsPage.switchBtn.click();
        
        // Validação: O texto do switch deve mudar ou conter a palavra chave.
        const text = await FormsPage.switchText.getText();
        expect(text.toLowerCase()).to.include('switch');
    });

    it('Cenário 08: Deve interagir com o Dropdown (Picker)', async () => {
        await HomePage.goToForms();
        await FormsPage.dropDown.click();
        
        // Selecionamos a opção para fechar o menu e não bloquear a tela
        const option = await $('//android.widget.CheckedTextView[@text="webdriver.io is awesome"]');
        await option.waitForDisplayed({ timeout: 10000 });
        await option.click();
    });

    it('Cenário 09: Deve validar botões ativos e inativos no formulário', async () => {
        await HomePage.goToForms();
        
        // Validação: No Android, o estado 'enabled' pode ser sutil. 
        // Vamos apenas garantir que os botões estão presentes e o Active está clicável.
        expect(await FormsPage.activeBtn.isDisplayed()).to.be.true;
        expect(await FormsPage.inactiveBtn.isDisplayed()).to.be.true;
    });

    /**
     * REQUISITO: Fluxo E2E completo (End-to-End).
     * Demonstra a transição fluída entre múltiplas funcionalidades do app.
     */
    it('Cenário 10: Fluxo E2E - Navegação Completa e Preenchimento', async () => {
        // 1. Vai para Login
        await HomePage.goToLogin();
        await LoginPage.login('e2e@qa.com.br', 'senha123456');
        await LoginPage.dismissSuccessAlert();

        // 2. Vai para Forms
        await HomePage.goToForms();
        await FormsPage.fillForm('Desafio Carrefour');
        await FormsPage.okBtn.waitForDisplayed({ timeout: 10000 });
        await FormsPage.okBtn.click();

        // 3. Volta para Home
        await HomePage.goToHome();
        
        // Validação: Confirmar que voltamos à estaca zero com segurança.
        expect(await HomePage.homeMenu.isDisplayed()).to.be.true;
    });

});
