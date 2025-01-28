"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesController = void 0;
const consoleLogger_1 = __importDefault(require("../../infrastructure/logger/consoleLogger"));
class CoursesController {
    constructor(coursesService) {
        this.coursesService = coursesService;
        this.searchCourses = async (req, res) => {
            try {
                const { keyword, limit = 5 } = req.query;
                if (!keyword || typeof keyword !== 'string') {
                    res.status(400).json({
                        success: false,
                        message: 'Valid keyword is required',
                    });
                    return;
                }
                const result = await this.coursesService.searchCourses(keyword, Number(limit));
                res.status(200).json({
                    success: true,
                    data: result,
                });
            }
            catch (error) {
                consoleLogger_1.default.Error(error, 'CoursesController.searchCourses');
                res.status(500).json({
                    success: false,
                    message: 'Internal server error',
                });
            }
        };
    }
}
exports.CoursesController = CoursesController;
//# sourceMappingURL=courses.controller.js.map