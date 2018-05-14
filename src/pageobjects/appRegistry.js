export default class AppRegistry {
  constructor() {
    this.path = 'appregistry/#/displayApps';
    this.newAppsManagerLink = element(by.linkText('new Apps Manager'));
    this.classicAppsManagerLink = element(by.linkText('click here'));
    this.newAppButton = element(by.id('newAppBtn'));

    this.basicInformationTab = element(by.id('tab1'));
    this.extensionsTab = element(by.id('tab2'));
    this.codeEditorTab = element(by.id('tab3'));
    this.deleteAppTab = element(by.id('tab4'));

    this.appEditor = element(by.css('#jsonEditor > div > div:nth-child(6) > div.textviewContent'));
    this.saveAppButton = element(by.id('saveAppBtn'));

    this.deleteAppDialog = element(by.id('deleteDialogTitle'));
    this.deleteAppDialogTextField = element(by.id('deleteName'));
    this.deleteAppDialogDeleteButton = element(by.id('confirmDeleteBtn'));

    this.newAppsManagerFrame = element.all(by.tagName('iframe'));
    // this.newAppsManagerFrame = element(by.css(
    //  '#frame > div.lotusMain > div.lotusContent > div > div > div > iframe')
    // );

    this.appList = element.all(by.css('#appList > div'));

    this.basicInfoNameInput = element(by.css('input#appName'));
    this.basicInfoDescriptionInput = element(by.css('textarea#appDesc'));
    this.basicInfoNext = element(by.css('button#nextBtn'));
    this.extensionsNew = element(by.css('button#newExtBtn'));
    this.extensionsServiceDropdown = element(by.css('select#extService'));
    this.extensionsServiceCustomizer = element(by.css('select#extService > option[value=Customizer]'));
    this.extensionsExtensionDropdown = element(by.css('button#extPointDropdownBtn'));
    this.extensionsExtensionUI = element(by.css('div#extPointDropdown ul > li:first-of-type'));
    this.extensionsExtensionProxy = element(by.css('div#extPointDropdown ul > li:nth-of-type(2)'));
    this.extensionsExtensionName = element(by.css('input#extName'));
    this.extensionsPathDropdown = element(by.css('button#pathDropdownBtn'));
    this.extensionsPathActivities = element(by.css('button#pathDropdownBtn + ul > li:first-of-type'));
    this.extensionsNext = element(by.css('button#extNextBtn'));
    this.extensionsAdd = element(by.css('button#extAddBtn'));
    this.extensionsSave = element(by.css('button#extSaveAppBtn'));
  }

  appByIndex(index) {
    return this.appList.get(index);
  }

  newAppsManagerFrameFirst() {
    return this.newAppsManagerFrame.last();
  }

  switchToBasicInformationTab() {
    this.basicInformationTab.click();
  }

  switchToExtensionsTab() {
    this.extensionsTab.click();
  }

  switchToCodeEditorTab() {
    this.codeEditorTab.click();
  }

  switchToDeleteAppTab() {
    this.deleteAppTab.click();
  }

  switchToNewAppsManager() {
    this.newAppsManagerLink.click();
    browser.switchTo().frame(this.newAppsManagerFrameFirst().getWebElement());
    browser.sleep(10000);
  }

  selectNewAppButton() {
    this.newAppButton.click();
  }

  selectSaveAppButton() {
    this.saveAppButton.click();
  }

  replaceAppEditorText(json) {
    this.appEditor.sendKeys(browser.controlKey, 'a');
    this.appEditor.sendKeys(protractor.Key.DELETE);
    this.appEditor.sendKeys(JSON.stringify(json));
  }

  replaceAppEditorTextAndSave(json) {
    this.replaceAppEditorText(json);
    this.saveAppButton.click();
    browser.sleep(10000);
  }

  deleteApp(app, appName) {
    this.deleteAppDialogTextField.sendKeys(appName);
    this.deleteAppDialogDeleteButton.click();
  }

  static appListCount() {
    return element.all(by.css('#appList > div')).count();
  }

  static appName(name) {
    return element(by.cssContainingText('div.ic-app-name', name));
  }

  static appService(service) {
    return element(by.cssContainingText('div.ic-app-service', service));
  }

  static appDesc(desc) {
    return element(by.cssContainingText('div.ic-app-desc', desc));
  }

  static appState(state) {
    return element(by.cssContainingText('div.ic-app-state-enabled', state));
  }

  static extensionInList(name) {
    return element(by.cssContainingText('p#card-app-title', name));
  }

  static appByName(name) {
    return element(by.cssContainingText('div.ic-app', name));
  }

  static appAllNames() {
    return element.all(by.css('div.ic-app-name')).map(elm => elm.getText());
  }

  static openAppActionsMenuButton(app) {
    return app.element(by.css('svg.ic-svg-icon'));
  }

  static appDropdownDeleteButton(app) {
    return app.element(by.id('deleteAppBtn'));
  }
}
