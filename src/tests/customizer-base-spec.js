// Customizer test that verifies the Profiles Customization
// application on IBM Connections Cloud Integration1 test environment

const condition = protractor.ExpectedConditions;
const connCloud = {
  url: 'https://apps.na.collabserv.com/', // add test environment url here
  user: {
    username: 'user@test.com', // add user login here
    password: 'password', // add user password here
    name: 'Test User', // add test user name here
    userid: '10000001', // add test userid here
  },
};
const customizations = {
  helloworld: {
    path: 'homepage/web/updates/#myStream/imFollowing/all',
  },
  profiles: {
    path: 'profiles/html/profileView.do?userid=',
    cssPath: 'files/customizer/profiles/profilesCustomization.css',
  },
};

describe('IBM Connections Cloud Integration Test Environment', () => {
  it('logs in correctly', () => {
    browser.waitForAngularEnabled(false);
    browser.get(connCloud.url);

    // Verify username field and continue button appear
    const usernameField = element.all(by.id('username'));
    expect(usernameField.count()).toEqual(1);

    // Enter username, click continue
    usernameField.sendKeys(connCloud.user.username);
    element(by.id('continue')).click();

    // Verify password field & login button appear
    const passwordField = element.all(by.id('password'));
    expect(passwordField.count()).toEqual(1);
    const loginButton = element.all(by.id('submit_form'));
    expect(loginButton.count()).toEqual(1);

    // Enter password, click login
    passwordField.sendKeys(connCloud.user.password);
    loginButton.click();

    // Verify homepage loads
    const myOrg = element(by.css('.org._myorg'));
    browser.wait(condition.presenceOf(myOrg, 10000));
    const profileImg = element(by.id('hpUserPhotoImg'));
    expect(profileImg.getAttribute('alt')).toEqual(`${connCloud.user.name}'s Picture`);
  });

  it('loads helloWorld customization', () => {
    // Sample: https://github.com/ibmcnxdev/customizer/tree/master/samples/helloWorld
    browser.waitForAngularEnabled(false);
    browser.get(`${connCloud.url}${customizations.helloworld.path}`);

    // Verify page is loaded
    const lotusMain = element(by.id('lotusMain'));
    browser.wait(condition.presenceOf(lotusMain, 10000));

    // Verify hello world text appears
    const shareLabel = element(by.css('.shareSome-title'));
    expect(shareLabel.getText()).toEqual('Hello World!');
  });

  it('loads profiles customization', () => {
    // Sample: https://github.com/ibmcnxdev/customizer/tree/master/samples/profiles
    browser.waitForAngularEnabled(false);
    browser.get(`${connCloud.url}${customizations.profiles.path}${connCloud.user.userid}`);

    // Verify page is loaded
    const lotusMain = element(by.id('lotusMain'));
    browser.wait(condition.presenceOf(lotusMain, 10000));

    // Verify profilesCustomization.css is added to page
    const children = element.all(by.tagName('link'));
    const hrefList = [];
    children.each((child) => {
      child.getAttribute('href').then((value) => {
        hrefList.push(value);
      });
    }).then(() => {
      const profileCSSUrl = `${connCloud.url}${customizations.profiles.cssPath}`;
      let isContainsProfileCSS = false;
      hrefList.forEach((href) => {
        if (href.indexOf(profileCSSUrl) > -1) {
          isContainsProfileCSS = true;
        }
      });
      expect(isContainsProfileCSS).toEqual(true);
    });

    // Verify custom styling of profile photo is applied
    const imgProfilePhoto = element(by.id('imgProfilePhoto'));
    expect(imgProfilePhoto.getCssValue('height')).toEqual('138px');
    expect(imgProfilePhoto.getCssValue('width')).toEqual('138px');
    expect(imgProfilePhoto.getCssValue('margin-top')).toEqual('-20px');
    expect(imgProfilePhoto.getCssValue('border')).toEqual('5px solid rgb(11, 113, 128)');
  });
});
