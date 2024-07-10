// src/controllers/userController.js
import * as userService from '../services/userServices.js';

// criar um user
export async function createUser(req, res) {
  try {
    const user = req.body;

    // verificar se o username contem apenas espaços em branco  
    if (user.username.trim().length > 0) {
      // verificar o email
      const emailRegex = /^[^\s@]+@[^\s@]+\.(isptec\.co\.ao)$/;
      if (emailRegex.test(user.email)) {
        // criar user e registar na BD
        await userService.createUser(user);
        // criar pastas
        await userService.createUserDirectories(user.username);
        res.status(201).send(user);
      } else {
        res.status(400).send({ message: "O email deve pertencer ao domínio do ISPTEC" });
      }
    } else {
      res.status(400).send({ message: "O username não pode estar vazio ou conter apenas espaços em branco" });
    }

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// recuperar todos os users
export async function getAllUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// recuperar um user pelo ID
export async function getUserById(req, res) {
  try {
    const user = await userService.getUserById(req.params.id);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// recuperar um user pelo username
export async function getUserByUsername(req, res) {
  try {
    //procurar o user pelo nome
    const user = await userService.getUserByUsername(req.params.username);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// actualizar as informações de um user
export async function updateUser(req, res) {
  try {
    // recolher as informações do user - antigo vs novo
    const old_user = await userService.getUserById(req.params.id);
    const user = await userService.updateUser(req.params.id, req.body);
    if (user) {
      // alterar o nome da pasta no servidor
      await userService.updateUserDirectories(old_user.username, user.username);
      res.status(202).send(user);
    } else {
      res.status(404).send({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// eliminar um user
export async function deleteUser(req, res) {
  try {
    // recolher as informações do user antes de eliminar
    let user = await userService.getUserById(req.params.id);
    const username = user.username;

    // eliminar o user da tabela
    const success = await userService.deleteUser(req.params.id);
    if (success) {
      // eliminar os seus ficheiros
      await userService.deleteUserDirectories(username);
      res.send({ message: 'User deleted' });
    } else {
      res.status(404).send({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// login
export async function login(request, reply) {
  // recepção do corpo da requisição
  const { username, password } = request.body;
  // realização da autenticação do user
  try {
    const userAuthenticated = await userService.login(username, password);
    // se estiver tudo ok, retorna o user autenticado
    if (userAuthenticated) {
      return reply.status(200).send(userAuthenticated);
    } else {
      // se não, envia uma mensagem de erro
      return reply.code(401).send({ message: 'Invalid username or password' });
    }
  } catch (error) {
    return reply.code(500).send({ message: 'Internal Server Error' });
  }
}

// tornar um user editor
export async function beEditor(request, reply) {
  try {
    // obter os dados do parametro da requisição
    const id = request.params.id;
    const escolha = request.params.escolha;
    // chamar a função responsável por alterar o estado do campo editor
    const newEditor = await userService.beEditor(id, escolha);
    if (newEditor) {
      // se estiver tudo ok, envia o usuário actualizado
      return reply.status(201).send(newEditor);
    } else {
      // se não estiver tudo ok, envia um erro
      return reply.status(401).send({ message: "Erro ao tentar alterar o estado do Usuário!" });
    }
  } catch (error) {
    return reply.code(500).send({ message: 'Internal Server Error' });
  }
}