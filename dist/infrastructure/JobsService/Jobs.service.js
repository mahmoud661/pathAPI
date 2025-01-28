"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const consoleLogger_1 = __importDefault(require("../logger/consoleLogger"));
// eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef
const linkedIn = require('linkedin-jobs-api');
class JobsService {
    constructor() { }
    static get instance() {
        return JobsService._instance;
    }
    /**
     * Search for jobs on LinkedIn
     * @param keyword
     * @param location
     * @param dateSincePosted
     * @returns {Promise<any>}
     */
    async searchJobs(keyword, location, dateSincePosted, option = 'all') {
        const queryOptions = {
            keyword,
            location,
            dateSincePosted,
        };
        try {
            const result = await linkedIn.query(queryOptions);
            return option === 'all' ? result : result.length;
        }
        catch (error) {
            consoleLogger_1.default.Error(error, 'JobsService.searchJobs');
            throw error;
        }
    }
}
JobsService._instance = new JobsService();
exports.default = JobsService;
//# sourceMappingURL=Jobs.service.js.map