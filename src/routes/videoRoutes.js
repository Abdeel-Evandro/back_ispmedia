// src/routes/videoRoutes.js
import * as videoController from '../controllers/videoController.js';

export default async function videoRoutes(fastify, options) {

    // Rota para criar um novo registo de um video
    fastify.post('/videos', videoController.createVideo);

    // Rota para obter todos os videos
    fastify.get('/videos', videoController.getAllVideos);

    // Rota para obter uma música pelo ID
    fastify.get('/videos/:id', videoController.getVideoById);

    // Rota para obter música(s) pelo nome
    fastify.get('/videos/title/:title', videoController.getVideoByTitle);

    // Rota para atualizar um música pelo ID
    fastify.put('/videos/:id', videoController.updateVideo);

    // Rota para apagar uma música pelo ID
    fastify.delete('/videos/:id', videoController.deleteVideo);
}
