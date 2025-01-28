"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoadmapService = void 0;
const customError_1 = require("../exception/customError");
const roadmapMapping_1 = require("../utils/roadmapMapping");
class RoadmapService {
    constructor(_repo, _topicRepo, _edgeRepo, _resourceRepo, _followRepo) {
        this._repo = _repo;
        this._topicRepo = _topicRepo;
        this._edgeRepo = _edgeRepo;
        this._resourceRepo = _resourceRepo;
        this._followRepo = _followRepo;
    }
    async create(postRoadmap, user_id, is_editor) {
        await this.checkSlugAvailability(postRoadmap.slug);
        const newRoadmap = {
            ...postRoadmap,
            id: 0,
            creator: user_id,
            is_official: is_editor,
            visibility: is_editor ? 'hidden' : 'private',
        };
        return await this._repo.create(newRoadmap);
    }
    async update(slug, putRoadmap, userId) {
        const roadmap = await this._repo.getBySlug(slug);
        if (!roadmap) {
            throw new customError_1.CustomError('Roadmap not found', 404);
        }
        if (!roadmap.is_official || userId !== roadmap.creator) {
            throw new customError_1.CustomError('Not authorized', 403);
        }
        return await this._repo.update(slug, putRoadmap);
    }
    async delete(slug) {
        await this._repo.delete(slug);
    }
    async getBySlug(slug, userId, keyword) {
        const roadmap = await this._repo.getBySlug(slug);
        if (!roadmap)
            throw new customError_1.CustomError('Roadmap not found', 404);
        const roadmapId = roadmap.id;
        const topics = await this._topicRepo.getByRoadmap(roadmapId);
        const edges = await this._edgeRepo.getByRoadmap(roadmapId);
        const resources = await this._resourceRepo.getByRoadmap(roadmapId);
        const isFollowed = await this._followRepo.isFollowing(roadmapId, userId);
        if (userId) {
            const achieved = await this._topicRepo.getAchievedInRoadmap(userId, roadmapId);
            topics.forEach((topic) => {
                topic.is_achieved = achieved.some((t) => t.id === topic.id);
            });
        }
        return {
            ...(0, roadmapMapping_1.toGet)(roadmap),
            isFollowed,
            isEditable: userId === roadmap.creator && roadmap.is_official,
            topics,
            edges,
            resources,
        };
    }
    async getAll(userId, isEditor, page, limit, keyword) {
        const userRoadmaps = userId ? await this._repo.getFollowed(userId, keyword) : [];
        const createdRoadmaps = isEditor
            ? await this._repo.getByCreator(userId, keyword)
            : [];
        const roadmaps = await this._repo.getAll(page, limit, keyword);
        const count = await this._repo.count();
        const response = {
            official: {
                roadmaps,
                count,
            },
            userRoadmaps,
            createdRoadmaps,
        };
        return await response;
    }
    async checkSlugAvailability(slug) {
        const roadmap = await this._repo.getBySlug(slug);
        if (roadmap) {
            throw new customError_1.CustomError('Slug is not available', 409);
        }
        return;
    }
    async updateData(roadmapId, topics, edges) {
        await this._edgeRepo.delete(roadmapId);
        await this._topicRepo.delete(roadmapId);
        await this._topicRepo.create(topics, roadmapId);
        await this._edgeRepo.create(edges, roadmapId);
    }
    async updateResources(resources, user) {
        const roadmapId = resources[0].roadmap;
        const roadmap = await this._repo.getById(roadmapId);
        if (roadmap.creator !== user || !roadmap.is_official) {
            throw new customError_1.CustomError('Not authorized', 403);
        }
        await this._resourceRepo.delete(roadmapId);
        await this._resourceRepo.create(resources);
        return this._resourceRepo.getByRoadmap(roadmapId);
    }
    async updateVisibility(slug, userId) {
        const roadmap = await this._repo.getBySlug(slug);
        if (!roadmap) {
            throw new customError_1.CustomError('Roadmap not found', 404);
        }
        if (!roadmap.is_official || roadmap.creator !== userId) {
            throw new customError_1.CustomError('not authorized', 403);
        }
        const putRoadmap = {
            visibility: roadmap.visibility === 'public' ? 'hidden' : 'public',
        };
        return await this._repo.update(slug, putRoadmap);
    }
    async follow(slug, userId) {
        const roadmap = await this._repo.getId(slug);
        if (!roadmap) {
            throw new customError_1.CustomError('Roadmap not found', 404);
        }
        await this._followRepo.followToggle(roadmap, userId);
    }
    async getResources(slug) {
        const roadmap = await this._repo.getId(slug);
        if (!roadmap) {
            throw new customError_1.CustomError('Roadmap not found', 404);
        }
        const resources = await this._resourceRepo.getByRoadmap(roadmap);
        return resources ?? [];
    }
}
exports.RoadmapService = RoadmapService;
//# sourceMappingURL=roadmap.service.js.map