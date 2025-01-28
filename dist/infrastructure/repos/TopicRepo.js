"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicRepo = void 0;
const customError_1 = require("../../application/exception/customError");
const serverError_1 = require("../../application/exception/serverError");
const DBpool_1 = __importDefault(require("./DBpool"));
class TopicRepo {
    constructor() { }
    static get instance() {
        if (!TopicRepo._instance)
            TopicRepo._instance = new TopicRepo();
        return TopicRepo._instance;
    }
    async create(topics, roadmapId) {
        if (!topics.length)
            return;
        const query = `
      INSERT INTO topic (id, roadmap, prerequisites, label, type, description, position_x, position_y, skill_name, is_analysis_needed)
      VALUES
        ${topics
            .map((_, index) => `($${index * 10 + 1},
            $${index * 10 + 2},
            $${index * 10 + 3},
            $${index * 10 + 4},
            $${index * 10 + 5},
            $${index * 10 + 6},
            $${index * 10 + 7},
            $${index * 10 + 8},
            $${index * 10 + 9},
            $${index * 10 + 10})`)
            .join(', ')};
    `;
        const values = topics.flatMap((topic) => [
            topic.id,
            roadmapId,
            topic.prerequisites,
            topic.label,
            topic.type,
            topic.description,
            topic.position_x,
            topic.position_y,
            topic.skill_name,
            topic.is_analysis_needed,
        ]);
        try {
            await DBpool_1.default.query(query, values);
            return;
        }
        catch (error) {
            throw new serverError_1.ServerError(error.message, 500, 'RoadmapRepo.create()');
        }
    }
    async delete(roadmapId) {
        const query = `DELETE FROM topic WHERE roadmap=$1`;
        try {
            await DBpool_1.default.query(query, [roadmapId]);
        }
        catch (error) {
            throw new serverError_1.ServerError(error.message, 500, 'TopicRepo.delete()');
        }
    }
    async getByRoadmap(roadmapId) {
        const query = `SELECT * FROM topic WHERE roadmap=$1`;
        try {
            const topics = await DBpool_1.default.query(query, [roadmapId]);
            return topics.rows;
        }
        catch (error) {
            throw new serverError_1.ServerError(error.message, 500, 'TopicRepo.getByRoadmap()');
        }
    }
    async achieve(topic, user) {
        const checkQuery = 'SELECT * FROM achieved_topic WHERE "user" = $1 AND topic = $2';
        const query = 'INSERT INTO achieved_topic VALUES ($1, $2)';
        try {
            if ((await DBpool_1.default.query(checkQuery, [user, topic])).rowCount) {
                // Check if it's achieved
                return this.unAchieve(topic, user);
            }
            await DBpool_1.default.query(query, [user, topic]);
        }
        catch (error) {
            if (error.code === '23505') {
                throw new customError_1.CustomError('Topic already achieved', 400);
            }
            else {
                throw new serverError_1.ServerError(error.message, 500, 'TopicRepo.achieve()');
            }
        }
    }
    async unAchieve(topic, user) {
        const query = 'DELETE FROM achieved_topic WHERE "user" = $1 AND topic = $2';
        try {
            await DBpool_1.default.query(query, [user, topic]);
        }
        catch (error) {
            throw new serverError_1.ServerError(error.message, 500, 'TopicRepo.unAchieve()');
        }
    }
    async getByUser(user) {
        throw new Error('Method not implemented.');
    }
    async get() {
        const query = `
        SELECT DISTINCT ON (label) 
            label
        FROM 
            topic
        WHERE topic.type = 'topic'
        ORDER BY 
            label, created_at DESC;
      `;
        try {
            const result = await DBpool_1.default.query(query);
            return result.rows;
        }
        catch (error) {
            throw new serverError_1.ServerError(error.message, 500, 'TopicRepo.get()');
        }
    }
    async getAchieved(user) {
        const query = `
    SELECT * FROM achieved_topics_by_user
    WHERE "user" = $1;
  `;
        try {
            const result = await DBpool_1.default.query(query, [user]);
            return result.rows;
        }
        catch (error) {
            throw new serverError_1.ServerError(error.message, 500, 'TopicRepo.getAchieved()');
        }
    }
    async getAchievedInRoadmap(user, roadmap) {
        const query = `
    SELECT * FROM achieved_topics_by_user_and_roadmap
    WHERE "user" = $1 AND roadmap = $2;
    `;
        try {
            const result = await DBpool_1.default.query(query, [user, roadmap]);
            return result.rows;
        }
        catch (error) {
            throw new serverError_1.ServerError(error.message, 500, 'TopicRepo.getAchievedInRoadmap()');
        }
    }
    async getSkills(user) {
        const query = `
    SELECT skill_name FROM achieved_topics_by_user
    WHERE "user" = $1 AND skill_name IS NOT NULL AND skill_name != '' GROUP BY skill_name;
    `;
        try {
            const result = await DBpool_1.default.query(query, [user]);
            return result.rows;
        }
        catch (error) {
            throw new serverError_1.ServerError(error.message, 500, 'TopicRepo.getSkills()');
        }
    }
}
exports.TopicRepo = TopicRepo;
//# sourceMappingURL=TopicRepo.js.map