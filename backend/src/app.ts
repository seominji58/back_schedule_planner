import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import path from 'path';
import 'dotenv/config';

// 라우터 import
import scheduleRoutes from './routes/schedules';
import analyticsRoutes from './routes/analytics';
import googleAuthRoutes from './routes/googleAuth';
import authRoutes from './routes/auth';
import aiConflictAnalysisRoutes from './routes/aiConflictAnalysis';
import calendarRoutes from './routes/calendar';
import utilsRoutes from './routes/utils';

// 미들웨어 import
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';

const app = express();

// 기본 미들웨어 설정
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ✅ CORS 설정 (배포 도메인까지 포함)
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://schedule-planner.qpwo.asia',            // CloudFront 도메인
    'https://schedule-planner-lake.vercel.app'       // Vercel 프론트엔드 도메인
  ],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error: '너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.'
  }
});
app.use('/api/', limiter);

// 로깅
app.use(requestLogger);

// API 라우터 설정
app.use('/api/schedules', scheduleRoutes);
app.use('/api/auth/google', googleAuthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/ai-conflict-analysis', aiConflictAnalysisRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/utils', utilsRoutes);

// 정적 파일
app.use('/kms', express.static(path.join(__dirname, '../kms')));

// 헬스 체크
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env['NODE_ENV'] || 'development'
  });
});

// 404 처리
app.use('*', (req, res) => {
  res.status(404).json({
    error: '요청한 엔드포인트를 찾을 수 없습니다.',
    path: req.originalUrl,
    method: req.method
  });
});

// 에러 핸들링
app.use(errorHandler);

export default app;
