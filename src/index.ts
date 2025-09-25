import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { Server } from 'http';
import { healthRouter } from './routes/health';
import { usersRouter } from './routes/users';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import { setupContainer } from './container/setup';
import { DatabaseInitializer } from './infra/database/DatabaseInitializer';
import { DatabaseManager } from './infra/database/DatabaseManager';
import { setupSwagger } from './docs/swagger';

dotenv.config();

let server: Server;

async function startServer() {
  await DatabaseInitializer.initialize();
  setupContainer();

  const app = express();
  const PORT = process.env.PORT || 3000;

  // Request logging
  app.use(requestLogger);

  // Middleware de segurança
  app.use(helmet());
  app.use(cors());

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // máximo 100 requests por IP
  });
  app.use(limiter);

  // Parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  // Swagger documentation
  if (process.env.NODE_ENV !== 'production') {
    setupSwagger(app);
  }

  // Rotas
  app.use('/health', healthRouter);
  app.use('/users', usersRouter);

  // Error handler
  app.use(errorHandler);

  server = app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  });
}

async function gracefulShutdown(signal: string) {
  console.log(`\n📡 Received ${signal}. Starting graceful shutdown...`);
  
  if (server) {
    server.close(async () => {
      console.log('🔌 HTTP server closed');
      
      try {
        const dbManager = DatabaseManager.getInstance();
        await dbManager.disconnectAll();
        console.log('🗄️ Database connections closed');
        
        console.log('✅ Graceful shutdown completed');
        process.exit(0);
      } catch (error) {
        console.error('❌ Error during shutdown:', error);
        process.exit(1);
      }
    });
  }
}

// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

startServer().catch(console.error);