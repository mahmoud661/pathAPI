"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roadmap_controller_1 = require("../controllers/roadmap.controller");
const roadmap_service_1 = require("../../application/service/roadmap.service");
const RoadmapRepo_1 = require("../../infrastructure/repos/RoadmapRepo");
const auth_guard_1 = require("../middlewares/auth.guard");
const data_guard_1 = __importDefault(require("../middlewares/data.guard"));
const allowedTokens_guard_1 = __importDefault(require("../middlewares/allowedTokens.guard"));
const editorPermission_guard_1 = require("../middlewares/editorPermission.guard");
const TopicRepo_1 = require("../../infrastructure/repos/TopicRepo");
const EdgeRepo_1 = require("../../infrastructure/repos/EdgeRepo");
const ResourceRepo_1 = require("../../infrastructure/repos/ResourceRepo");
const FollowRepo_1 = require("../../infrastructure/repos/FollowRepo");
const router = (0, express_1.Router)();
// * Repos (DI)
const repo = RoadmapRepo_1.RoadmapRepo.instance;
const topicRepo = TopicRepo_1.TopicRepo.instance;
const edgeRepo = EdgeRepo_1.EdgeRepo.instance;
const resourceRepo = ResourceRepo_1.ResourceRepo.instance;
const followRepo = FollowRepo_1.FollowRepo.instance;
const service = new roadmap_service_1.RoadmapService(repo, topicRepo, edgeRepo, resourceRepo, followRepo);
const controller = new roadmap_controller_1.RoadmapController(service);
// *******************************
// *******      GET      *********
// *******************************
router.get('/', (0, auth_guard_1.authenticate)(false), controller.getAll.bind(controller)); // get roadmap list
router.get('/:slug', (0, auth_guard_1.authenticate)(false), controller.getBySlug.bind(controller));
router.get('/check-slug/:slug', controller.slug.bind(controller));
router.get('/resources/:slug', controller.getResources.bind(controller));
// *******************************
// *******      POST      ********
// *******************************
/**
 * Create a new roadmap
 */
router.post('/', (0, data_guard_1.default)('title', 'description', 'slug', 'icon'), (0, auth_guard_1.authenticate)(), (0, allowedTokens_guard_1.default)(), controller.create.bind(controller));
router.post('/generated', (0, data_guard_1.default)('title', 'description', 'icon'), (0, auth_guard_1.authenticate)(), (0, allowedTokens_guard_1.default)(), controller.createGenerated.bind(controller));
router.post('/generated-data/:slug', (0, auth_guard_1.authenticate)(), (0, allowedTokens_guard_1.default)(), controller.putRoadmapData.bind(controller));
/**
 * publish / hide a roadmap
 */
router.post('/publish/:slug', (0, auth_guard_1.authenticate)(), (0, allowedTokens_guard_1.default)(), editorPermission_guard_1.editorPermission, controller.publish.bind(controller));
/**
 * follow a roadmap
 */
router.post('/follow/:slug', (0, auth_guard_1.authenticate)(), (0, allowedTokens_guard_1.default)(), controller.follow.bind(controller));
// *******************************
// ********      PUT      ********
// *******************************
/**
 * update roadmap resources
 */
router.put('/resources/', (0, auth_guard_1.authenticate)(), (0, allowedTokens_guard_1.default)(), editorPermission_guard_1.editorPermission, controller.editResources.bind(controller));
/**
 * Update roadmap data
 */
router.put('/:slug', (0, auth_guard_1.authenticate)(), (0, allowedTokens_guard_1.default)(), editorPermission_guard_1.editorPermission, controller.update.bind(controller));
/**
 * update roadmap data (Topics and Edges)
 */
router.put('/data/:slug', (0, auth_guard_1.authenticate)(), (0, allowedTokens_guard_1.default)(), editorPermission_guard_1.editorPermission, controller.putRoadmapData.bind(controller));
exports.default = router;
//# sourceMappingURL=roadmap.routes.js.map