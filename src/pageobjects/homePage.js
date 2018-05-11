export default class HomePage {
  constructor() {
    this.path = 'homepage/web/updates/#myStream/imFollowing/all';
    this.myOrg = element(by.css('.org._myorg'));
    this.profileImg = element(by.id('hpUserPhotoImg'));
    this.defaultActivityStreamHeaderTitle = 'Share Something:';
    this.lotusMain = element(by.id('lotusMain'));
    this.activityStreamHeaderTitle = element(by.css('.shareSome-title'));
    this.jsInjections = ['/files/customizer/helloWorld/helloWorld.user.js?repoName=global-samples'];
  }
}
