// src/routes/partilharFicheiroRoutes.js
import * as partilharFicheiroController from '../controllers/partilharFicheiroController.js';

export default async function partilharFicheiroRoutes(fastify, options) {
    // Rota para partilhar um ficheiro
    fastify.post('/share', partilharFicheiroController.partilharFicheiro);

    // Rota para obter todas as musicas
    fastify.get('/shared/musics/:userDest', partilharFicheiroController.getSharedMusics);

    // Rota para obter todas as imagens
    fastify.get('/shared/images/:userDest', partilharFicheiroController.getSharedImages);

    // Rota para obter todos os videos
    fastify.get('/shared/videos/:userDest', partilharFicheiroController.getSharedVideos);

    // Rota para desfazer uma partilha
    fastify.delete('/remove/:mediaType/:mediaId/:userDest', partilharFicheiroController.desfazerPartilha);
}
