import { Request, Response, NextFunction } from 'express';
import { route, GET, before } from 'awilix-express';
import { GetUserService } from '../services/GetUserService';
import { validateParams } from '../middleware/validation';
import { getUserParamsSchema } from '../schemas/userSchemas';

@route('/users/:id')
export class GetUserController {
  constructor(private getUserService: GetUserService) {}

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
   */
  @GET()
  @before(validateParams(getUserParamsSchema))
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.getUserService.execute(id);
      
      if (result.isFailure) {
        throw result.error;
      }
      
      res.json({ data: result.value });
    } catch (error) {
      next(error);
    }
  }
}