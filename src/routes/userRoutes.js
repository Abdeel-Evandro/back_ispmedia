// src/routes/userRoutes.js
import * as userController from '../controllers/userController.js'

export default async function userRoutes(fastify, options) {
  // Rota para criar um novo usuário
  fastify.post('/users', userController.createUser);

  // Rota para obter todos os usuários
  fastify.get('/users', userController.getAllUsers);

  // Rota para obter um usuário pelo ID
  fastify.get('/users/:id', userController.getUserById);
  
  // Rota para obter um usuário pelo nome
  fastify.get('/users/nome/:username', userController.getUserByUsername);

  // Rota para atualizar um usuário pelo ID
  fastify.put('/users/:id', userController.updateUser);

  // Rota para apagar um usuário pelo ID
  fastify.delete('/users/:id', userController.deleteUser);

  // Rota de login
  fastify.post('/users/login', userController.login);

  // Rota para tornar um usuário num editor ou remover esse privilégio
  fastify.put('/users/:id/:escolha', userController.beEditor);
}

//export default userRoutes;
