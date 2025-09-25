import { Request, Response, NextFunction } from 'express';
import { ListUsersService } from '../services/ListUsersService';
import { ListUsersResponseDTO } from '../dtos/ListUsersResponseDTO';
import { container } from '../container/Container';

export class ListUsersController {
  private listUsersService: ListUsersService;

  constructor() {
    this.listUsersService = container.resolve<ListUsersService>('ListUsersService');
  }

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const responseDTO: ListUsersResponseDTO = await this.listUsersService.execute();
      res.json({ data: responseDTO.users });
    } catch (error) {
      next(error);
    }
  };
}