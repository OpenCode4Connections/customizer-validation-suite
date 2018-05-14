import ServerHelper from '../../util/serverHelper';
import testUtil from '../../util/testUtil';
import HomePage from '../../pageobjects/homePage';
import AppRegistry from '../../pageobjects/appRegistry';
import helloworldJson from '../../exts/helloworld.json';

const server = ServerHelper.getServer(process.env.TESTENV);
const homepage = new HomePage();
const appregistry = new AppRegistry();
const TIMEOUT = 30000;
const condition = protractor.ExpectedConditions;

describe('Verify Hello World Customizer Sample', () => {
  it('loads homepage and verifies default Activity Stream Header Title before customization', (done) => {
    browser.waitForAngularEnabled(false);
    browser.get(`${server.url}${homepage.path}`);
    expect(browser.getCurrentUrl()).toEqual(`${server.url}${homepage.path}`);
    expect(browser.wait(condition.presenceOf(homepage.lotusMain, TIMEOUT)));
    expect(browser.wait(condition.presenceOf(homepage.activityStreamHeaderTitle, TIMEOUT)));
    expect(homepage.activityStreamHeaderTitle, 'Share Something:');

    done();
  });

  it('loads appregistry and creates Hello World Customization App', (done) => {
    browser.waitForAngularEnabled(false);
    browser.get(`${server.url}${appregistry.path}`);
    expect(browser.getCurrentUrl()).toEqual(`${server.url}${appregistry.path}`);
    expect(browser.wait(condition.presenceOf(appregistry.newAppsManagerLink, TIMEOUT)));

    appregistry.switchToNewAppsManager();
    appregistry.newAppButton.click();
    appregistry.codeEditorTab.click();
    expect(browser.wait(condition.presenceOf(appregistry.appEditor, TIMEOUT)));

    appregistry.appEditor.sendKeys(protractor.Key.CONTROL, 'a');
    appregistry.appEditor.sendKeys(protractor.Key.DELETE);
    appregistry.appEditor.sendKeys(JSON.stringify(helloworldJson));

    appregistry.saveAppButton.click();

    expect(browser.wait(condition.presenceOf(appregistry.newAppButton, TIMEOUT)));

    done();
  });

  it('loads homepage and verifies the Activity Stream Header Title after the Hello World customization', (done) => {
    browser.waitForAngularEnabled(false);
    browser.get(`${server.url}${homepage.path}`);
    expect(browser.getCurrentUrl()).toEqual(`${server.url}${homepage.path}`);
    expect(browser.wait(condition.presenceOf(homepage.lotusMain, TIMEOUT)));

    // Verify JS injection files are added to page
    homepage.jsInjections.forEach((jsInjection) => {
      testUtil.verifyInjectionContained(jsInjection, 'js');
    });

    expect(homepage.activityStreamHeaderTitle, 'Hello World!');

    done();
  });

  //  Modify the Hello World Customization

  /* it('loads homepage and verifies the Hello World customization modification', (done) => {
    browser.waitForAngularEnabled(false);
    browser.get(`${server.url}${homepage.path}`);
    expect(browser.getCurrentUrl()).toEqual(`${server.url}${homepage.path}`);
    expect(browser.wait(condition.presenceOf(homepage.lotusMain, TIMEOUT)));
    expect(homepage.activityStreamHeaderTitle, 'Welcome back Test User - edited');

    done();
  });

  it('loads  appregistry and deletes the Hello World Customization App', () => {
    browser.waitForAngularEnabled(false);
    browser.get(`${server.url}${homepage.path}`);
    expect(browser.getCurrentUrl()).toEqual(`${server.url}${homepage.path}`);
    expect(browser.wait(condition.presenceOf(appregistry.newAppsManagerLink, TIMEOUT)));

    appregistry.newAppsManagerLink.click();
    browser.switchTo().frame(0); // Switch to iframe containing new Apps Manager

    expect(browser.wait(condition.presenceOf(appregistry.openAppActionsMenuButton, TIMEOUT)));
    appregistry.openAppActionsMenuButton.click();
    expect(browser.wait(condition.presenceOf(appregistry.deleteAppButton, TIMEOUT)));
    appregistry.deleteAppButton.click();
    expect(browser.wait(condition.presenceOf(appregistry.confirmButton, TIMEOUT)));
    appregistry.confirmButton.click();
  });
  */
});
