"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoadmapController = void 0;
const customError_1 = require("../../application/exception/customError");
const roadmap_1 = require("../utils/roadmap");
class RoadmapController {
    constructor(roadmapService) {
        this.roadmapService = roadmapService;
    }
    async create(req, res, next) {
        const { user, isEditor, body } = req;
        const postedRoadmap = { ...body };
        try {
            const roadmap = await this.roadmapService.create(postedRoadmap, user.id, isEditor ?? false);
            res.status(201).json({ success: true, roadmap });
        }
        catch (error) {
            next(error);
        }
    }
    async createGenerated(req, res, next) {
        const { user, isEditor, body } = req;
        const postedRoadmap = {
            ...body,
            slug: (0, roadmap_1.titleToSlug)(body.title),
        };
        try {
            const roadmap = await this.roadmapService.create(postedRoadmap, user.id, isEditor ?? false);
            res.status(201).json({ success: true, roadmap });
        }
        catch (error) {
            next(error);
        }
    }
    async postRoadmapData(req, res, next) {
        const { user } = req;
        const { topics, edges } = req.body;
        try {
            const roadmap = await this.roadmapService.updateData(Number(req.params.id), topics, edges);
            res.status(200).json({ success: true, roadmap });
        }
        catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        const slug = req.params.slug;
        const putRoadmap = { ...req.body };
        try {
            const roadmap = await this.roadmapService.update(slug, putRoadmap, req.user.id);
            res.status(200).json({ success: true, roadmap });
        }
        catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            if (!req.user.is_editor) {
                throw new customError_1.CustomError('Not authorized', 403);
            }
            await this.roadmapService.delete(req.params.string);
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }
    async getBySlug(req, res, next) {
        const slug = req.params.slug;
        const user = req.user;
        try {
            const roadmap = await this.roadmapService.getBySlug(slug, (user && user.id) || 0);
            res.status(200).json({ success: true, roadmap });
        }
        catch (error) {
            next(error);
        }
    }
    async getAll(req, res, next) {
        const { user, isEditor } = req;
        const { page = 1, limit = 1000, search = ' ' } = req.query;
        if (isNaN(page) || isNaN(limit)) {
            next(new customError_1.CustomError('page and limit must be number', 400));
            return;
        }
        try {
            const roadmaps = await this.roadmapService.getAll((user && user.id) || 0, isEditor, page, // TODO: Safety check
            limit, search);
            res.status(200).json({ success: true, data: roadmaps });
        }
        catch (error) {
            next(error);
        }
    }
    async putRoadmapData(req, res, next) {
        const id = Number(req.body.id);
        if (isNaN(id))
            res
                .status(400)
                .send({ success: false, message: 'Invalid id, id must be a number' });
        const { topics, edges } = req.body;
        try {
            await this.roadmapService.updateData(id, topics, edges);
            res.status(200).send({ success: true });
        }
        catch (error) {
            next(error);
            return;
        }
    }
    async slug(req, res, next) {
        const { slug } = req.params;
        try {
            await this.roadmapService.checkSlugAvailability(slug);
            res.status(200).json({ success: true, message: 'Available.' });
        }
        catch (error) {
            next(error);
        }
    }
    async editResources(req, res, next) {
        const { user } = req;
        const { resources } = req.body;
        try {
            const updatedResources = await this.roadmapService.updateResources(resources, user.id);
            res.status(200).json({ success: true, resources: updatedResources });
        }
        catch (error) {
            next(error);
        }
    }
    async publish(req, res, next) {
        const slug = req.params.slug;
        const { user } = req;
        try {
            const roadmap = await this.roadmapService.updateVisibility(slug, user.id);
            res.status(200).json({ success: true, roadmap });
        }
        catch (error) {
            next(error);
        }
    }
    async follow(req, res, next) {
        const slug = req.params.slug;
        const { user } = req;
        try {
            const roadmap = await this.roadmapService.follow(slug, user.id);
            res.status(200).json({ success: true, roadmap });
        }
        catch (error) {
            next(error);
        }
    }
    async getResources(req, res, next) {
        const slug = req.params.slug;
        try {
            const resources = await this.roadmapService.getResources(slug);
            res.status(200).json({ success: true, resources });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.RoadmapController = RoadmapController;
//# sourceMappingURL=roadmap.controller.js.map