"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUdemyCourses = fetchUdemyCourses;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const axios_1 = __importDefault(require("axios"));
// API credentials
const clientId = process.env.UDEMY_CLIENT_ID;
const clientSecret = process.env.UDEMY_CLIENT_SECRET;
async function fetchUdemyCourses(keyword, limit = 5) {
    const base64Credentials = btoa(`${clientId}:${clientSecret}`);
    const url = `https://www.udemy.com/api-2.0/courses/?search=${encodeURIComponent(keyword)}&page_size=${limit}&page=1&ordering=highest_rated`;
    try {
        const response = await axios_1.default.get(url, {
            headers: {
                Authorization: `Basic ${base64Credentials}`,
            },
        });
        return response.data.results.map((course) => ({
            title: course.title,
            photoUrl: course.image_240x135,
            url: `https://www.udemy.com${course.url}`,
            platform: "Udemy",
            price: course.price
        }));
    }
    catch (error) {
        console.error('Error fetching Udemy courses:', error);
        return [];
    }
}
//# sourceMappingURL=Udemy.service.js.map