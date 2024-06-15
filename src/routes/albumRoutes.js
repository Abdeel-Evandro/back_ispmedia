// src/routes/albumRoutes.js
import * as albumController from '../controllers/albumController.js';

export default async function albumRoutes(fastify, options) {
    // Rota para criar um novo album
    fastify.post('/albuns', albumController.createAlbum);

    // Rota para obter todos os albuns
    fastify.get('/admin/albuns', albumController.getAllAlbuns);

    // Rota para obter todos os albuns para o cliente (public)
    fastify.get('/albuns', albumController.getAlbuns);

    // Rota para obter um album pelo ID
    fastify.get('/albuns/:id', albumController.getAlbumById);

    // Rota para obter albuns pelo nome
    fastify.get('/albuns/nome/:nome', albumController.getAlbunsByName);

    // Rota para recuperar todas as musicas de um album - usando o ID do album
    fastify.get('/album/musics/:id', albumController.getAlbumMusics);

    // Rota para atualizar um album pelo ID
    fastify.put('/albuns/:id', albumController.updateAlbum);

    // Rota para apagar um album pelo ID
    fastify.delete('/albuns/:id', albumController.deleteAlbum);
}
