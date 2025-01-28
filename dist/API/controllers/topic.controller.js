"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicController = void 0;
class TopicController {
    constructor(topicService) {
        this.topicService = topicService;
    }
    async get(req, res, next) {
        try {
            const topics = await this.topicService.get();
            res.status(200).send({ success: true, topics });
        }
        catch (error) {
            next(error);
            return;
        }
    }
    async getAchieved(req, res, next) {
        try {
            const topics = await this.topicService.getAchieved(req.user.id);
            res.status(200).send({ success: true, topics });
        }
        catch (error) {
            next(error);
            return;
        }
    }
    async achieve(req, res, next) {
        try {
            await this.topicService.achieve(req.params.id, req.user.id);
            res.status(200).send({ success: true });
        }
        catch (error) {
            next(error);
            return;
        }
    }
    async getSkills(req, res, next) {
        const user = req.user;
        try {
            const skills = await this.topicService.getSkills(user.id);
            res.status(200).send({ success: true, skills });
        }
        catch (error) {
            next(error);
            return;
        }
    }
}
exports.TopicController = TopicController;
//# sourceMappingURL=topic.controller.js.map