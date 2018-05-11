export default class LoginPage {
  constructor() {
    this.path = 'manage/account/dashboardHandler/input';
    this.usernameField = element.all(by.id('username'));
    this.passwordField = element.all(by.id('password'));
    this.continueBtn = element(by.id('continue'));
    this.loginBtn = element.all(by.id('submit_form'));
  }

  setUsername(username) {
    this.usernameField.sendKeys(username);
  }

  setPassword(password) {
    this.passwordField.sendKeys(password);
  }
}
