import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './middleware/errorHandler';
import { authRouter } from './routes/auth';
import { propertyRouter } from './routes/property';
import { maintenanceRouter } from './routes/maintenance';
import { paymentRouter } from './routes/payment';
import { socketHandler } from './services/socket';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3002' }));
app.use(express.json());

// API routes
app.use('/api/auth', authRouter);
app.use('/api/properties', propertyRouter);
app.use('/api/maintenance', maintenanceRouter);
app.use('/api/payments', paymentRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler (must be last)
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Socket.IO setup
const io = socketHandler(server);

export { app, io };