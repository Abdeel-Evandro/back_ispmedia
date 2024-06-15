import * as playlistController from '../controllers/playlistController.js';

export default async function (fastify, options) {
  // Rota para criar uma nova playlist
  fastify.post('/playlists', playlistController.createPlaylist);

  // Rota para adicionar uma música a uma playlist 
  fastify.post('/playlists/:playlistId/musics', playlistController.addMusicToPlaylist);

  // Rota para remover uma música de uma playlist 
  fastify.delete('/playlists/:playlistId/musics/:musicId', playlistController.removeMusicFromPlaylist);

  // Rota para remover todas as músicas de uma playlist 
  fastify.delete('/playlists/:playlistId/musics', playlistController.removeAllMusicFromPlaylist);

  // Rota para remover uma playlist 
  fastify.delete('/playlists/:playlistId', playlistController.deletePlaylist);

  // Rota para buscar uma playlist pelo ID
  fastify.get('/playlists/:playlistId', playlistController.getPlaylist);

  // Rota para recuperar todas as músicas de uma playlist
  fastify.get('/playlists/:playlistId/musics', playlistController.getAllMusicFromPlaylist);

}