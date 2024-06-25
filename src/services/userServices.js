//services/userService.js
import User from '../models/user.js'
import Imagem from '../models/image.js'
import Video from '../models/video.js'
import Music from '../models/music.js'
import Critica from '../models/critica.js'
import Playlist from '../models/playlist.js'
import UserGrupo from '../models/userGrupo.js'
import PartilharFicheiro from '../models/partilharFicheiro.js'

import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';
import { Op, where } from 'sequelize';

// criar um novo usuário
export async function createUser(userData) {
  return await User.create(userData);
}

// recuperar todos os usuários
export async function getAllUsers() {
  return await User.findAll();
}

// recuperar um usuário pelo ID
export async function getUserById(id) {
  return await User.findByPk(id);
}

// recuperar um user pelo nome (username)
export async function getUserByUsername(username) {
  try {
    const users = await User.findAll({
      where: {
        username: {
          [Op.like]: `%${username}%`
        }
      }
    });
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
}

// actualizar os dados de um usuário
export async function updateUser(id, userData) {
  const [updated] = await User.update(userData, { where: { id } });
  if (updated) {
    return await User.findByPk(id);
  }
  return null;
}

// eliminar um usuário pelo ID
export async function deleteUser(id) {
  // procurar pelo user
  const user = await User.findByPk(id);
  if (user) {
    // eliminar as suas ocorrencias
    // imagens
    const imagens = await Imagem.destroy({ where: { user_Id: id } });
    if (imagens > 0) {
      console.log("Imagens eliminadas com sucesso!");
    } else {
      console.log("Nenhuma imagem foi encontrada!");
    }
    // videos
    const videos = await Video.destroy({ where: { user_Id: id } });
    if (videos > 0) {
      console.log("Videos eliminados com sucesso!");
    } else {
      console.log("Nenhum video foi encontrado!");
    }
    // musicas
    const musicas = await Music.destroy({ where: { userId: id } });
    if (musicas > 0) {
      console.log("Musicas eliminadas com sucesso!");
    } else {
      console.log("Nenhuma musica foi encontrada");
    }
    // criticas
    const criticas = await Critica.destroy({ where: { userId: id } });
    if (criticas > 0) {
      console.log("Criticas eliminadas com sucesso!");
    } else {
      console.log("Nenhuma critica foi encontrada");
    }
    // ficheiros partilhados consigo e por ele
    const sharedFiles = await PartilharFicheiro.destroy({ where: { userOwner: id } || { userDest: id } });
    if (sharedFiles > 0) {
      console.log("Ficheiros removidos com sucesso");
    } else {
      console.log("Sem ficheiros partilhados");
    }
    // remover ele dos grupos
    const grupos = await UserGrupo.destroy({ where: { userId: id } });
    if (grupos > 0) {
      console.log("User removido de todos os grupos com sucesso");
    } else {
      console.log("Sem grupos por remover");
    }
    // eliminar as suas playlists
    const playlists = await Playlist.destroy({ where: { userId: id } });
    if (playlists > 0) {
      console.log("Playlists eliminadas com sucesso");
    } else {
      console.log("Sem playlists por remover");
    }
    // eliminar os seus ficheiros
    try {
      await deleteUserDirectories(user.username);
      console.log("Ficheiros eliminados do servidor com sucesso");
    } catch (Error) {
      console.log("Nenhum registo foi encontrado");
    }
    // eliminar o user
    await user.destroy();
    return true;
  }
  return false;
}


// Criar diretórios (imagens, músicas e vídeos) para o usuário
export async function createUserDirectories(username) {
  const baseDir = path.resolve('content', 'users', username);

  // gerando o path content/users/musics
  const musicDir = path.join(baseDir, 'musics');
  // gerando o path content/users/videos
  const videoDir = path.join(baseDir, 'videos');
  const imageDir = path.join(baseDir, 'images');

  await fs.promises.mkdir(musicDir, { recursive: true });
  await fs.promises.mkdir(videoDir, { recursive: true });
  await fs.promises.mkdir(imageDir, { recursive: true });

}

// Eliminar todos os diretórios correlacionados ao usuário
export async function deleteUserDirectories(username) {
  const baseDir = path.resolve('content', 'users', username);

  await fs.promises.rmdir(baseDir, { recursive: true });
}

// Alterar o nome do directorio user
export async function updateUserDirectories(oldUsername, newUsername) {
  const oldDir = path.resolve('content', 'users', oldUsername);
  const newDir = path.resolve('content', 'users', newUsername);

  try {
    await fs.promises.rename(oldDir, newDir);
  } catch (error) {
    console.error('Erro ao actualizar o nome do directorio. ', error);
    throw error;
  }
}

// Verificação de login
export async function login(username, password) {
  // pesquisar pelo nome do usuário
  try {
    const user = await User.findOne({ where: { username } });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid)
        return user;
    }
    return null;
  } catch (error) {
    console.log("Erro ao realizar o login: ", error);
    throw new Error('Erro no servidor');
  }
}

// Atribuir privilégio a um user -> editor
export async function beEditor(id, escolha) {
  try {
    // Atualizar o campo editor do usuário
    const result = await User.update(
      { editor: escolha },
      { where: { id } }
    );

    if (result[0] === 0) {
      throw new Error('Usuário não encontrado ou não foi possível atualizar.');
    }
    console.log("Usuário atualizado com sucesso.");
    return await User.findByPk(id);
  } catch (error) {
    console.log("Erro ao tentar localizar o usuário e torná-lo editor: ", error);
    throw new Error('Erro no servidor');
  }
}
