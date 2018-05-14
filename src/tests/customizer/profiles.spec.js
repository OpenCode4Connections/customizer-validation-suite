import ServerHelper from '../../util/serverHelper';
import testUtil from '../../util/testUtil';
import HomePage from '../../pageobjects/homePage';
import ProfilePage from '../../pageobjects/profilePage';
import AppRegistry from '../../pageobjects/appRegistry';
import profilesJson from '../../exts/profiles.json';

const server = ServerHelper.getServer(process.env.TESTENV);
const profilePage = new ProfilePage();
const homepage = new HomePage();
const appregistry = new AppRegistry();
const TIMEOUT = 30000;
const condition = protractor.ExpectedConditions;

describe('Verify Profiles Customizer Global Sample', () => {
  it('loads appregistry and creates Profiles Customization App', (done) => {
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
    appregistry.appEditor.sendKeys(JSON.stringify(profilesJson));

    appregistry.saveAppButton.click();

    expect(browser.wait(condition.presenceOf(appregistry.newAppButton, TIMEOUT)));

    done();
  });

  it('loads profile page', (done) => {
    browser.waitForAngularEnabled(false);
    browser.get(`${server.url}${homepage.path}`);
    expect(browser.getCurrentUrl()).toEqual(`${server.url}${homepage.path}`);
    expect(browser.wait(condition.presenceOf(homepage.lotusMain, TIMEOUT)));
    expect(browser.wait(condition.presenceOf(homepage.activityStreamHeaderTitle, TIMEOUT)));

    // Navigate to profile page
    expect(browser.wait(condition.presenceOf(profilePage.profileIcon, TIMEOUT)));
    profilePage.profileIcon.click();
    expect(browser.wait(condition.presenceOf(profilePage.myProfileLink, TIMEOUT)));
    profilePage.myProfileLink.click();
    expect(browser.wait(condition.presenceOf(profilePage.profileEmailBtn, TIMEOUT)));

    done();
  });

  it('loads profiles customization', () => {
    // Sample: https://github.com/ibmcnxdev/customizer/tree/master/samples/profiles
    // Verify page is loaded
    const lotusMain = element(by.id('lotusMain'));
    browser.wait(condition.presenceOf(lotusMain, 10000));

    // Verify css injection files are added to page
    profilePage.cssInjections.forEach((cssInjection) => {
      testUtil.verifyInjectionContained(cssInjection, 'css');
    });

    // Verify custom styling of profile photo is applied
    expect(profilePage.profileImg.getCssValue('height')).toEqual('138px');
    expect(profilePage.profileImg.getCssValue('width')).toEqual('138px');
    expect(profilePage.profileImg.getCssValue('margin-top')).toEqual('-20px');
    expect(profilePage.profileImg.getCssValue('border')).toEqual('5px solid rgb(11, 113, 128)');
  });
});
