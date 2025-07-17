"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firestoreService = void 0;
const firebase_1 = require("../config/firebase");
exports.firestoreService = {
    async getPersonalSchedules() {
        try {
            const snapshot = await firebase_1.db.collection('PersonalSchedule').get();
            return snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
        }
        catch (error) {
            console.error('개인 일정 조회 실패:', error);
            throw new Error('개인 일정을 조회하는 중 오류가 발생했습니다.');
        }
    },
    async getDepartmentSchedules() {
        try {
            const snapshot = await firebase_1.db.collection('DepartmentSchedule').get();
            return snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
        }
        catch (error) {
            console.error('부서 일정 조회 실패:', error);
            throw new Error('부서 일정을 조회하는 중 오류가 발생했습니다.');
        }
    },
    async getProjectSchedules() {
        try {
            const snapshot = await firebase_1.db.collection('ProjectSchedule').get();
            return snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
        }
        catch (error) {
            console.error('프로젝트 일정 조회 실패:', error);
            throw new Error('프로젝트 일정을 조회하는 중 오류가 발생했습니다.');
        }
    },
    async getCompanySchedules() {
        try {
            const snapshot = await firebase_1.db.collection('CompanySchedule').get();
            return snapshot.docs.map((doc) => ({
                schedule_id: doc.id,
                ...doc.data()
            }));
        }
        catch (error) {
            console.error('회사 일정 조회 실패:', error);
            throw new Error('회사 일정을 조회하는 중 오류가 발생했습니다.');
        }
    },
    async getAllSchedules() {
        try {
            const [personal, department, project, company] = await Promise.all([
                this.getPersonalSchedules(),
                this.getDepartmentSchedules(),
                this.getProjectSchedules(),
                this.getCompanySchedules()
            ]);
            return {
                personal,
                department,
                project,
                company
            };
        }
        catch (error) {
            console.error('전체 일정 조회 실패:', error);
            throw new Error('전체 일정을 조회하는 중 오류가 발생했습니다.');
        }
    },
    async createPersonalSchedule(data) {
        try {
            const scheduleData = {
                ...data,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
            const docRef = await firebase_1.db.collection('PersonalSchedule').add(scheduleData);
            return {
                id: docRef.id,
                ...scheduleData,
                date: new Date(scheduleData.date),
                start_time: new Date(scheduleData.start_time),
                end_time: new Date(scheduleData.end_time),
                created_at: new Date(scheduleData.created_at),
                updated_at: new Date(scheduleData.updated_at),
            };
        }
        catch (error) {
            console.error('개인 일정 생성 실패:', error);
            throw new Error('개인 일정을 생성하는 중 오류가 발생했습니다.');
        }
    },
    async getPersonalScheduleById(id) {
        try {
            const doc = await firebase_1.db.collection('PersonalSchedule').doc(id).get();
            if (!doc.exists)
                return null;
            return {
                id: doc.id,
                ...doc.data()
            };
        }
        catch (error) {
            console.error('개인 일정 상세 조회 실패:', error);
            throw new Error('개인 일정을 조회하는 중 오류가 발생했습니다.');
        }
    },
    async updatePersonalSchedule(id, data) {
        try {
            const updateData = {
                ...data,
                updated_at: new Date().toISOString()
            };
            await firebase_1.db.collection('PersonalSchedule').doc(id).update(updateData);
            return await this.getPersonalScheduleById(id);
        }
        catch (error) {
            console.error('개인 일정 수정 실패:', error);
            throw new Error('개인 일정을 수정하는 중 오류가 발생했습니다.');
        }
    },
    async deletePersonalSchedule(id) {
        try {
            await firebase_1.db.collection('PersonalSchedule').doc(id).delete();
            return true;
        }
        catch (error) {
            console.error('개인 일정 삭제 실패:', error);
            throw new Error('개인 일정을 삭제하는 중 오류가 발생했습니다.');
        }
    },
    async createDepartmentSchedule(data) {
        try {
            const scheduleData = {
                ...data,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
            const docRef = await firebase_1.db.collection('DepartmentSchedule').add(scheduleData);
            return {
                id: docRef.id,
                ...scheduleData,
                date: new Date(scheduleData.date),
                start_time: new Date(scheduleData.start_time),
                end_time: new Date(scheduleData.end_time),
                created_at: new Date(scheduleData.created_at),
                updated_at: new Date(scheduleData.updated_at),
            };
        }
        catch (error) {
            console.error('부서 일정 생성 실패:', error);
            throw new Error('부서 일정을 생성하는 중 오류가 발생했습니다.');
        }
    },
    async getDepartmentScheduleById(id) {
        try {
            const doc = await firebase_1.db.collection('DepartmentSchedule').doc(id).get();
            if (!doc.exists)
                return null;
            return {
                id: doc.id,
                ...doc.data()
            };
        }
        catch (error) {
            console.error('부서 일정 상세 조회 실패:', error);
            throw new Error('부서 일정을 조회하는 중 오류가 발생했습니다.');
        }
    },
    async updateDepartmentSchedule(id, data) {
        try {
            const updateData = {
                ...data,
                updated_at: new Date().toISOString()
            };
            await firebase_1.db.collection('DepartmentSchedule').doc(id).update(updateData);
            return await this.getDepartmentScheduleById(id);
        }
        catch (error) {
            console.error('부서 일정 수정 실패:', error);
            throw new Error('부서 일정을 수정하는 중 오류가 발생했습니다.');
        }
    },
    async deleteDepartmentSchedule(id) {
        try {
            await firebase_1.db.collection('DepartmentSchedule').doc(id).delete();
            return true;
        }
        catch (error) {
            console.error('부서 일정 삭제 실패:', error);
            throw new Error('부서 일정을 삭제하는 중 오류가 발생했습니다.');
        }
    },
    async createProjectSchedule(data) {
        try {
            const scheduleData = {
                ...data,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
            const docRef = await firebase_1.db.collection('ProjectSchedule').add(scheduleData);
            return {
                id: docRef.id,
                ...scheduleData,
                date: new Date(scheduleData.date),
                project_start_date: new Date(scheduleData.project_start_date),
                project_end_date: new Date(scheduleData.project_end_date),
                created_at: new Date(scheduleData.created_at),
                updated_at: new Date(scheduleData.updated_at),
            };
        }
        catch (error) {
            console.error('프로젝트 일정 생성 실패:', error);
            throw new Error('프로젝트 일정을 생성하는 중 오류가 발생했습니다.');
        }
    },
    async getProjectScheduleById(id) {
        try {
            const doc = await firebase_1.db.collection('ProjectSchedule').doc(id).get();
            if (!doc.exists)
                return null;
            return {
                id: doc.id,
                ...doc.data()
            };
        }
        catch (error) {
            console.error('프로젝트 일정 상세 조회 실패:', error);
            throw new Error('프로젝트 일정을 조회하는 중 오류가 발생했습니다.');
        }
    },
    async updateProjectSchedule(id, data) {
        try {
            const updateData = {
                ...data,
                updated_at: new Date().toISOString()
            };
            await firebase_1.db.collection('ProjectSchedule').doc(id).update(updateData);
            return await this.getProjectScheduleById(id);
        }
        catch (error) {
            console.error('프로젝트 일정 수정 실패:', error);
            throw new Error('프로젝트 일정을 수정하는 중 오류가 발생했습니다.');
        }
    },
    async deleteProjectSchedule(id) {
        try {
            await firebase_1.db.collection('ProjectSchedule').doc(id).delete();
            return true;
        }
        catch (error) {
            console.error('프로젝트 일정 삭제 실패:', error);
            throw new Error('프로젝트 일정을 삭제하는 중 오류가 발생했습니다.');
        }
    },
    async createCompanySchedule(_data) {
        return {};
    },
    async getCompanyScheduleById(_id) {
        return null;
    },
    async updateCompanySchedule(_id, _data) {
        return null;
    },
    async deleteCompanySchedule(_id) {
        return false;
    },
    async getScheduleConflicts() {
        return [];
    },
    async createScheduleConflict(_data) {
        return {};
    },
    async getScheduleConflictById(_id) {
        return null;
    },
    async updateScheduleConflict(_id, _data) {
        return null;
    },
    async deleteScheduleConflict(_id) {
        return false;
    },
    async getPersonalScheduleAnalysis(_date) {
        return null;
    },
    async createPersonalScheduleAnalysis(_data) {
        return {};
    },
    async updatePersonalScheduleAnalysis(_date, _data) {
        return null;
    },
    async getDepartmentScheduleAnalysis(_departmentName, _date) {
        return null;
    },
    async createDepartmentScheduleAnalysis(_data) {
        return {};
    },
    async updateDepartmentScheduleAnalysis(_departmentName, _date, _data) {
        return null;
    },
    async getProjectScheduleAnalysis(_projectId, _date) {
        return null;
    },
    async createProjectScheduleAnalysis(_data) {
        return {};
    },
    async updateProjectScheduleAnalysis(_projectId, _date, _data) {
        return null;
    },
    async getCompanyScheduleAnalysis(_scheduleId) {
        return null;
    },
    async createCompanyScheduleAnalysis(_data) {
        return {};
    },
    async updateCompanyScheduleAnalysis(_scheduleId, _data) {
        return null;
    },
    async getComprehensiveAnalysisReports() {
        return [];
    },
    async createComprehensiveAnalysisReport(_data) {
        return {};
    },
    async getComprehensiveAnalysisReportById(_id) {
        return null;
    },
    async getAIConflictScheduleAnalysisRequests() {
        try {
            const snapshot = await firebase_1.db.collection('AIConflictScheduleAnalysis').get();
            return snapshot.docs.map(doc => ({
                request_id: doc.id,
                ...doc.data()
            }));
        }
        catch (error) {
            console.error('AI 충돌 일정 분석 요청 조회 실패:', error);
            throw new Error('AI 충돌 일정 분석 요청을 조회하는 중 오류가 발생했습니다.');
        }
    },
    async createAIConflictScheduleAnalysisRequest(data) {
        try {
            const analysisData = {
                ...data,
                request_datetime: new Date().toISOString(),
                completion_datetime: new Date().toISOString()
            };
            const docRef = await firebase_1.db.collection('AIConflictScheduleAnalysis').add(analysisData);
            return {
                request_id: docRef.id,
                ...analysisData,
                request_datetime: new Date(analysisData.request_datetime),
                completion_datetime: new Date(analysisData.completion_datetime)
            };
        }
        catch (error) {
            console.error('AI 충돌 일정 분석 요청 생성 실패:', error);
            throw new Error('AI 충돌 일정 분석 요청을 생성하는 중 오류가 발생했습니다.');
        }
    },
    async getAIConflictScheduleAnalysisRequestById(id) {
        try {
            const doc = await firebase_1.db.collection('AIConflictScheduleAnalysis').doc(id).get();
            if (!doc.exists)
                return null;
            return {
                request_id: doc.id,
                ...doc.data()
            };
        }
        catch (error) {
            console.error('AI 충돌 일정 분석 요청 상세 조회 실패:', error);
            throw new Error('AI 충돌 일정 분석 요청을 조회하는 중 오류가 발생했습니다.');
        }
    },
    async getUserById(userId) {
        try {
            const doc = await firebase_1.db.collection('Users').doc(userId).get();
            if (!doc.exists)
                return null;
            return {
                ...doc.data()
            };
        }
        catch (error) {
            console.error('사용자 조회 실패:', error);
            throw new Error('사용자를 조회하는 중 오류가 발생했습니다.');
        }
    },
    async createOrUpdateUser(userData) {
        try {
            const usersRef = firebase_1.db.collection('Users');
            const query = usersRef.where('email', '==', userData.email);
            const snapshot = await query.get();
            let userId;
            if (snapshot.empty) {
                const docRef = await usersRef.add({
                    ...userData,
                    createdAt: new Date()
                });
                userId = docRef.id;
            }
            else {
                const doc = snapshot.docs[0];
                if (!doc) {
                    throw new Error('사용자 문서를 찾을 수 없습니다.');
                }
                userId = doc.id;
                await doc.ref.update({
                    ...userData,
                    lastLogin: new Date()
                });
            }
            return userId;
        }
        catch (error) {
            console.error('사용자 생성/업데이트 실패:', error);
            throw new Error('사용자 정보를 저장하는 중 오류가 발생했습니다.');
        }
    }
};
//# sourceMappingURL=firestoreService.js.map