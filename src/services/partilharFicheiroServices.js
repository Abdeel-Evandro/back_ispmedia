// src/services/partilharFicheiroServices.js
import PartilharFicheiro from '../models/partilharFicheiro.js';
//import Musica from '../models/music.js';
import { getMusicById } from './musicServices.js';
import { getVideoById } from './videoServices.js';
import { getImageById } from './imageServices.js';

// partilhar ficheiro
export async function partilharFicheiro(fileData) {
    try {
        /*fileData
            Id do userOwner
            Id do userDestinatario
            typeOfMidia (music, video, image)
            Id do midia
        */
        const sharedFile = await PartilharFicheiro.create(fileData);
        return sharedFile;
    } catch (error) {
        throw new Error(error.message);
    }
}

// recuperar todas as musicas partilhadas comigo
export async function getSharedMusics(userId) {
    try {
        // procurar na tabela de partilhas
        const sharedMusics = await PartilharFicheiro.findAll({
            where: {
                mediaType: 'music',
                userDest: userId
            }
        });
        // musicas
        const musicas = [];
        // recuperar a partir da tabela de musicas
        for (const musica of sharedMusics) {
            const musicaPartilhada = await getMusicById(musica.mediaId);
            musicas.push(musicaPartilhada);
        }
        return musicas;
    } catch (error) {
        throw new Error(error.message);
    }
}

// recuperar todos os videos partilhados comigo
export async function getSharedVideos(userId) {
    try {
        // procurar na tabela de partilhas
        const sharedVideos = await PartilharFicheiro.findAll({
            where: {
                mediaType: 'video',
                userDest: userId
            }
        });
        // videos
        const videos = [];
        // recuperar a partir da tabela de videos
        for (const video of sharedVideos) {
            const videoPartilhado = await getVideoById(video.mediaId);
            videos.push(videoPartilhado);
        }
        return videos;
    } catch (error) {
        throw new Error(error.message);
    }
}

// recuperar todas as imagens partilhadas comigo
export async function getSharedImages(userId) {
    try {
        // procurar na tabela de partilhas
        const sharedImages = await PartilharFicheiro.findAll({
            where: {
                mediaType: 'image',
                userDest: userId
            }
        });
        // imagens
        const imagens = [];
        // recuperar a partir da tabela de musicas
        for (const imagem of sharedImages) {
            const imagemPartilhada = await getImageById(imagem.mediaId);
            imagens.push(imagemPartilhada);
        }
        return imagens;
    } catch (error) {
        throw new Error(error.message);
    }
}

// deixar de partilhar um ficheiro
export async function desfazerPartilha(mediaType, mediaId, userDest) {
    try {
        // eliminar o registo de partilha de ficheiro
        const res = await PartilharFicheiro.destroy({
            where: {
                mediaType,
                mediaId,
                userDest
            }
        });
        if (res > 0) {
            console.log("Partilha desfeita com sucesso");
        }
        return { message: 'Partilha desfeita com sucesso' };
    } catch (error) {
        throw new Error(error.message);
    }
}