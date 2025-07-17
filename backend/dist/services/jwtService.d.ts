interface UserPayload {
    id: string;
    email: string;
    name: string;
    googleTokens?: any;
}
interface TokenPayload {
    userId: string;
    email: string;
    name: string;
    iat?: number;
    exp?: number;
}
declare class JWTService {
    private readonly JWT_SECRET;
    private readonly JWT_EXPIRES_IN;
    private readonly REFRESH_TOKEN_EXPIRES_IN;
    generateToken(user: UserPayload): string;
    generateRefreshToken(userId: string): string;
    verifyToken(token: string): TokenPayload | null;
    verifyRefreshToken(refreshToken: string): {
        userId: string;
    } | null;
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, hashedPassword: string): Promise<boolean>;
    extractUserFromToken(token: string): TokenPayload | null;
}
declare const _default: JWTService;
export default _default;
//# sourceMappingURL=jwtService.d.ts.map