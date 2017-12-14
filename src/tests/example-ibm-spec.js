// A simple test that loads the login page for
// IBM Connections Cloud (US geo) and verifies
// that the login page loads correctly

describe('IBM Connections Cloud', () => {
  it('login page loads correctly', () => {
    browser.waitForAngularEnabled(false);
    browser.get('https://apps.na.collabserv.com');

    const usernameField = element.all(by.id('username'));
    expect(usernameField.count()).toEqual(1);
    usernameField.sendKeys('test@example.org');
    element(by.id('continue')).click();

    const passwordField = element.all(by.id('password'));
    expect(passwordField.count()).toEqual(1);
    const loginButton = element.all(by.id('submit_form'));
    expect(loginButton.count()).toEqual(1);
  });
});
