// src/controllers/criticaController.js
import * as criticaService from '../services/criticaServices.js';

// registar o novo registo de uma critica
export async function adicionarCritica(req, res) {
    try {
        const critica = await criticaService.adicionarCritica(req.body);
        res.status(201).send(critica);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// recuperar todas as criticas da BD
export async function getAllCriticas(req, res) {
    try {
        const criticas = await criticaService.getAllCriticas();
        res.status(200).send(criticas);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// recuperar uma critica pelo ID
export async function getCriticaById(req, res) {
    try {
        const criticaID = parseInt(req.params.criticaId);
        const critica = await criticaService.getCriticaById(criticaID);
        res.status(200).send(critica);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
}

// recuperar todas as criticas de um certo album
export async function getAlbumCriticas(req, res) {
    try {
        const albumId = parseInt(req.params.albumId);
        const criticas = await criticaService.getAlbumCriticas(albumId);
        res.status(200).send(criticas);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// actualizar as informações de uma critica
export async function updateCritica(req, res) {
    try {
        const criticaId = parseInt(req.params.criticaId);
        const novaCritica = await criticaService.updateCritica(criticaId, req.body);
        res.status(202).send(novaCritica);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
}

// eliminar todas as criticas de um album
export async function deleteAllAlbumCriticas(req, res) {
    try {
        const albumId = parseInt(req.params.albumId);
        const result = await criticaService.deleteAllAlbumCriticas(albumId);
        res.status(200).send(result);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
}

// eliminar todas as criticas de um user
export async function deleteAllUserCriticas(req, res) {
    try {
        const userId = parseInt(req.params.userId);
        const result = await criticaService.deleteAllUserCriticas(userId);
        res.status(200).send(result);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
}

// eliminar uma critica de um album
export async function deleteCritica(req, res) {
    try {
        const criticaId = parseInt(req.params.criticaId);
        const albumId = parseInt(req.params.albumId);
        const result = await criticaService.deleteCritica(criticaId, albumId);
        res.status(200).send(result);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
}