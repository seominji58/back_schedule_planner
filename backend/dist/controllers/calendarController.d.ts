import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
declare class CalendarController {
    getCalendarEvents(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    createCalendarEvent(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    updateCalendarEvent(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteCalendarEvent(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    getCalendarList(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    syncGoogleCalendarToFirestore(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: CalendarController;
export default _default;
//# sourceMappingURL=calendarController.d.ts.map