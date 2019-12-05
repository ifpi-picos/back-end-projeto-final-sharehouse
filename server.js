require('module-alias/register');

const config = require('./src/config/config');
const setupApp = require('./src/app');

/**
 * Server listener
 */
setupApp()
  .then((app) => app.listen(config.PORT, () => console.info(`app running on port ${config.PORT}`)))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
