// src/services/artistaServices.js
import Artista from '../models/artista.js';
import Musica from '../models/music.js';
import Album from '../models/album.js';
import { Op } from 'sequelize';

// criar um novo artista
export async function createArtista(artistaData) {
    try {
        const artista = await Artista.create(artistaData);
        return artista;
    } catch (error) {
        throw new Error(error.message);
    }
}

// recuperar todos os artistas
export async function getAllArtistas() {
    try {
        const artistas = await Artista.findAll();
        return artistas;
    } catch (error) {
        throw new Error(error.message);
    }
}

// recuperar um artista pelo ID
export async function getArtistaById(artistaId) {
    try {
        const artista = await Artista.findByPk(artistaId);
        if (!artista) {
            throw new Error('Artista not found');
        }
        return artista;
    } catch (error) {
        throw new Error(error.message);
    }
}

// recuperar um artista pelo nome
export async function getArtistasByName(nome) {
    try {
        const artistas = await Artista.findAll({
            where: {
                nome: {
                    [Op.like]: `%${nome}%`
                }
            }
        });
        return artistas;
    } catch (error) {
        throw new Error(error.message);
    }
}

// actualizar um artista 
export async function updateArtista(artistaId, artistaData) {
    try {
        const [updatedRows] = await Artista.update(artistaData, { where: { id: artistaId } });
        if (updatedRows === 0) {
            throw new Error('Artista not found');
        }
        const updatedArtista = await Artista.findByPk(artistaId);
        return updatedArtista;
    } catch (error) {
        throw new Error(error.message);
    }
}

// eliminar um artista pelo ID
export async function deleteArtista(artista_Id) {
    try {
        // eliminar as musicas deste artista
        const musicas = await Musica.destroy({ where: { artistaId : artista_Id }});
        if(musicas > 0){
            console.log("Musics deleted successfuly");
        }
        // eliminar os albuns deste artista
        const albuns = await Album.destroy({ where: { artistaId: artista_Id }});
        if(albuns > 0){
            console.log("Albuns deleted successfuly");
        }
        // eliminar o artista
        const deletedRows = await Artista.destroy({ where: { id: artista_Id } });
        if (deletedRows === 0) {
            throw new Error('Artista not found');
        }
        return { message: 'Artista deleted successfully' };
    } catch (error) {
        throw new Error(error.message);
    }
}
