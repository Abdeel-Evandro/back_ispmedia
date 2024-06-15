import { uploadImages, uploadVideos, uploadMusics } from '../services/uploadServices.js';
import { uploadImage, uploadVideo, uploadMusic, getImage, getVideo, getMusic, downloadFile } from '../controllers/uploadController.js';

export default async function uploadRoutes(fastify) {
  // Rotas para transferir medias
  fastify.post('/upload/video/:username', { preHandler: uploadVideos.single('video') }, uploadVideo);
  fastify.post('/upload/image/:username', { preHandler: uploadImages.single('image') }, uploadImage);
  fastify.post('/upload/music/:username', { preHandler: uploadMusics.single('music') }, uploadMusic);

  // Rotas para obter os medias carregados
  fastify.get('/upload/image/:username/:filename', getImage);
  fastify.get('/upload/video/:username/:filename', getVideo);
  fastify.get('/upload/music/:username/:filename', getMusic);

  // Rota para realizar download de ficheiros
  fastify.get('/download/:username/:fileType/:filename', downloadFile);
}
