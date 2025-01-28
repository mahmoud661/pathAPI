"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EdgeRepo = void 0;
const customError_1 = require("../../application/exception/customError");
const serverError_1 = require("../../application/exception/serverError");
const DBpool_1 = __importDefault(require("./DBpool"));
class EdgeRepo {
    constructor() { }
    static get instance() {
        if (!EdgeRepo._instance)
            EdgeRepo._instance = new EdgeRepo();
        return EdgeRepo._instance;
    }
    async create(edges, roadmapId) {
        if (edges.length === 0)
            return;
        const query = `
    INSERT INTO edge (id, roadmap, source, target, target_handle, source_handle, line_style, animation, type)
    VALUES
      ${edges
            .map((_, index) => `($${index * 9 + 1}, $${index * 9 + 2}, $${index * 9 + 3},$${index * 9 + 4}, $${index * 9 + 5},
            $${index * 9 + 6}, $${index * 9 + 7}, $${index * 9 + 8}, $${index * 9 + 9})`)
            .join(', ')};
  `;
        const values = edges.flatMap((edge) => [
            edge.id,
            roadmapId,
            edge.source,
            edge.target,
            edge.target_handle,
            edge.source_handle,
            edge.line_style,
            edge.animation,
            edge.type,
        ]);
        try {
            const edgesBefore = (await this.getByRoadmap(roadmapId)).length;
            const result = (await DBpool_1.default.query(query, values)).rowCount;
            if (edgesBefore + edges.length !== result)
                throw new customError_1.CustomError('Error creating edges', 500);
            return;
        }
        catch (error) {
            if (!(error instanceof customError_1.CustomError))
                throw new serverError_1.ServerError(error.message, 500, 'EdgeRepo.create()');
            throw error;
        }
    }
    async delete(roadmapId) {
        const query = `DELETE FROM edge WHERE roadmap=$1`;
        try {
            await DBpool_1.default.query(query, [roadmapId]);
        }
        catch (error) {
            throw new serverError_1.ServerError(error.message, 500, 'EdgeRepo.delete()');
        }
    }
    async getByRoadmap(roadmapId) {
        const query = `SELECT * FROM edge WHERE roadmap=$1`;
        try {
            return (await DBpool_1.default.query(query, [roadmapId])).rows;
        }
        catch (error) {
            throw new serverError_1.ServerError(error.message, 500, 'EdgeRepo.getByRoadmap()');
        }
    }
}
exports.EdgeRepo = EdgeRepo;
//# sourceMappingURL=EdgeRepo.js.map