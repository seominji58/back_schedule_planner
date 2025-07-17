import { GoogleAuthTokens } from './googleAuthService';
export interface CalendarEvent {
    id?: string;
    summary: string;
    description?: string | undefined;
    location?: string | undefined;
    start: {
        dateTime?: string | undefined;
        date?: string | undefined;
        timeZone?: string | undefined;
    };
    end: {
        dateTime?: string | undefined;
        date?: string | undefined;
        timeZone?: string | undefined;
    };
    attendees?: Array<{
        email: string;
        displayName?: string | undefined;
    }> | undefined;
    organizer?: {
        email: string;
    } | undefined;
}
export interface CalendarListOptions {
    timeMin?: string;
    timeMax?: string;
    maxResults?: number;
    singleEvents?: boolean;
    orderBy?: 'startTime' | 'updated';
}
declare class GoogleCalendarService {
    private calendar;
    constructor();
    private setAuth;
    getEvents(tokens: GoogleAuthTokens, options?: CalendarListOptions): Promise<CalendarEvent[]>;
    createEvent(tokens: GoogleAuthTokens, eventData: CalendarEvent): Promise<CalendarEvent>;
    updateEvent(tokens: GoogleAuthTokens, eventId: string, eventData: Partial<CalendarEvent>): Promise<CalendarEvent>;
    deleteEvent(tokens: GoogleAuthTokens, eventId: string): Promise<void>;
    getCalendarList(tokens: GoogleAuthTokens): Promise<{
        id: string | undefined;
        summary: string | undefined;
        description: string | undefined;
        primary: boolean | undefined;
        accessRole: string | undefined;
    }[]>;
}
declare const _default: GoogleCalendarService;
export default _default;
//# sourceMappingURL=googleCalendarService.d.ts.map