// src/controllers/albumController.js
import * as albumService from '../services/albumServices.js';

// criar album -> function insert
export async function createAlbum(req, res) {
    try {
        if(req.body.nome.trim().length > 0){
            const album = await albumService.createAlbum(req.body);
            res.status(201).send(album);
        }else{
            res.status(400).send({ message: "O nome do Album não pode ser nulo! "});
        }
        
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// retorna a informacao de todos os albuns sem as musicas
export async function getAllAlbuns(req, res) {
    try {
        const albuns = await albumService.getAllAlbuns();
        res.status(200).send(albuns);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// retorna a informacao de todos os albuns publicos sem as musicas
export async function getAlbuns(req, res) {
    try {
        const albuns = await albumService.getAlbuns();
        res.status(200).send(albuns);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}


// retorna um album, pesquisando pelo seu ID
export async function getAlbumById(req, res) {
    try {
        const albumId = parseInt(req.params.id);
        const album = await albumService.getAlbumById(albumId);
        res.status(200).send(album);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
}

// retorna os albuns existentes por meio da pesquisa pelo nome
export async function getAlbunsByName(req, reply) {
    try {
        const albuns = await albumService.getAlbunsByName(req.params.nome);
        if (albuns.length > 0) {
            reply.status(200).send(albuns);
        } else {
            reply.status(404).send({ error: 'Albuns not found' });
        }
    } catch (error) {
        reply.status(500).send({ error: error.message });
    }
}

// actualiza um certo album
export async function updateAlbum(req, res) {
    try {
        const albumId = parseInt(req.params.id);
        const updatedAlbum = await albumService.updateAlbum(albumId, req.body);
        res.status(202).send(updatedAlbum);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
}

// elimina um certo album
export async function deleteAlbum(req, res) {
    try {
        const albumId = parseInt(req.params.id);
        const result = await albumService.deleteAlbum(albumId);
        res.status(200).send(result);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
}

// retorna todas as musicas de um album
export async function getAlbumMusics(req, res){
    try{
        const album_Id = parseInt(req.params.id);
        const result = await albumService.getAlbumMusics(album_Id);
        res.status(200).send(result);
    }catch (error){
        res.status(404).send({ error: error.message });
    }
}