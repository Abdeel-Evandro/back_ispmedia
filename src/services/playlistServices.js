import Playlist from '../models/playlist.js';

// Cria uma nova playlist
export const createPlaylist = async (nome, userId) => {
  try {
    const playlist = await Playlist.create({ nome, userId });
    return playlist;
  } catch (error) {
    throw new Error('Não foi possível criar a playlist');
  }
};

// Adiciona uma música a uma playlist existente
export const addMusicToPlaylist = async (playlistId, musicId) => {
  try {
    const playlist = await Playlist.findByPk(playlistId);
    if (!playlist) {
      throw new Error('Playlist não encontrada');
    }
    await playlist.addMusic(musicId);
  } catch (error) {
    throw new Error('Não foi possível adicionar a música à playlist');
  }
};

// Remove uma música de uma playlist existente
export const removeMusicFromPlaylist = async (playlistId, musicId) => {
  try {
    const playlist = await Playlist.findByPk(playlistId);
    if (!playlist) {
      throw new Error('Playlist não encontrada');
    }
    await playlist.removeMusic(musicId);
  } catch (error) {
    throw new Error('Não foi possível remover a música da playlist');
  }
};

// Remove todas as músicas de uma playlist existente
export const removeAllMusicFromPlaylist = async (playlistId) => {
  try {
    const playlist = await Playlist.findByPk(playlistId);
    if (!playlist) {
      throw new Error('Playlist não encontrada');
    }
    await playlist.setMusics([]); // Remove todas as associações de músicas
  } catch (error) {
    throw new Error('Não foi possível remover todas as músicas da playlist');
  }
};

// Remove uma playlist existente
export const deletePlaylist = async (playlistId) => {
  try {
    const playlist = await Playlist.findByPk(playlistId);
    if (!playlist) {
      throw new Error('Playlist não encontrada');
    }
    await playlist.destroy();
  } catch (error) {
    throw new Error('Não foi possível excluir a playlist');
  }
};

// Busca uma playlist pelo ID
export const getPlaylistById = async (playlistId) => {
  try {
    const playlist = await Playlist.findByPk(playlistId);
    if (!playlist) {
      throw new Error('Playlist não encontrada');
    }
    return playlist;
  } catch (error) {
    throw new Error('Não foi possível buscar a playlist');
  }
};

// Recupera todas as músicas de uma playlist
export const getAllMusicFromPlaylist = async (playlistId) => {
    try {
      const playlist = await Playlist.findByPk(playlistId, { include: 'musics' });
      if (!playlist) {
        throw new Error('Playlist não encontrada');
      }
      return playlist.musics;
    } catch (error) {
      throw new Error('Não foi possível recuperar as músicas da playlist');
    }
  };
  
