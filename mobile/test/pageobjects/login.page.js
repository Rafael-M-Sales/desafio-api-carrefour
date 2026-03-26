const Page = require('./page');

/**
 * DESAFIO CARREFOUR - Page Object de Login
 * 
 * Requisito: Implementar o padrão Page Object Model (POM) para organizar os seletores
 * e interações da tela de Login, garantindo manutenibilidade e legibilidade.
 */
class LoginPage extends Page {
    /**
     * Seletores: Utilizamos 'Accessibility ID' (~), que é a melhor prática para automação mobile,
     * pois é independente do texto visível e da estrutura do DOM/XML.
     */
    get loginMenu() { return $('~Login'); }
    get emailInput() { return $('~input-email'); }
    get passwordInput() { return $('~input-password'); }
    get loginButton() { return $('~button-LOGIN'); }
    
    // Alertas e Mensagens de Feedback
    get successMessage() { return $('android=new UiSelector().textContains("Success")'); }
    get successOkButton() { return $('id=android:id/button1'); }
    get invalidEmailError() { return $('android=new UiSelector().textContains("Please enter a valid email address")'); }
    get invalidPasswordError() { return $('android=new UiSelector().textContains("Please enter at least 8 characters")'); }

    /**
     * Ação: Realizar login encapsulando a complexidade dos passos.
     * @param {string} email 
     * @param {string} password 
     */
    async login(email, password) {
        await this.emailInput.waitForDisplayed({ timeout: 20000 });
        await this.emailInput.setValue(email);
        await this.passwordInput.setValue(password);
        if (await browser.isKeyboardShown()) {
            await browser.hideKeyboard();
        }
        await this.loginButton.click();
    }

    async isLoginSuccessful() {
        await this.successMessage.waitForDisplayed({ timeout: 10000 });
        return await this.successMessage.isDisplayed();
    }

    async dismissSuccessAlert() {
        if (await this.successOkButton.isDisplayed()) {
            await this.successOkButton.click();
        } else {
            try {
                await browser.acceptAlert();
            } catch (e) {
                // Silently fail if no alert to accept
            }
        }
    }
}

module.exports = new LoginPage();
