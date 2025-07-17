"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/login', async (req, res) => {
    const { id, password } = req.body;
    if (id === 'admin123@email.com' && password === 'admin123') {
        return res.json({
            success: true,
            user: {
                id: 'admin123@email.com',
                role: 'admin',
                name: '관리자',
            },
            token: 'test-admin-token',
            message: '어드민 계정 로그인 성공'
        });
    }
    return res.status(401).json({
        success: false,
        error: '아이디 또는 비밀번호가 올바르지 않습니다.'
    });
});
exports.default = router;
//# sourceMappingURL=auth.js.map