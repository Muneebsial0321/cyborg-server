import * as path from 'path';

export const multerConfig = {
  dest: path.join(process.cwd(), 'upload'),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed!'));
    }
  },
};
