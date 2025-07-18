import app from './app';
import 'dotenv/config';

const PORT = process.env['PORT'] || 3001;

const startServer = async () => {
  try {

   app.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 서버가 시작되었습니다!');
  console.log(`📍 서버 주소: http://localhost:${PORT}`);
  console.log(`🔍 헬스 체크: http://localhost:${PORT}/health`);
  console.log(`🌍 환경: ${process.env['NODE_ENV'] || 'development'}`);
  console.log(`⏰ 시작 시간: ${new Date().toISOString()}`);
});

// 서버 시작
startServer();

// Graceful Shutdown 처리
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM 신호를 받았습니다. 서버를 종료합니다...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT 신호를 받았습니다. 서버를 종료합니다...');
  process.exit(0);
}); 
