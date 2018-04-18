exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['src/tests/example-ibm-spec.js', 'src/tests/customizer-base-spec.js'],
  capabilities: {
    browserName: 'chrome',
  },
};
