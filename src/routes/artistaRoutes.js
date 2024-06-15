// src/routes/artistaRoutes.js
import * as artistaController from '../controllers/artistaController.js';

export default async function artistaRoutes(fastify, options) {
    // Rota para criar um novo artista
    fastify.post('/artistas', artistaController.createArtista);

    // Rota para obter todos os artistas
    fastify.get('/artistas', artistaController.getAllArtistas);

    // Rota para obter um artista pelo ID
    fastify.get('/artistas/:id', artistaController.getArtistaById);

    // Rota para obter artistas pelo nome
    fastify.get('/artistas/nome/:nome', artistaController.getArtistasByName);

    // Rota para atualizar um artista pelo ID
    fastify.put('/artistas/:id', artistaController.updateArtista);

    // Rota para apagar um artista pelo ID
    fastify.delete('/artistas/:id', artistaController.deleteArtista);
}
