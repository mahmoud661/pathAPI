"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCourseraCourses = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const axios_1 = __importDefault(require("axios"));
const consoleLogger_1 = __importDefault(require("../../logger/consoleLogger"));
const COURSERA_ACCESS_TOKEN = process.env.COURSERA_ACCESS_TOKEN;
const fetchCourseraCourses = async (keyword, limit = 6) => {
    const encodedSearchTerm = encodeURIComponent(keyword);
    const COURSES_API_URL = `https://api.coursera.org/api/courses.v1?q=search&query=${encodedSearchTerm}&fields=name,photoUrl,slug`; // Fetching top-rated courses without pagination
    const headers = {
        Authorization: `Bearer ${COURSERA_ACCESS_TOKEN}`,
    };
    try {
        const response = await axios_1.default.get(COURSES_API_URL, { headers });
        return response.data.elements.slice(0, limit).map((course) => ({
            title: course.name,
            photoUrl: course.photoUrl,
            url: `https://www.coursera.org/learn/${course.slug}`,
            platform: 'Coursera',
            price: 'Subscription',
        }));
    }
    catch (error) {
        consoleLogger_1.default.Error('Failed to fetch courses', 'Coursera service');
        return [];
    }
};
exports.fetchCourseraCourses = fetchCourseraCourses;
//# sourceMappingURL=coursera.service.js.map