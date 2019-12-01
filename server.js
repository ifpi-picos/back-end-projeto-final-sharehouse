require('module-alias/register')

const config  = require('@config/config');
const app = require('./src/app');

/**
 * Server listener
 */
app.listen(process.env.port || config.PORT, () => console.info(`app running on port ${config.PORT}`));