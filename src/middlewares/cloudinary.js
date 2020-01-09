const cloudinary = require('cloudinary');
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
  cloud_name: 'dqssnq9lr',
  api_key: '672883363642143',
  api_secret: '6epXkMj7ImF5A_ayc__QxCWuEww',
});
exports.uploads = (file, folder) => new Promise((resolve) => {
  cloudinary.uploader.upload(file, (result) => {
    resolve({
      url: result.url,
      id: result.public_id,
    });
  }, {
    resource_type: 'auto',
    folder,
  });
});
