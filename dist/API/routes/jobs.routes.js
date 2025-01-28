"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jobs_controller_1 = require("../controllers/jobs.controller");
const Jobs_service_1 = __importDefault(require("../../infrastructure/JobsService/Jobs.service"));
const router = express_1.default.Router();
const jobsController = new jobs_controller_1.JobsController(Jobs_service_1.default.instance);
router.get('/', jobsController.searchJobs);
exports.default = router;
//# sourceMappingURL=jobs.routes.js.map