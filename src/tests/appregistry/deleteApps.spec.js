import ServerHelper from '../../util/serverHelper';
import AppRegistry from '../../pageobjects/appRegistry';
import helloworldJson from '../../exts/helloworld.json';
import profilesJson from '../../exts/profiles.json';

const server = ServerHelper.getServer(process.env.TESTENV);
const appregistry = new AppRegistry();
const TIMEOUT = 30000;
const condition = protractor.ExpectedConditions;
const helloName = helloworldJson.name;
const profilesName = profilesJson.name;

describe('Delete App Registry App', () => {
  it('loads appregistry', (done) => {
    browser.waitForAngularEnabled(false);
    browser.get(`${server.url}${appregistry.path}`);
    expect(browser.getCurrentUrl()).toEqual(`${server.url}${appregistry.path}`);
    expect(browser.wait(condition.presenceOf(appregistry.newAppsManagerLink, TIMEOUT)));

    done();
  });

  it('switch to New Apps Manager', (done) => {
    browser.waitForAngularEnabled(false);
    appregistry.switchToNewAppsManager();
    expect(browser.wait(condition.visibilityOf(appregistry.newAppButton, TIMEOUT)));

    done();
  });

  it('delete the Hello World Customization App', (done) => {
    browser.waitForAngularEnabled(false);

    const app = AppRegistry.appByName(helloName);
    const appDropdown = AppRegistry.openAppActionsMenuButton(app);
    appDropdown.click();
    const appDropdownDeleteButton = AppRegistry.appDropdownDeleteButton(app);
    appDropdownDeleteButton.click();
    appregistry.deleteApp(app, helloName);

    expect(browser.wait(condition.stalenessOf(app, TIMEOUT)));

    done();
  });

  it('delete the Profiles Customization App', (done) => {
    browser.waitForAngularEnabled(false);

    const app = AppRegistry.appByName(profilesName);
    const appDropdown = AppRegistry.openAppActionsMenuButton(app);
    appDropdown.click();
    const appDropdownDeleteButton = AppRegistry.appDropdownDeleteButton(app);
    appDropdownDeleteButton.click();
    appregistry.deleteApp(app, profilesName);

    expect(browser.wait(condition.stalenessOf(app, TIMEOUT)));

    done();
  });
});
