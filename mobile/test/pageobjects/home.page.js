const Page = require('./page');

/**
 * DESAFIO CARREFOUR - Page Object Home
 * 
 * Requisito: Organizar a navegação principal do aplicativo (Tabs/Menu inferior).
 */
class HomePage extends Page {
    /**
     * Seletores para o menu de navegação inferior.
     */
    get homeMenu() { return $('~Home'); }
    get webviewMenu() { return $('~Webview'); }
    get loginMenu() { return $('~Login'); }
    get formsMenu() { return $('~Forms'); }
    get swipeMenu() { return $('~Swipe'); }
    get dragMenu() { return $('~Drag'); }

    /**
     * Métodos de navegação para facilitar o reuso nos testes.
     */
    async goToLogin() {
        await this.loginMenu.waitForDisplayed({ timeout: 20000 });
        await this.loginMenu.click();
    }

    async goToForms() {
        await this.formsMenu.waitForDisplayed({ timeout: 20000 });
        await this.formsMenu.click();
    }

    async goToSwipe() {
        await this.swipeMenu.waitForDisplayed({ timeout: 20000 });
        await this.swipeMenu.click();
    }

    async goToHome() {
        await this.homeMenu.waitForDisplayed({ timeout: 20000 });
        await this.homeMenu.click();
    }
}

module.exports = new HomePage();
