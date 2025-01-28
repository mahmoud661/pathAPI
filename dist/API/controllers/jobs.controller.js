"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsController = void 0;
const consoleLogger_1 = __importDefault(require("../../infrastructure/logger/consoleLogger"));
class JobsController {
    constructor(jobsService) {
        this.jobsService = jobsService;
        this.searchJobs = async (req, res) => {
            try {
                const { keyword, location, dateSincePosted, option } = req.query;
                // TODO: use not empty middleware
                if (!keyword || !location || !dateSincePosted) {
                    res.status(400).json({
                        success: false,
                        message: 'Missing required parameters',
                    });
                    return;
                }
                const result = await this.jobsService.searchJobs(keyword, location, dateSincePosted, option || 'all');
                res.status(200).json({
                    success: true,
                    data: result,
                });
            }
            catch (error) {
                consoleLogger_1.default.Error(error, 'JobsController.searchJobs');
                res.status(500).json({
                    success: false,
                    message: 'Internal server error',
                });
            }
        };
    }
}
exports.JobsController = JobsController;
//# sourceMappingURL=jobs.controller.js.map