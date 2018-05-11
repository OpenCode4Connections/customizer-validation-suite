const JasmineConsoleReporter = require('jasmine-console-reporter');

exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [
    'src/tests/authentication/login.spec.js',
    'src/tests/customizer/helloworld.spec.js',
    'src/tests/customizer/profiles.spec.js',
    'src/tests/appregistry/deleteApps.spec.js',
  ],

  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      prefs: {
        'profile.managed_default_content_settings.notifications': 2,
      },
    },
  },

  onPrepare: () => {
    browser.driver.manage().window().setSize(1600, 800);

    // eslint-disable-next-line global-require
    require('babel-core/register')({ presets: ['es2015'] });
    jasmine.getEnv().clearReporters();
    jasmine.getEnv().addReporter(new JasmineConsoleReporter({
      colors: 1,
      cleanStack: 2,
      verbosity: 3,
      listStyle: 'indent',
      activity: false,
      emoji: true,
      beep: false,
    }));
  },
};
