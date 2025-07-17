"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
require("dotenv/config");
class GoogleAuthService {
    constructor() {
        const clientId = process.env['GOOGLE_CLIENT_ID'];
        const clientSecret = process.env['GOOGLE_CLIENT_SECRET'];
        const redirectUri = process.env['GOOGLE_REDIRECT_URI'];
        console.log('🔧 Google OAuth 환경변수 확인:');
        console.log('  - GOOGLE_CLIENT_ID:', clientId ? '✅ 설정됨' : '❌ 미설정');
        console.log('  - GOOGLE_CLIENT_SECRET:', clientSecret ? '✅ 설정됨' : '❌ 미설정');
        console.log('  - GOOGLE_REDIRECT_URI:', redirectUri || '❌ 미설정');
        if (!clientId || !clientSecret || !redirectUri) {
            throw new Error('Google OAuth 환경변수가 올바르게 설정되지 않았습니다.');
        }
        this.oauth2Client = new googleapis_1.google.auth.OAuth2(clientId, clientSecret, redirectUri);
    }
    generateAuthUrl() {
        const scopes = [
            'https://www.googleapis.com/auth/calendar',
            'https://www.googleapis.com/auth/calendar.events',
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ];
        const authUrl = this.oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
            prompt: 'consent'
        });
        console.log('🔗 생성된 Google OAuth URL:', authUrl);
        return authUrl;
    }
    async exchangeCodeForTokens(code) {
        try {
            const { tokens } = await this.oauth2Client.getToken(code);
            if (!tokens.access_token) {
                throw new Error('Access token을 받지 못했습니다.');
            }
            return {
                access_token: tokens.access_token,
                refresh_token: tokens.refresh_token || '',
                scope: tokens.scope || '',
                token_type: tokens.token_type || 'Bearer',
                expiry_date: tokens.expiry_date || 0
            };
        }
        catch (error) {
            console.error('토큰 교환 실패:', error);
            throw new Error('Google OAuth 토큰 교환에 실패했습니다.');
        }
    }
    setCredentials(tokens) {
        this.oauth2Client.setCredentials({
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            scope: tokens.scope,
            token_type: tokens.token_type,
            expiry_date: tokens.expiry_date
        });
    }
    async refreshAccessToken(refreshToken) {
        try {
            this.oauth2Client.setCredentials({
                refresh_token: refreshToken
            });
            const { credentials } = await this.oauth2Client.refreshAccessToken();
            return {
                access_token: credentials.access_token || '',
                refresh_token: credentials.refresh_token || refreshToken,
                scope: credentials.scope || '',
                token_type: credentials.token_type || 'Bearer',
                expiry_date: credentials.expiry_date || 0
            };
        }
        catch (error) {
            console.error('토큰 갱신 실패:', error);
            throw new Error('토큰 갱신에 실패했습니다.');
        }
    }
    getOAuth2Client() {
        return this.oauth2Client;
    }
    async validateToken(accessToken) {
        try {
            this.oauth2Client.setCredentials({
                access_token: accessToken
            });
            const tokenInfo = await this.oauth2Client.getTokenInfo(accessToken);
            return tokenInfo.expiry_date > Date.now() &&
                tokenInfo.scopes?.includes('https://www.googleapis.com/auth/calendar');
        }
        catch (error) {
            console.error('토큰 검증 실패:', error);
            return false;
        }
    }
    async getUserInfo(accessToken) {
        try {
            this.oauth2Client.setCredentials({
                access_token: accessToken
            });
            const oauth2 = googleapis_1.google.oauth2({ version: 'v2', auth: this.oauth2Client });
            const userInfo = await oauth2.userinfo.get();
            return {
                id: userInfo.data.id || '',
                email: userInfo.data.email || '',
                name: userInfo.data.name || '',
                picture: userInfo.data.picture || ''
            };
        }
        catch (error) {
            console.error('사용자 정보 조회 실패:', error);
            throw new Error('Google 사용자 정보를 가져오는데 실패했습니다.');
        }
    }
}
exports.default = new GoogleAuthService();
//# sourceMappingURL=googleAuthService.js.map