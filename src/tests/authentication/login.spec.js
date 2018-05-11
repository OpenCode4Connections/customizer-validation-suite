import ServerHelper from '../../util/serverHelper';
import HomePage from '../../pageobjects/homePage';
import LoginPage from '../../pageobjects/loginPage';

const server = ServerHelper.getServer(process.env.TESTENV);
const loginPage = new LoginPage();
const homePage = new HomePage();
const TIMEOUT = 30000;

const condition = protractor.ExpectedConditions;

describe('Login to IBM Connections Cloud Environment', () => {
  it('login page loads correctly', (done) => {
    browser.waitForAngularEnabled(false);
    browser.get(server.url);

    // Login steps
    expect(loginPage.usernameField.count()).toEqual(1);
    loginPage.setUsername(server.user);
    loginPage.continueBtn.click();
    expect(loginPage.passwordField.count()).toEqual(1);
    expect(loginPage.loginBtn.count()).toEqual(1);
    loginPage.setPassword(server.password);
    loginPage.loginBtn.click();

    // Verify homepage loads
    browser.wait(condition.presenceOf(homePage.myOrg, TIMEOUT));
    expect(homePage.profileImg.getAttribute('alt')).toEqual(`${server.username}'s Picture`);

    done();
  });
});
