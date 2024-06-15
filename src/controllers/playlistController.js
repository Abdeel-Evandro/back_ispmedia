import * as playlistServices from '../services/playlistServices.js';

// Cria uma nova playlist
export const createPlaylist = async (request, reply) => {
  const { nome, userId } = request.body;
  try {
    const playlist = await playlistServices.createPlaylist(nome, userId);
    reply.code(201).send(playlist);
  } catch (error) {
    reply.code(500).send(error.message);
  }
};

// Adiciona uma música a uma playlist existente
export const addMusicToPlaylist = async (request, reply) => {
  const { playlistId, musicId } = request.body;
  try {
    await playlistServices.addMusicToPlaylist(playlistId, musicId);
    reply.code(200).send({ message: 'Música adicionada à playlist' });
  } catch (error) {
    reply.code(500).send(error.message);
  }
};

// Remove uma música de uma playlist existente
export const removeMusicFromPlaylist = async (request, reply) => {
  const { playlistId, musicId } = request.body;
  try {
    await playlistServices.removeMusicFromPlaylist(playlistId, musicId);
    reply.code(200).send({ message: 'Música removida da playlist' });
  } catch (error) {
    reply.code(500).send(error.message);
  }
};

// Remove todas as músicas de uma playlist existente
export const removeAllMusicFromPlaylist = async (request, reply) => {
  const { playlistId } = request.params;
  try {
    await playlistServices.removeAllMusicFromPlaylist(playlistId);
    reply.code(200).send({ message: 'Todas as músicas foram removidas da playlist' });
  } catch (error) {
    reply.code(500).send(error.message);
  }
};

// Remove uma playlist existente
export const deletePlaylist = async (request, reply) => {
  const { playlistId } = request.params;
  try {
    await playlistServices.deletePlaylist(playlistId);
    reply.code(200).send({ message: 'Playlist excluída com sucesso' });
  } catch (error) {
    reply.code(500).send(error.message);
  }
};

// Busca uma playlist pelo ID
export const getPlaylist = async (request, reply) => {
  const { playlistId } = request.params;
  try {
    const playlist = await playlistServices.getPlaylistById(playlistId);
    reply.code(200).send(playlist);
  } catch (error) {
    reply.code(500).send(error.message);
  }
};

// Recupera todas as músicas de uma playlist
export const getAllMusicFromPlaylist = async (request, reply) => {
    const { playlistId } = request.params;
    try {
      const musicas = await playlistServices.getAllMusicFromPlaylist(playlistId);
      reply.code(200).send(musicas);
    } catch (error) {
      reply.code(500).send(error.message);
    }
  };
  