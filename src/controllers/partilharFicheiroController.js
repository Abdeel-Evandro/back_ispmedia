// src/controllers/partilharFicheiroController.js
import * as partilharFicheiroServices from '../services/partilharFicheiroServices.js';

// partilhar um ficheiro
export async function partilharFicheiro(req, res) {
    try {
        const registarPartilha = await partilharFicheiroServices.partilharFicheiro(req.body);
        res.status(201).send(registarPartilha);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// recuperar todas as musicas partilhadas com um user
export async function getSharedMusics(req, res) {
    try {
        const userDest = parseInt(req.params.userDest);
        const musicasPartilhadas = await partilharFicheiroServices.getSharedMusics(userDest);
        res.status(200).send(musicasPartilhadas);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// recuperar todas as imagens partilhadas com um user
export async function getSharedImages(req, res) {
    try {
        const userDest = parseInt(req.params.userDest);
        const imagensPartilhadas = await partilharFicheiroServices.getSharedImages(userDest);
        res.status(200).send(imagensPartilhadas);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// recuperar todos os videos partilhados com um user
export async function getSharedVideos(req, res) {
    try {
        const userDest = parseInt(req.params.userDest);
        const videosPartilhados = await partilharFicheiroServices.getSharedVideos(userDest);
        res.status(200).send(videosPartilhados);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// desfazer uma partilha
export async function desfazerPartilha(req, res) {
    try {
        // user Id
        const userDest = parseInt(req.params.userDest);
        // media type
        const mediaType = req.params.mediaType;
        // media id
        const mediaId = req.params.mediaId;

        const result = await artistaService.desfazerPartilha(mediaType, mediaId, userDest);
        res.status(200).send(result);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
}
