"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_guard_1 = require("../middlewares/auth.guard");
const allowedTokens_guard_1 = __importDefault(require("../middlewares/allowedTokens.guard"));
const TopicRepo_1 = require("../../infrastructure/repos/TopicRepo");
const topic_service_1 = require("../../application/service/topic.service");
const topic_controller_1 = require("../controllers/topic.controller");
const router = (0, express_1.Router)();
const repo = TopicRepo_1.TopicRepo.instance;
const service = new topic_service_1.TopicService(repo);
const controller = new topic_controller_1.TopicController(service);
/**
 * Get all topics (enum)
 */
router.get('/', controller.get.bind(controller));
/**
 * Get achieved
 */
router.get('/achieved', (0, auth_guard_1.authenticate)(), (0, allowedTokens_guard_1.default)(), controller.getAchieved.bind(controller));
router.get('/skills/:id', (0, auth_guard_1.authenticate)(), (0, allowedTokens_guard_1.default)(), controller.getSkills.bind(controller));
/**
 * Achieve a topic
 * @param {number} topicId
 *
 */
router.post('/achieve/:id', (0, auth_guard_1.authenticate)(), (0, allowedTokens_guard_1.default)(), controller.achieve.bind(controller));
exports.default = router;
//# sourceMappingURL=topic.routes.js.map