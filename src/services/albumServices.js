//src/services/albumServices.js
import Album from '../models/album.js';
import Music from '../models/music.js';
import Critica from '../models/critica.js';

import { Op } from 'sequelize';

// criação de um novo album
export async function createAlbum(albumData) {
    try {
        const album = await Album.create(albumData);
        return album;
    } catch (error) {
        throw new Error(error.message);
    }
}

// recuperar todos os albuns - for admin
export async function getAllAlbuns() {
    try {
        const albuns = await Album.findAll();
        return albuns;
    } catch (error) {
        throw new Error(error.message);
    }
}

// recuperar todos os albuns publicos - for clientes
export async function getAlbuns(){
    try{
        const albuns = await Album.findAll({
            where:{
                public:true
            }
        })
    }catch(error){
        throw new Error(error.message);
    }
}

// recuperar um album pelo ID
export async function getAlbumById(albumId) {
    try {
        const album = await Album.findByPk(albumId);
        if (!album) {
            throw new Error('Album not found');
        }
        return album;
    } catch (error) {
        throw new Error(error.message);
    }
}

// recuperar um album pelo nome
export async function getAlbunsByName(nome) {
    try {
        const albuns = await Album.findAll({
            where: {
                nome: {
                    [Op.like]: `%${nome}%`
                }
            }
        });
        return albuns;
    } catch (error) {
        throw new Error(error.message);
    }
}

// actualizar um album
export async function updateAlbum(albumId, albumData) {
    try {
        const [updatedRows] = await Album.update(albumData, { where: { id: albumId } });
        if (updatedRows === 0) {
            throw new Error('Album not found');
        }
        const updatedAlbum = await Album.findByPk(albumId);
        return updatedAlbum;
    } catch (error) {
        throw new Error(error.message);
    }
}

// eliminar um album
export async function deleteAlbum(albumId) {
    try {
        // supondo que o album exista ou que a function getAlbumByPK foi usada primeiro
        // vamos eliminar todas as musicas que estao associadas a este album
        const musics = await Music.destroy({ where: {albumId : albumId } });
        if(musics === 0){
            throw new Error('Album empty');
        }

        // eliminar todas as criticas relacionadas a esse album
        const criticas = await Critica.destroy({ where: { albumId: albumId } });
        if(criticas === 0){
            console.log("Album sem criticas");
        }
        // eliminar as informacoes do album na tabela Album
        const deletedRows = await Album.destroy({ where: { id: albumId } });
        if (deletedRows === 0) {
            throw new Error('Album not found');
        }
        return { message: 'Album deleted successfully' };
    } catch (error) {
        throw new Error(error.message);
    }
}

// recuperar todas as musicas pertences a um album
export async function getAlbumMusics(album_Id){
    try {
        // supondo que o album exista ou que a function getAlbumByPK foi usada primeiro
        const musics = await Music.findAll({ where: { albumId : album_Id } });
        return musics;
    }catch(error){
        return {message: 'Album empty or not found'};
    }
}