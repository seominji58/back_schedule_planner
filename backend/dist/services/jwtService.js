"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class JWTService {
    constructor() {
        this.JWT_SECRET = process.env['JWT_SECRET'] || 'your-secret-key';
        this.JWT_EXPIRES_IN = '7d';
        this.REFRESH_TOKEN_EXPIRES_IN = '30d';
    }
    generateToken(user) {
        const payload = {
            userId: user.id,
            email: user.email,
            name: user.name
        };
        return jsonwebtoken_1.default.sign(payload, this.JWT_SECRET, {
            expiresIn: this.JWT_EXPIRES_IN
        });
    }
    generateRefreshToken(userId) {
        return jsonwebtoken_1.default.sign({ userId }, this.JWT_SECRET, {
            expiresIn: this.REFRESH_TOKEN_EXPIRES_IN
        });
    }
    verifyToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.JWT_SECRET);
        }
        catch (error) {
            console.error('JWT 토큰 검증 실패:', error);
            return null;
        }
    }
    verifyRefreshToken(refreshToken) {
        try {
            return jsonwebtoken_1.default.verify(refreshToken, this.JWT_SECRET);
        }
        catch (error) {
            console.error('리프레시 토큰 검증 실패:', error);
            return null;
        }
    }
    async hashPassword(password) {
        const saltRounds = 12;
        return bcryptjs_1.default.hash(password, saltRounds);
    }
    async comparePassword(password, hashedPassword) {
        return bcryptjs_1.default.compare(password, hashedPassword);
    }
    extractUserFromToken(token) {
        return this.verifyToken(token);
    }
}
exports.default = new JWTService();
//# sourceMappingURL=jwtService.js.map