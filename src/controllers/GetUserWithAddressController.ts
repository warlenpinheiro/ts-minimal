import { Request, Response, NextFunction } from 'express';
import { GetUserWithAddressService } from '../services/GetUserWithAddressService';
import { container } from '../container/Container';

export class GetUserWithAddressController {
  private getUserWithAddressService: GetUserWithAddressService;

  constructor() {
    this.getUserWithAddressService = container.resolve<GetUserWithAddressService>('GetUserWithAddressService');
  }

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.getUserWithAddressService.execute(id);
      
      if (result.isFailure) {
        throw result.error;
      }
      
      res.json({ data: result.value });
    } catch (error) {
      next(error);
    }
  };
}