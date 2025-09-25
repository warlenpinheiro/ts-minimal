import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido')
});

export const getUserParamsSchema = z.object({
  id: z.string().min(1, 'ID é obrigatório')
});