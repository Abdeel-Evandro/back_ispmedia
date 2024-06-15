// uploadConfig.js
import multer from 'fastify-multer';
import path from 'path';

// Criação do armazenamento local
const createStorage = (fileType) => multer.diskStorage({
  destination: (req, file, cb) => {
    const username = req.params.username;
    const baseDir = path.resolve('content', 'users', username, fileType);
    cb(null, baseDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Configurar o multer para aceitar apenas um arquivo por upload
const uploadOptions = {
     // Limitar o tamanho do arquivo para (10MB)
    //limits: { fileSize: 10 * 1024 * 1024 },
    files: 1 // Apenas um arquivo por upload
};

export const uploadImages = multer({ storage: createStorage('images'), ...uploadOptions });
export const uploadVideos = multer({ storage: createStorage('videos'), ...uploadOptions });
export const uploadMusics = multer({ storage: createStorage('musics'), ...uploadOptions });