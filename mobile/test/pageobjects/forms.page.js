const Page = require('./page');

class FormsPage extends Page {
    get inputField() { return $('~text-input'); }
    get switchBtn() { return $('~switch'); }
    get dropDown() { return $('~Dropdown'); }
    get activeBtn() { return $('~button-Active'); }
    get inactiveBtn() { return $('~button-Inactive'); }

    async fillForm(text) {
        await this.inputField.setValue(text);
        await this.activeBtn.click();
    }
}

module.exports = new FormsPage();
