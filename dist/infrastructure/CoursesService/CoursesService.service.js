"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const lodash_1 = __importDefault(require("lodash"));
dotenv_1.default.config();
const coursera_service_1 = require("./providors/coursera.service");
const Udemy_service_1 = require("./providors/Udemy.service");
const { shuffle } = lodash_1.default;
class CoursesService {
    constructor() { }
    static get instance() {
        return CoursesService._instance;
    }
    /**
     * Search for courses on both platforms
     * @param query
     * @param limit
     * @returns {Promise<{courses: any[]; totalCourses: number}>}
     */
    async searchCourses(query, limit = 10) {
        const udemyLimit = limit; // Limit for Udemy courses
        const courseraLimit = limit; // Limit for Coursera courses
        // Fetch top courses from both platforms
        const udemyCourses = await (0, Udemy_service_1.fetchUdemyCourses)(query, udemyLimit);
        const courseraCourses = await (0, coursera_service_1.fetchCourseraCourses)(query, courseraLimit);
        // Combine the results
        const combinedCourses = [...udemyCourses, ...courseraCourses];
        return {
            courses: shuffle(combinedCourses),
            totalCourses: combinedCourses.length,
        };
    }
}
CoursesService._instance = new CoursesService();
exports.default = CoursesService;
//# sourceMappingURL=CoursesService.service.js.map