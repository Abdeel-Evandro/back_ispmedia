// src/controllers/videoController.js
import * as videoService from '../services/videoServices.js';

// registar o novo registo de um video
export async function createVideo(req, res) {
    try {
        const video = await videoService.createVideo(req.body);
        res.status(201).send(video);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// recuperar todas os videos da BD
export async function getAllVideos(req, res) {
    try {
        const videos = await videoService.getAllVideos();
        res.status(200).send(videos);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// recuperar um video pelo ID
export async function getVideoById(req, res) {
    try {
        const videoID = parseInt(req.params.id);
        const video = await videoService.getVideoById(videoID);
        res.status(200).send(video);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
}

// recuperar video(s) pelo título
export async function getVideoByTitle(req, reply) {
    try {
        const videos = await videoService.getVideoByTitle(req.params.title);
        if (videos.length > 0) {
            reply.status(200).send(videos);
        } else {
            reply.status(404).send({ error: 'Video not found' });
        }
    } catch (error) {
        reply.status(500).send({ error: error.message });
    }
}

// actualizar as informações de um video
export async function updateVideo(req, res) {
    try {
        const videoId = parseInt(req.params.id);
        const updatedVideo = await videoService.updateVideo(videoId, req.body);
        res.status(202).send(updatedVideo);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
}

// eliminar um video
export async function deleteVideo(req, res) {
    try {
        const videoId = parseInt(req.params.id);
        const result = await videoService.deleteVideo(videoId);
        res.status(200).send(result);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
}
