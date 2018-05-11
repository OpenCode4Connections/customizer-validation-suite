export default class ProfilePage {
  constructor() {
    this.lotusMain = element(by.css('.lotusMain'));
    this.profileEmailBtn = element(by.css('#btn_actn__personCardSendEMail'));
    this.profileIcon = element(by.css('#bss-usersMenu'));
    this.myProfileLink = element(by.css('.userprofile a'));
    this.profileImg = element(by.id('imgProfilePhoto'));
    this.cssInjections = ['/files/customizer/profiles/profilesCustomization.css?repoName=global-samples'];
  }
}
