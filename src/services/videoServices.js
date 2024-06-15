// src/services/videoServices.js
import Video from '../models/video.js'
import { getAlbumById } from './albumServices.js';

// criação de um novo registo de video
export async function createVideo(videoData) {
    try {
        // verificar se possui um algum
        if(videoData.albumId != null){
            // recuperar o album
            const album = await getAlbumById(videoData.albumId);
            // verificar se o album é public or private
            if(!album.public)
                videoData.public = false;
            const video = await Video.create(videoData);
            return video;
        }
        
    } catch (error) {
        throw new Error(error.message);
    }
}

// recuperar todos os videos
export async function getAllVideos() {
    try {
        const videos = await Video.findAll();
        return videos;
    } catch (error) {
        throw new Error(error.message);
    }
}

// recuperar um video pelo ID
export async function getVideoById(videoId) {
    try {
        const video = await Video.findByPk(videoId);
        if (!video) {
            throw new Error('Video not found');
        }
        return video;
    } catch (error) {
        throw new Error(error.message);
    }
}

// recuperar um video pelo título
export async function getVideoByTitle(titulo) {
    try {
        const videos = await Video.findAll({
            where: {
                nome_ficheiro: {
                    [Op.like]: `%${titulo}%`
                }
            }
        });
        return videos;
    } catch (error) {
        throw new Error(error.message);
    }
}

// actualizar as informações de um video
export async function updateVideo(videoID, videoData) {
    
    // Verificação da existência do video 
    const video = await this.getVideoById(videoID);
    if (!video) {
        throw new Error('Video not found');
    }
    // actualizar as informações do video encontrado
    try {
        const [updatedRows] = await Video.update(videoData, { where: { id: videoID } });
        if (updatedRows === 0) {
            throw new Error('Video not found');
        }
        const updatedVideo = await Video.findByPk(videoID);
        return updatedVideo;
    } catch (error) {
        throw new Error(error.message);
    }
}

// eliminar um video
export async function deleteVideo(videoID) {
    try {
        const deletedRows = await Video.destroy({ where: { id: videoID } });
        if (deletedRows === 0) {
            throw new Error('Video not found');
        }
        return { message: 'Video deleted successfully' };
    } catch (error) {
        throw new Error(error.message);
    }
}



