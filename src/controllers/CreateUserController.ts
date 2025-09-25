import { Request, Response, NextFunction } from 'express';
import { CreateUserService } from '../services/CreateUserService';
import { CreateUserRequestDTO } from '../dtos/CreateUserRequestDTO';
import { container } from '../container/Container';

export class CreateUserController {
  private createUserService: CreateUserService;

  constructor() {
    this.createUserService = container.resolve<CreateUserService>('CreateUserService');
  }

  handle = async (req: Request, res: Response, next: NextFunction) => {
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
  };
}