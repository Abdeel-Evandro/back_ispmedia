//src/services/albumServices.js
import Album from '../models/album.js';
import Critica from '../models/critica.js';
import { Op } from 'sequelize';

// criação de uma nova Critica
export async function adicionarCritica(criticaData) {
    try {
        const critica = await Critica.create(criticaData);
        return critica;
    } catch (error) {
        throw new Error(error.message);
    }
}

// recuperar todas as criticas
export async function getAllCriticas() {
    try {
        const criticas = await Critica.findAll();
        return criticas;
    } catch (error) {
        throw new Error(error.message);
    }
}

// recuperar uma critica pelo ID
export async function getCriticaById(criticaID) {
    try {
        const critica = await Critica.findByPk(criticaID);
        if (!critica) {
            throw new Error('Critica not found');
        }
        return critica;
    } catch (error) {
        throw new Error(error.message);
    }
}


// alterar uma critica/ comentario
export async function updateCritica(criticaID, criticaData) {
    try {
        const [updatedRows] = await Critica.update(criticaData, { where: { idC: criticaID } });
        if (updatedRows === 0) {
            throw new Error('Comentario/Critica not found');
        }
        const novaCritica = await Critica.findByPk(criticaID);
        return novaCritica;
    } catch (error) {
        throw new Error(error.message);
    }
}

// eliminar todas as criticas de um album
export async function deleteAllAlbumCriticas(albumId) {
    try {
        // eliminar todas as criticas de um album 
        const deletedRows = await Critica.destroy({ where: { albumId: albumId } });
        if (deletedRows === 0) {
            throw new Error('Album sem criticas!');
        }
        return { message: 'Criticas eliminadas com sucesso' };
    } catch (error) {
        throw new Error(error.message);
    }
}

// eliminar todas as criticas de um user
export async function deleteAllUserCriticas(userId) {
    try {
        // eliminar todas as criticas de um user 
        const deletedRows = await Critica.destroy({ where: { userId: userId } });
        if (deletedRows === 0) {
            throw new Error('Album sem criticas!');
        }
        return { message: 'Criticas eliminadas com sucesso' };
    } catch (error) {
        throw new Error(error.message);
    }
}


// eliminar uma critica de um album
export async function deleteCritica(criticaId, albumId) {
    try {
        // eliminar todas as criticas de um album 
        const deletedRows = await Critica.destroy({ where: { albumId: albumId } && { idC: criticaId} });
        if (deletedRows === 0) {
            throw new Error('Album sem criticas!');
        }
        return { message: 'Critica eliminada com sucesso' };
    } catch (error) {
        throw new Error(error.message);
    }
}

// recuperar todas as criticas pertences a um album
export async function getAlbumCriticas(album_Id){
    try {
        // supondo que o album exista ou que a function getAlbumByPK foi usada primeiro
        const musics = await Critica.findAll({ where: { albumId : album_Id } });
        return musics;
    }catch(error){
        return {message: 'Album sem criticas ou inexistente'};
    }
}