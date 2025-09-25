import { Request, Response, NextFunction } from 'express';
import { route, POST, before } from 'awilix-express';
import { CreateUserService } from '../services/CreateUserService';
import { CreateUserRequestDTO } from '../dtos/CreateUserRequestDTO';
import { validateBody } from '../middleware/validation';
import { createUserSchema } from '../schemas/userSchemas';

@route('/users')
export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

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
   */
  @POST()
  @before(validateBody(createUserSchema))
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const requestDTO: CreateUserRequestDTO = req.body;
      const result = await this.createUserService.execute(requestDTO);
      
      if (result.isFailure) {
        throw result.error;
      }
      
      res.status(201).json({ data: result.value });
    } catch (error) {
      next(error);
    }
  }
}