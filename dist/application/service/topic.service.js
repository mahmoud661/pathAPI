"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicService = void 0;
class TopicService {
    constructor(_repo) {
        this._repo = _repo;
    }
    async get() {
        return (await this._repo.get()).map((t) => t.label) ?? [];
    }
    async getAchieved(user) {
        return (await this._repo.getAchieved(user)) ?? [];
    }
    async achieve(topic, user) {
        await this._repo.achieve(topic, user);
    }
    async getSkills(user) {
        return (await this._repo.getSkills(user)) ?? [];
    }
}
exports.TopicService = TopicService;
//# sourceMappingURL=topic.service.js.map