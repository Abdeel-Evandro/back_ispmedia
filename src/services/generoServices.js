// src/services/generoServices.js
import Genero from '../models/genero.js';
import Musica from '../models/music.js';
import { Op } from 'sequelize';

// criar um novo genero musical
export async function createGenero(generoData) {
    try {
        const genero = await Genero.create(generoData);
        return genero;
    } catch (error) {
        throw new Error(error.message);
    }
}

// recuperar todos os generos musicais
export async function getAllGeneros() {
    try {
        const generos = await Genero.findAll();
        return generos;
    } catch (error) {
        throw new Error(error.message);
    }
}

// recuperar um genero pelo ID
export async function getGeneroById(generoId) {
    try {
        const genero = await Genero.findByPk(generoId);
        if (!genero) {
            throw new Error('Genero not found');
        }
        return genero;
    } catch (error) {
        throw new Error(error.message);
    }
}

// recuperar um genero pelo nome
export async function getGenerosByName(nome) {
    try {
        const generos = await Genero.findAll({
            where: {
                nome: {
                    [Op.like]: `%${nome}%`
                }
            }
        });
        return generos;
    } catch (error) {
        throw new Error(error.message);
    }
}

// actualizar um genero 
export async function updateGenero(generoId, generoData) {
    try {
        const [updatedRows] = await Genero.update(generoData, { where: { id: generoId } });
        if (updatedRows === 0) {
            throw new Error('Genero not found');
        }
        const updatedGenero = await Genero.findByPk(generoId);
        return updatedGenero;
    } catch (error) {
        throw new Error(error.message);
    }
}

// eliminar um genero pelo ID
export async function deleteGenero(genero_Id) {
    try {
        // eliminar as musicas deste genero
        const musicas = await Musica.destroy({ where: { generoId : genero_Id }});
        if(musicas > 0){
            console.log("Musics deleted successfuly");
        }
        const deletedRows = await Genero.destroy({ where: { id: genero_Id } });
        if (deletedRows === 0) {
            throw new Error('Genero not found');
        }
        return { message: 'Genero deleted successfully' };
    } catch (error) {
        throw new Error(error.message);
    }
}
