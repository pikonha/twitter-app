import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const destination = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  destination,
  storage: multer.diskStorage({
    destination,
    filename(req, file, cb) {
      const hash = crypto.randomBytes(10).toString('HEX');
      const fileName = `${hash}-${file.originalname}`;

      cb(null, fileName);
    },
  }),
};
