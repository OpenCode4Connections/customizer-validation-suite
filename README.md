# customizer-validation-suite
Test framework to validate Customizer extensions to ensure quality and protect against regressions

### Overview
This project is designed to provide a framework and sample code for running automated tests against IBM Connections Customizer

### Setup
1. Clone the project from Git repo
2. Make sure you have node and npm installed
3. Switch to top level directory
4. `npm install`
5. `webdriver-manager update` or `npm run webdriver-update`
6. `webdriver-manager start` or `npm run webdriver-start`
7. Open one of the spec files and insert desired env and login details
8. `npm run test`

### Lint testing
All projects are covered with eslint rules to airbnb guidelines https://github.com/airbnb/javascript. The `.eslintrc` file defines the JS linting rules for this project. `npm run lint` - You can run lint in command line with this command.
