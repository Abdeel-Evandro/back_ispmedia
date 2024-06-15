import path from 'path';
import fs from 'fs';
import mime from 'mime-types';

// upload de um video
export async function uploadVideo(req, reply) {
  if (!req.file) {
    reply.status(400).send({ error: 'No video uploaded' });
    return;
  }

  // alterar os parâmetros de retorno
  const path = `content/users/${req.params.username}/videos/${req.file.filename}`;
  const extensao = req.file.mimetype.split('/')[1];

  reply.send({
    filename: req.file.filename,
    path: path,
    mimetype: extensao
  });
}

// upload de uma imagem
export async function uploadImage(req, reply) {
  if (!req.file) {
    reply.status(400).send({ error: 'No image uploaded' });
    return;
  }
  // alterar os parâmetros de retorno
  const path = `content/users/${req.params.username}/images/${req.file.filename}`;
  const extensao = req.file.mimetype.split('/')[1];

  reply.send({
    filename: req.file.filename,
    path: path,
    mimetype: extensao
  });
}

// upload de uma musica
export async function uploadMusic(req, reply) {
  if (!req.file) {
    reply.status(400).send({ error: 'No music uploaded' });
    return;
  }
  // alterar os parâmetros de retorno
  const path = `content/users/${req.params.username}/musics/${req.file.filename}`;
  const extensao = req.file.mimetype.split('/')[1];

  reply.send({
    filename: req.file.filename,
    path: path,
    mimetype: extensao
  });
}

// Renderizar uma imagem
export async function getImage(req, reply) {
  const username = req.params.username;
  const filename = req.params.filename;
  const filePath = path.resolve('content', 'users', username, 'images', filename);

  try {
    // Verificar se o arquivo existe
    if (!fs.existsSync(filePath)) {
      return reply.status(404).send({ error: 'File not found' });
    }

    // Ler o conteúdo do arquivo
    const fileContent = fs.readFileSync(filePath);

    // Definir o tipo de conteúdo -> Função para detectar o tipo de ficheiro (extensao)
    reply.header('Content-Type', getContentType(filename));

    // Enviar o conteúdo da imagem
    reply.send(fileContent);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: 'Internal Server Error' });
  }
}

function getContentType2(filename) {
  const ext = path.extname(filename);
  return mime.lookup(ext) || 'application/octet-stream';
}

// Reprodução via Streaming
export async function getVideo(req, reply) {
  const username = req.params.username;
  const filename = req.params.filename;
  const filePath = path.resolve('content', 'users', username, 'videos', filename);

  try {
    // verifica se o ficheiro existe
    if (!fs.existsSync(filePath)) {
      reply.status(404).send({ error: 'File not found' });
      return;
    }

    const range = req.headers.range;
    const videoSize = fs.statSync(filePath).size;

    if (!range) {
      reply.status(400).send("Range header is required");
      return;
    }

    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": getContentType2(filename),
    };

    reply.raw.writeHead(206, headers);

    // Create read stream for the part of the video
    const videoStream = fs.createReadStream(filePath, { start, end });
    videoStream.pipe(reply.raw);

    // Ensure the reply is properly handled by Fastify
    videoStream.on('end', () => {
      reply.raw.end();
    });

  } catch (error) {
    reply.status(500).send({ error: 'An error occurred while retrieving the video' });
  }
}

export async function getMusic(req, reply) {
  const username = req.params.username;
  const filename = req.params.filename;
  const filePath = path.resolve('content', 'users', username, 'musics', filename);

  try {
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      reply.status(404).send({ error: 'File not found' });
      return;
    }

    const range = req.headers.range;
    const audioSize = fs.statSync(filePath).size;

    if (!range) {
      reply.status(400).send("Range header is required");
      return;
    }

    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, audioSize - 1);

    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${audioSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": getContentType(filename),
    };

    reply.raw.writeHead(206, headers);

    // Create read stream for the part of the audio
    const audioStream = fs.createReadStream(filePath, { start, end });
    audioStream.pipe(reply.raw);

    // Ensure the reply is properly handled by Fastify
    audioStream.on('end', () => {
      reply.raw.end();
    });

  } catch (error) {
    reply.status(500).send({ error: 'An error occurred while retrieving the audio' });
  }
}

// função auxiliar para retornar o tipo de ficheiro
function getContentType(filename) {
  const extension = filename.split('.').pop().toLowerCase();
  switch (extension) {
    // imagens
    case 'jpeg':
    case 'jpg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'webp':
      return 'image/webp';
    // videos
    case 'mp4':
      return 'video/mp4';
    case 'mpg':
      return 'video/mpeg';
    case 'avi':
      return 'video/x-msvideo';
    // audios
    case 'mp3':
      return 'audio/mp3';
    case 'wma':
      return 'audio/x-ms-wma';
    case 'wav':
      return 'audio/wav';
    case 'flac':
      return 'audio/flac';
    default:
      // Tipo genérico para arquivos binários
      return 'application/octet-stream';
  }
}

/* Função universal para realizar o download de arquivos
rotas de downloads: 
download/username/images/nome_do_ficheiro
download/username/videos/nome_do_ficheiro
download/username/musics/nome_do_ficheiro
*/
export async function downloadFile(req, reply) {
  const username = req.params.username;
  // 'images', 'videos' ou 'musics'
  const fileType = req.params.fileType; 
  const filename = req.params.filename;
  const filePath = path.resolve('content', 'users', username, fileType, filename);

  try {
    // Verificar se o arquivo existe
    if (!fs.existsSync(filePath)) {
      return reply.status(404).send({ error: 'File not found' });
    }

    // Definir o tipo de conteúdo -> Função para detectar o tipo de ficheiro (extensão)
    const contentType = getContentType(filename);

    // Configurar cabeçalhos de resposta
    reply.header('Content-Type', contentType);
    reply.header('Content-Disposition', `attachment; filename="${filename}"`);

    // Ler o conteúdo do arquivo e enviá-lo como resposta
    const fileContent = fs.readFileSync(filePath);
    reply.send(fileContent);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: 'Internal Server Error' });
  }
}
