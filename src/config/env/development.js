class Config {
  constructor() {
    this.env = 'development';
    this.PORT = process.env.PORT || 3000;
    this.API_BASE = '/api';
    const DB_DB = process.env.DB_DB ? process.env.DB_DB : 'b915jnoavh0fjlh';
    const DB_USER = process.env.DB_USER ? process.env.DB_USER : 'ugp6drvosrrqrfebs2ey';
    const DB_PASSWORD = process.env.DB_PASSWORD ? process.env.DB_PASSWORD : 'o0FsqXM4oUoEiBcSBBSi';
    const DB_HOST = process.env.DB_HOST ? process.env.DB_HOST : 'b915jnoavh0fjlh-mongodb.services.clever-cloud.com';
    const DB_PORT = process.env.DB_PORT ? process.env.DB_PORT : '27017';
    this.MONGODB_URL = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DB}`;
  }
}

module.exports = new Config();
