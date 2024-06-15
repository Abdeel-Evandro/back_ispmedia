// src/routes/videoRoutes.js
import * as imageController from '../controllers/imageController.js';

export default async function imageRoutes(fastify, options) {

    // Rota para criar um novo registo de uma imagem
    fastify.post('/images', imageController.createImage);

    // Rota para obter todas as imagens
    fastify.get('/images', imageController.getAllImages);

    // Rota para obter uma imagem pelo ID
    fastify.get('/images/:id', imageController.getImageById);

    // Rota para obter imagem(s) pelo nome
    fastify.get('/images/title/:title', imageController.getImageByTitle);

    // Rota para atualizar uma imagem pelo ID
    fastify.put('/images/:id', imageController.updateImage);

    // Rota para apagar uma imagem pelo ID
    fastify.delete('/images/:id', imageController.deleteImage);

    //Rota para obter todas as imagens de um user
    fastify.get('/images/user/:id', imageController.getUserImages);
}
