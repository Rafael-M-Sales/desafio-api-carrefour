const Page = require('./page');

class HomePage extends Page {
    get loginMenu() { return $('~Login'); }
    get formsMenu() { return $('~Forms'); }
    get webviewMenu() { return $('~Webview'); }
    get swipeMenu() { return $('~Swipe'); }
    get dragMenu() { return $('~Drag'); }
    get homeMenu() { return $('~Home'); }

    async goToLogin() {
        await (await this.loginMenu).click();
    }

    async goToForms() {
        await (await this.formsMenu).click();
    }

    async goToSwipe() {
        await (await this.swipeMenu).click();
    }
}

module.exports = new HomePage();
