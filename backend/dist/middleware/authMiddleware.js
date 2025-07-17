"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.optionalAuth = exports.authenticateToken = void 0;
const jwtService_1 = __importDefault(require("../services/jwtService"));
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({
            success: false,
            error: '인증 토큰이 제공되지 않았습니다.',
            message: '로그인이 필요합니다.'
        });
        return;
    }
    const user = jwtService_1.default.verifyToken(token);
    if (!user) {
        res.status(403).json({
            success: false,
            error: '유효하지 않은 토큰입니다.',
            message: '토큰이 만료되었거나 유효하지 않습니다.'
        });
        return;
    }
    req.user = user;
    next();
};
exports.authenticateToken = authenticateToken;
const optionalAuth = (req, _res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token) {
        const user = jwtService_1.default.verifyToken(token);
        if (user) {
            req.user = user;
        }
    }
    next();
};
exports.optionalAuth = optionalAuth;
const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(400).json({
            success: false,
            error: '리프레시 토큰이 제공되지 않았습니다.'
        });
    }
    const payload = jwtService_1.default.verifyRefreshToken(refreshToken);
    if (!payload) {
        return res.status(403).json({
            success: false,
            error: '유효하지 않은 리프레시 토큰입니다.'
        });
    }
    const newAccessToken = jwtService_1.default.generateToken({
        id: payload.userId,
        email: '',
        name: ''
    });
    return res.status(200).json({
        success: true,
        data: {
            accessToken: newAccessToken
        },
        message: '토큰이 갱신되었습니다.'
    });
};
exports.refreshToken = refreshToken;
//# sourceMappingURL=authMiddleware.js.map