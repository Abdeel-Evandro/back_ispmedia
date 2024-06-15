// src/controller/artistaController.js
import * as artistaService from '../services/artistaServices.js';

// criar um novo artista
export async function createArtista(req, res) {
    try {
        if(req.body.nome.trim().length > 0){
            const artista = await artistaService.createArtista(req.body);
            res.status(201).send(artista);  
        }else{
            res.status(400).send({ message: "O nome do Artista não pode ser nulo! "});
        }
        
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// recuperar todos os artistas
export async function getAllArtistas(req, res) {
    try {
        const artistas = await artistaService.getAllArtistas();
        res.status(200).send(artistas);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// recuperar um artista pelo ID
export async function getArtistaById(req, res) {
    try {
        const artistaId = parseInt(req.params.id);
        const artista = await artistaService.getArtistaById(artistaId);
        res.status(200).send(artista);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
}

// recuperar um artista pelo nome
export async function getArtistasByName(req, res) {
    try {
        const artistas = await artistaService.getArtistasByName(req.params.nome);
        if (artistas.length > 0) {
            res.status(200).send(artistas);
        } else {
            res.status(404).send({ error: 'Artistas not found' });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// actualizar um artista
export async function updateArtista(req, res) {
    try {
        const artistaId = parseInt(req.params.id);
        const updatedArtista = await artistaService.updateArtista(artistaId, req.body);
        res.status(202).send(updatedArtista);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
}

// eliminar um artista
export async function deleteArtista(req, res) {
    try {
        const artistaId = parseInt(req.params.id);
        const result = await artistaService.deleteArtista(artistaId);
        res.status(200).send(result);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
}
