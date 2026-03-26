const Page = require('./page');

/**
 * DESAFIO CARREFOUR - Page Object de Login
 * Responsável por centralizar seletores e ações da tela de autenticação.
 */
class LoginPage extends Page {
    /**
     * Seletores (usando Accessiblity ID para melhores práticas mobile)
     */
    get loginMenu() { return $('~Login'); }
    get emailInput() { return $('~input-email'); }
    get passwordInput() { return $('~input-password'); }
    get loginButton() { return $('~button-LOGIN'); }
    get successMessage() { return $('/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.TextView'); }
    get errorMessage() { return $('android=new UiSelector().textContains("Please enter a valid email address")'); }

    async login(email, password) {
        await this.emailInput.setValue(email);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();
    }
}

module.exports = new LoginPage();
