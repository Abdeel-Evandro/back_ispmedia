// src/controller/generoController.js
import * as generoService from '../services/generoServices.js';

// criar um novo genero
export async function createGenero(req, res) {
    try {
        if(req.body.nome.trim().length > 0){
            const genero = await generoService.createGenero(req.body);
            res.status(201).send(genero);  
        }else{
            res.status(400).send({ message: "O nome do Género não pode ser nulo! "});
        }
        res.status(201).send(genero);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// recuperar todos os generos
export async function getAllGeneros(req, res) {
    try {
        const generos = await generoService.getAllGeneros();
        res.status(200).send(generos);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// recuperar um genero pelo ID
export async function getGeneroById(req, res) {
    try {
        const generoId = parseInt(req.params.id);
        const genero = await generoService.getGeneroById(generoId);
        res.status(200).send(genero);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
}

// recuperar um genero pelo nome
export async function getGenerosByName(req, res) {
    try {
        const generos = await generoService.getGenerosByName(req.params.nome);
        if (generos.length > 0) {
            res.status(200).send(generos);
        } else {
            res.status(404).send({ error: 'Genero not found' });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// actualizar um genero
export async function updateGenero(req, res) {
    try {
        const generoId = parseInt(req.params.id);
        const updatedGenero = await generoService.updateGenero(generoId, req.body);
        res.status(202).send(updatedGenero);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
}

// eliminar um genero
export async function deleteGenero(req, res) {
    try {
        const generoId = parseInt(req.params.id);
        const result = await generoService.deleteGenero(generoId);
        res.status(200).send(result);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
}
