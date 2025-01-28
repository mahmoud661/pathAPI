"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const courses_controller_1 = require("../controllers/courses.controller");
const CoursesService_service_1 = __importDefault(require("../../infrastructure/CoursesService/CoursesService.service"));
const router = (0, express_1.Router)();
const coursesController = new courses_controller_1.CoursesController(CoursesService_service_1.default.instance);
router.get('/', coursesController.searchCourses);
exports.default = router;
//# sourceMappingURL=course.routes.js.map