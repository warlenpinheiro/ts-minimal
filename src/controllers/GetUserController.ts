import { Request, Response, NextFunction } from 'express';
import { GetUserService } from '../services/GetUserService';
import { container } from '../container/Container';

export class GetUserController {
  private getUserService: GetUserService;

  constructor() {
    this.getUserService = container.resolve<GetUserService>('GetUserService');
  }

  handle = async (req: Request, res: Response, next: NextFunction) => {
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
  };
}