// src/services/imageServices.js
import Image from '../models/image.js'
import fs from 'fs';
import path from 'path';

// criação de um novo registo de Imagem
export async function createImage(imageData) {
    try {
        const imagem = await Image.create(imageData);
        return imagem;
    } catch (error) {
        throw new Error(error.message);
    }
}

// recuperar todas as imagens da BD
export async function getAllImages() {
    try {
        return await Image.findAll();
    } catch (error) {
        throw new Error(error.message);
    }
}


// recuperar todas as imagens de um user
export async function getUserImages(userId){
    try{
        const imagens = await Image.findAll({
            where: {user_Id: userId}
        })
        return imagens;
    }catch(error){
        throw new Error("Image not found");
    }
}

// recuperar uma imagem pelo ID
export async function getImageById(imageId) {
    try {
        const imagem = await Image.findByPk(imageId);
        if (!imagem) {
            throw new Error('Image not found');
        }
        return imagem;
    } catch (error) {
        throw new Error(error.message);
    }
}

// recuperar uma imagem pelo título
export async function getImageByTitle(titulo) {
    try {
        const imagens = await Image.findAll({
            where: {
                nome_ficheiro: {
                    [Op.like]: `%${titulo}%`
                }
            }
        });
        return imagens;
    } catch (error) {
        throw new Error(error.message);
    }
}

// actualizar as informações de uma imagem
export async function updateImage(imageID, imageData) {
    
    // Verificação da existência da imagem 
    const imagem = await this.getImageById(imageID);
    if (!imagem) {
        throw new Error('Image not found');
    }
    // actualizar as informações da imagem encontrada
    try {
        const [updatedRows] = await Image.update(imageData, { where: { id: imageID } });
        if (updatedRows === 0) {
            throw new Error('Image not found');
        }
        const updatedImage = await Image.findByPk(imageID);
        return updatedImage;
    } catch (error) {
        throw new Error(error.message);
    }
}

// eliminar uma imagem
export async function deleteImage(imageID) {
    try {
        // eliminar a imagem
        const deletedRows = await Image.destroy({ where: { id: imageID } });
        if (deletedRows === 0) {
            throw new Error('Image not found');
        }
        return { message: 'Image deleted successfully' };
    } catch (error) {
        throw new Error(error.message);
    }
}



