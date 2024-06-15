// src/routes/generoRoutes.js
import * as generoController from '../controllers/generoController.js';

export default async function generoRoutes(fastify, options) {
    // Rota para criar um novo genero
    fastify.post('/generos', generoController.createGenero);

    // Rota para obter todos os generos
    fastify.get('/generos', generoController.getAllGeneros);

    // Rota para obter um genero pelo ID
    fastify.get('/generos/:id', generoController.getGeneroById);

    // Rota para obter generos pelo nome
    fastify.get('/generos/nome/:nome', generoController.getGenerosByName);

    // Rota para atualizar um genero pelo ID
    fastify.put('/generos/:id', generoController.updateGenero);

    // Rota para apagar um genero pelo ID
    fastify.delete('/generos/:id', generoController.deleteGenero);
}
