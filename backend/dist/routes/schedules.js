"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const scheduleController_1 = require("../controllers/scheduleController");
const router = (0, express_1.Router)();
router.get('/personal', scheduleController_1.scheduleController.getPersonalSchedules);
router.get('/department', scheduleController_1.scheduleController.getDepartmentSchedules);
router.get('/project', scheduleController_1.scheduleController.getProjectSchedules);
router.get('/all', scheduleController_1.scheduleController.getAllSchedules);
router.post('/personal', scheduleController_1.scheduleController.createPersonalSchedule);
router.get('/personal/:id', scheduleController_1.scheduleController.getPersonalScheduleById);
router.put('/personal/:id', scheduleController_1.scheduleController.updatePersonalSchedule);
router.delete('/personal/:id', scheduleController_1.scheduleController.deletePersonalSchedule);
router.post('/department', scheduleController_1.scheduleController.createDepartmentSchedule);
router.get('/department/:id', scheduleController_1.scheduleController.getDepartmentScheduleById);
router.put('/department/:id', scheduleController_1.scheduleController.updateDepartmentSchedule);
router.delete('/department/:id', scheduleController_1.scheduleController.deleteDepartmentSchedule);
router.post('/project', scheduleController_1.scheduleController.createProjectSchedule);
router.get('/project/:id', scheduleController_1.scheduleController.getProjectScheduleById);
router.put('/project/:id', scheduleController_1.scheduleController.updateProjectSchedule);
router.delete('/project/:id', scheduleController_1.scheduleController.deleteProjectSchedule);
exports.default = router;
//# sourceMappingURL=schedules.js.map