"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const calendarController_1 = __importDefault(require("../controllers/calendarController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.use(authMiddleware_1.authenticateToken);
router.get('/events', calendarController_1.default.getCalendarEvents);
router.post('/events', calendarController_1.default.createCalendarEvent);
router.put('/events/:eventId', calendarController_1.default.updateCalendarEvent);
router.delete('/events/:eventId', calendarController_1.default.deleteCalendarEvent);
router.get('/list', calendarController_1.default.getCalendarList);
router.post('/sync-google', calendarController_1.default.syncGoogleCalendarToFirestore);
exports.default = router;
//# sourceMappingURL=calendar.js.map