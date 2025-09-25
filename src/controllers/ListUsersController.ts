import { Request, Response, NextFunction } from 'express';
import { route, GET } from 'awilix-express';
import { ListUsersService } from '../services/ListUsersService';
import { ListUsersResponseDTO } from '../dtos/ListUsersResponseDTO';

@route('/users')
export class ListUsersController {
  constructor(private listUsersService: ListUsersService) {}

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
  @GET()
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const responseDTO: ListUsersResponseDTO = await this.listUsersService.execute();
      res.json({ data: responseDTO.users });
    } catch (error) {
      next(error);
    }
  }
}