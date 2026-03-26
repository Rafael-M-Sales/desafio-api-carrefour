const Page = require('./page');

/**
 * DESAFIO CARREFOUR - Page Object de Forms
 * 
 * Requisito: Cobrir interações com diferentes tipos de inputs (texto, switch, dropdown).
 */
class FormsPage extends Page {
    /**
     * Seletores para interação com elementos de formulário.
     */
    get inputField() { return $('~text-input'); }
    get inputTextResult() { return $('~input-text-result'); }
    get switchBtn() { return $('~switch'); }
    get switchText() { return $('~switch-text'); }
    get dropDown() { return $('~Dropdown'); }
    get activeBtn() { return $('~button-Active'); }
    get inactiveBtn() { return $('~button-Inactive'); }
    
    // Alerta do botão ativo
    get alertTitle() { return $('id=android:id/alertTitle'); }
    get okBtn() { return $('id=android:id/button1'); }

    /**
     * Lógica para preencher o campo e clicar no botão ativo.
     * @param {string} text 
     */
    async fillForm(text) {
        await this.inputField.waitForDisplayed({ timeout: 20000 });
        await this.inputField.setValue(text);
        if (await browser.isKeyboardShown()) {
            await browser.hideKeyboard();
        }
        await this.activeBtn.click();
    }
}

module.exports = new FormsPage();
