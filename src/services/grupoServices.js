// src/services/grupoServices.js
import Grupo from '../models/grupo.js';
import UserGrupo from '../models/userGrupo.js';
import GrupoFicheiros from '../models/grupoFicheiro.js';
import { getMusicById } from './musicServices.js';
import { getVideoById } from './videoServices.js';
import { getImageById } from './imageServices.js';
import { sequelize } from '../config/dbConfig.js';

// Criar um grupo (adiciona o Owner nas tabelas Grupo e UserGrupo)
export async function criarGrupo(userOwner, nomeGrupo) {
    // permite mexer em tabelas em simultaneo
    const transaction = await sequelize.transaction();
    try {
        // criar o grupo
        const grupo = await Grupo.create({ userOwner, nomeGrupo }, { transaction });
        // gerar o user_grupo
        await UserGrupo.create({ userId: userOwner, grupoId: grupo.id, isOwner: true, isMembro: true, isEditor: true }, { transaction });
        // realizar as insertions
        await transaction.commit();
        return grupo;
    } catch (error) {
        await transaction.rollback();
        throw new Error(error.message);
    }
}

// Adicionar membro ao grupo (userGrupo) - por default não será owner, mas será membro oficial do grupo
export async function adicionarMembro(grupoId, userId) {
    try {
        const membro = await UserGrupo.create({ userId, grupoId });
        return membro;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Pedir para entrar no grupo (userGrupo) - estado pendente de aceitação
export async function pedirParaEntrar(grupoId, userId) {
    try {
        const pedido = await UserGrupo.create({ userId, grupoId, isMembro: false });
        return pedido;
    } catch (error) {
        throw new Error(error.message);
    }
}

// aceitar pedido para entrar no grupo
export async function aceitarPedido(grupoId, userId) {
    try {
        const pedido = await UserGrupo.update({ isMembro: true }, {
            where: {
                userId,
                grupoId
            }
        });
        return await UserGrupo.findAll({ where: { grupoId } });
    } catch (error) {
        throw new Error(error.message);
    }
}

// recuperar os membros activos do grupo
export async function getMembrosGrupo(grupoId) {
    try {
        const membros = await UserGrupo.findAll({
            where: {
                grupoId,
                isMembro: true
            }
        });
        if (membros)
            return membros;

        return { message: "Grupo sem Membros" };
    } catch (error) {
        throw new Error(error.message);
    }
}

// recuperar pedidos
export async function getPedidos(grupoId) {
    try {
        const membros = await UserGrupo.findAll({
            where: {
                grupoId,
                isMembro: false
            }
        });
        if (membros)
            return membros;

        return { message: "Grupo sem Membros" };
    } catch (error) {
        throw new Error(error.message);
    }
}

// Remover/rejeitar um membro do grupo (userGrupo)
export async function removerMembro(grupoId, userId) {
    try {
        const membro = await UserGrupo.findOne({ where: { grupoId, userId } });
        if (!membro) {
            throw new Error('Membro não encontrado no grupo');
        }
        await membro.destroy();
        return { message: 'Membro removido com sucesso' };
    } catch (error) {
        throw new Error(error.message);
    }
}

// Tornar um membro owner de um grupo (userGrupo)
export async function tornarOwner(grupoId, userId) {
    try {
        const membro = await UserGrupo.findOne({ where: { grupoId, userId } });
        if (!membro) {
            throw new Error('Membro não encontrado no grupo');
        }

        await membro.update({ isOwner: true, isMembro: true, isEditor: true });
        return membro;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Tornar ou Remover o title de editor, de um membro do grupo (userGrupo)
export async function beEditor(grupoId, userId, escolha) {
    try {
        const membro = await UserGrupo.findOne({ where: { grupoId, userId } });
        if (!membro) {
            throw new Error('Membro não encontrado no grupo');
        }
        await membro.update({ isEditor: escolha });
        return membro;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Apagar um grupo (Grupo + referências em userGrupo)
export async function apagarGrupo(grupoId) {
    const transaction = await sequelize.transaction();
    try {
        await UserGrupo.destroy({ where: { grupoId }, transaction });
        await Grupo.destroy({ where: { id: grupoId }, transaction });
        await transaction.commit();
        return { message: 'Grupo eliminado com sucesso' };
    } catch (error) {
        await transaction.rollback();
        throw new Error(error.message);
    }
}

// partilha de ficheiros com um grupo
export async function partilharFicheiro(fileData) {
    /*fileData[
        Id do Grupo
        Type Of Media (music, video, image)
        Id do media
    ]*/
    try {
        const partilha = await GrupoFicheiros.create(fileData);
        return partilha;
    } catch (error) {
        throw new Error(error.message);
    }
}

// new functions

// recuperar todas as musicas partilhadas num grupo
export async function getSharedMusics(groupId) {
    try {
        // procurar na tabela de partilhas
        const sharedMusics = await GrupoFicheiros.findAll({
            where: {
                mediaType: 'music',
                grupoId: groupId
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

// recuperar todos os videos partilhados num grupo
export async function getSharedVideos(groupId) {
    try {
        // procurar na tabela de partilhas
        const sharedVideos = await GrupoFicheiros.findAll({
            where: {
                mediaType: 'video',
                grupoId: groupId
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

// recuperar todas as imagens partilhadas num grupo
export async function getSharedImages(groupId) {
    try {
        // procurar na tabela de partilhas
        const sharedImages = await GrupoFicheiros.findAll({
            where: {
                mediaType: 'image',
                grupoId: groupId
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
export async function desfazerPartilha(mediaType, mediaId, grupoId) {
    try {
        // eliminar o registo de partilha de ficheiro
        const res = await GrupoFicheiros.destroy({
            where: {
                mediaType,
                mediaId,
                grupoId
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