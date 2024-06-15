// src/controllers/musicController.js
import * as musicService from '../services/musicServices.js';

// registar o novo registo de uma música
export async function createMusic(req, res) {
    try {
        if(req.body.titulo.trim().length > 0){
            const music = await musicService.createMusic(req.body);
            res.status(201).send(music);
        }else{
            res.status(400).send({ message: "O título da Música não pode ser nulo! "});
        }
        res.status(201).send(music);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// recuperar todas as músicas da BD
export async function getAllMusics(req, res) {
    try {
        const musics = await musicService.getAllMusics();
        res.status(200).send(musics);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// recuperar uma música pelo ID
export async function getMusicById(req, res) {
    try {
        const musicID = parseInt(req.params.id);
        const music = await musicService.getMusicById(musicID);
        res.status(200).send(music);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
}

// recuperar música(s) pelo título
export async function getMusicByTitle(req, reply) {
    try {
        const musics = await musicService.getMusicByTitle(req.params.title);
        if (musics.length > 0) {
            reply.status(200).send(musics);
        } else {
            reply.status(404).send({ error: 'Musics not found' });
        }
    } catch (error) {
        reply.status(500).send({ error: error.message });
    }
}

// actualizar as informações de uma música
export async function updateMusic(req, res) {
    try {
        const musicId = parseInt(req.params.id);
        const updatedMusic = await musicService.updateMusic(musicId, req.body);
        res.status(202).send(updatedMusic);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
}

// eliminar uma música
export async function deleteMusic(req, res) {
    try {
        const musicId = parseInt(req.params.id);
        const result = await musicService.deleteMusic(musicId);
        res.status(200).send(result);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
}

// realizar upload de uma música
export async function uploadFile(req, res) {
    try {
        const url = await musicService.uploadFile(req.body);
        res.status(201).send(url);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// pesquisar musicas pelo genero
export async function getMusicByGenero(req, res){
    try{
        const genero = req.params.genero;
        const result = await musicService.getMusicByGenero(genero);
        res.status(200).send(result);
    }catch(error){
        res.status(404).send({ error: error.message });
    }
}