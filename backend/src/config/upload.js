import { diskStorage } from 'multer';
import crypto from 'crypto';
import { resolve, extname } from 'path';

export default {
  storage: new diskStorage({
    destination: resolve(__dirname, '..', '..', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
