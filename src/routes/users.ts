import { Router } from 'express';
import { loadControllers } from 'awilix-express';

export const usersRouter = Router();

// Auto-load controllers com awilix-express
usersRouter.use(loadControllers('../controllers/*.{ts,js}', { cwd: __dirname }));