const Config = require('./src/config/config');
const setupApp = require('./src/app');

setupApp()
  .then((app) => app.listen(process.env.port || Config.PORT, () => console.info(`app running on port ${Config.PORT}`)))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
