// src/routes/musicRoutes.js
import * as musicController from '../controllers/musicController.js';

export default async function musicRoutes(fastify, options) {
    // Rota para criar um novo registo de uma música
    fastify.post('/musics', musicController.createMusic);

    // Rota para obter todas as músicas
    fastify.get('/musics', musicController.getAllMusics);

    // Rota para obter uma música pelo ID
    fastify.get('/musics/:id', musicController.getMusicById);

    // Rota para obter música(s) pelo titulo
    fastify.get('/musics/title/:title', musicController.getMusicByTitle);

    // Rota para obter musicas pelo genero
    fastify.get('/musics/genero/:genero', musicController.getMusicByGenero);

    // Rota para atualizar uma música pelo ID
    fastify.put('/musics/:id', musicController.updateMusic);

    // Rota para apagar uma música pelo ID
    fastify.delete('/musics/:id', musicController.deleteMusic);
}
