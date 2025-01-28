"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceRepo = void 0;
const serverError_1 = require("../../application/exception/serverError");
const DBpool_1 = __importDefault(require("./DBpool"));
class ResourceRepo {
    constructor() { }
    static get instance() {
        if (!ResourceRepo._instance)
            ResourceRepo._instance = new ResourceRepo();
        return ResourceRepo._instance;
    }
    async create(resources) {
        const query = `
      INSERT INTO roadmap_resource (roadmap, title, link, icon)
      VALUES
        ${resources
            .map((_, index) => `($${index * 4 + 1},
            $${index * 4 + 2},
            $${index * 4 + 3},
            $${index * 4 + 4})`)
            .join(', ')};
    `;
        const values = resources.flatMap((resource) => [
            resource.roadmap,
            resource.title,
            resource.link,
            resource.icon,
        ]);
        try {
            return (await DBpool_1.default.query(query, values)).rows;
        }
        catch (error) {
            throw new serverError_1.ServerError(error.message, 500, 'ResourceRepo.create()');
        }
    }
    async delete(roadmapId) {
        const query = 'DELETE FROM roadmap_resource WHERE roadmap = $1';
        try {
            await DBpool_1.default.query(query, [roadmapId]);
        }
        catch (Error) {
            throw new serverError_1.ServerError(Error.message, 500, 'ResourceRepo.delete()');
        }
    }
    async getByRoadmap(roadmapId) {
        const query = `SELECT * FROM roadmap_resource WHERE roadmap = $1`;
        try {
            return (await DBpool_1.default.query(query, [roadmapId])).rows;
        }
        catch (error) {
            throw new serverError_1.ServerError(error.message, 500, 'ResourceRepo.getByRoadmap()');
        }
    }
}
exports.ResourceRepo = ResourceRepo;
//# sourceMappingURL=ResourceRepo.js.map