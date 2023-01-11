// multer загрузка файлов на сервер
// npm install nodemon multer
const multer = require('multer');

// пространство, где хранятя фото
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'images/');
  },
  filename(req, file, cb) {
    // задаем имя картинки, по которому она будет передана на сервер
    // cb(null, new Date().toISOString() + '-' + file.originalname);
    cb(null, `${new Date().toISOString()}-${file.originalname}`);
  },
});
const types = ['image/png', 'image/jpeg', 'image/jpg'];

const fileFilter = (req, file, cb) => {
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
module.exports = multer({ storage, fileFilter });
