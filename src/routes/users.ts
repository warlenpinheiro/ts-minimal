import { Router } from 'express';
import { ListUsersController } from '../controllers/ListUsersController';
import { GetUserController } from '../controllers/GetUserController';
import { CreateUserController } from '../controllers/CreateUserController';
import { GetUserWithAddressController } from '../controllers/GetUserWithAddressController';
import { validateBody, validateParams } from '../middleware/validation';
import { createUserSchema, getUserParamsSchema } from '../schemas/userSchemas';
import { container } from '../container/Container';

export const usersRouter = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 */
usersRouter.get('/', (req, res, next) => {
  const controller = container.resolve<ListUsersController>('ListUsersController');
  controller.handle(req, res, next);
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Busca usuário por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
usersRouter.get('/:id', 
  validateParams(getUserParamsSchema),
  (req, res, next) => {
    const controller = container.resolve<GetUserController>('GetUserController');
    controller.handle(req, res, next);
  }
);

/**
 * @swagger
 * /users/{id}/with-address:
 *   get:
 *     summary: Busca usuário com endereço
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário com endereço encontrado
 *       404:
 *         description: Usuário não encontrado
 */
usersRouter.get('/:id/with-address', 
  validateParams(getUserParamsSchema),
  (req, res, next) => {
    const controller = container.resolve<GetUserWithAddressController>('GetUserWithAddressController');
    controller.handle(req, res, next);
  }
);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequest'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
usersRouter.post('/', 
  validateBody(createUserSchema),
  (req, res, next) => {
    const controller = container.resolve<CreateUserController>('CreateUserController');
    controller.handle(req, res, next);
  }
);