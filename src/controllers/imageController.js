// src/controllers/imageController.js
import * as imageService from '../services/imageServices.js';

// registar o novo registo de uma imagem
export async function createImage(req, res) {
    try {
        const imagem = await imageService.createImage(req.body);
        res.status(201).send(imagem);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// recuperar todas as imagens da BD
export async function getAllImages(req, res) {
    try {
        const imagens = await imageService.getAllImages();
        res.status(200).send(imagens);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// recuperar uma imagem pelo ID
export async function getImageById(req, res) {
    try {
        const imageId = parseInt(req.params.id);
        const imagem = await imageService.getImageById(imageId);
        res.status(200).send(imagem);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
}

// recuperar image(s) pelo título
export async function getImageByTitle(req, reply) {
    try {
        const images = await imageService.getImageByTitle(req.params.title);
        if (images.length > 0) {
            reply.status(200).send(images);
        } else {
            reply.status(404).send({ error: 'Image not found' });
        }
    } catch (error) {
        reply.status(500).send({ error: error.message });
    }
}

// actualizar as informações de uma imagem
export async function updateImage(req, res) {
    try {
        const imageId = parseInt(req.params.id);
        const updatedImage = await imageService.updateImage(imageId, req.body);
        res.status(202).send(updatedImage);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
}

// eliminar uma imagem
export async function deleteImage(req, res) {
    try {
        const imageId = parseInt(req.params.id);
        const result = await imageService.deleteImage(imageId);
        res.status(200).send(result);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
}

// recuperar todas as imagens de um user
export async function getUserImages(req, res){
    try{
        const userId = parseInt(req.params.id);
        const results = await imageService.getUserImages(userId);
        res.status(200).send(results);
    }catch(error){
        res.status(404).send({ error: error.message });
    }
}