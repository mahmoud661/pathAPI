"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoadmapRepo = void 0;
const customError_1 = require("../../application/exception/customError");
const serverError_1 = require("../../application/exception/serverError");
const DBpool_1 = __importDefault(require("./DBpool"));
class RoadmapRepo {
    constructor() { }
    static get instance() {
        if (!RoadmapRepo._instance)
            RoadmapRepo._instance = new RoadmapRepo();
        return RoadmapRepo._instance;
    }
    async create(roadmap) {
        const query = `
      INSERT INTO roadmap (title, description, slug, creator, is_official, icon, visibility)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
        const values = [
            roadmap.title,
            roadmap.description,
            roadmap.slug,
            roadmap.creator,
            roadmap.is_official,
            roadmap.icon,
            roadmap.visibility,
        ];
        try {
            const result = await DBpool_1.default.query(query, values);
            return result.rows[0];
        }
        catch (error) {
            throw new serverError_1.ServerError(error.message, 500, 'RoadmapRepo.create()');
        }
    }
    async update(slug, updateData) {
        const fields = Object.keys(updateData).filter((key) => updateData[key] !== undefined &&
            updateData[key] !== null);
        if (fields.length === 0) {
            throw new customError_1.CustomError('No fields to update', 400);
        }
        const setClause = fields
            .map((field, index) => `${field} = $${index + 1}`)
            .join(', ');
        const queryValues = fields.map((field) => updateData[field]);
        queryValues.push(slug);
        const query = `
      UPDATE roadmap
      SET ${setClause}
      WHERE slug = $${queryValues.length}
      RETURNING *
    `;
        try {
            const result = await DBpool_1.default.query(query, queryValues);
            if (!result.rows[0]) {
                throw new customError_1.CustomError('Roadmap not found', 404);
            }
            return result.rows[0];
        }
        catch (error) {
            throw new serverError_1.ServerError(error.message, 500, 'RoadmapRepo.update()');
        }
    }
    async delete(slug) {
        const query = 'DELETE FROM roadmap WHERE string = $1';
        try {
            await DBpool_1.default.query(query, [slug]);
        }
        catch (error) {
            throw new customError_1.CustomError(error.message, 500, 'RoadmapRepo.delete()');
        }
    }
    async getBySlug(slug) {
        const query = 'SELECT *  FROM roadmap WHERE slug = $1';
        const values = [slug.toLowerCase()];
        try {
            return (await DBpool_1.default.query(query, values)).rows[0];
        }
        catch (error) {
            throw new serverError_1.ServerError(error.message, 500, 'RoadmapRepo.getBySlug()');
        }
    }
    async getById(id) {
        const query = 'SELECT *  FROM roadmap WHERE id = $1';
        const values = [id];
        try {
            return (await DBpool_1.default.query(query, values)).rows[0];
        }
        catch (error) {
            throw new serverError_1.ServerError(error.message, 500, 'RoadmapRepo.getBySlug()');
        }
    }
    async getAll(page = 1, limit = 10, keyword = '') {
        const offset = (page - 1) * limit;
        let query = `
    SELECT id, title, description, slug, is_official, icon 
    FROM roadmap 
    WHERE visibility = 'public'
  `;
        const values = [limit, offset];
        if (keyword) {
            query += ` AND (title ILIKE $3 OR description ILIKE $3)`;
            values.push(`%${keyword}%`); // Properly parameterize the keyword
        }
        query += ` ORDER BY created_at ASC LIMIT $1 OFFSET $2`;
        try {
            const result = await DBpool_1.default.query(query, values);
            return result.rows;
        }
        catch (error) {
            throw new customError_1.CustomError(error.message, 500, 'RoadmapRepo.getAll()');
        }
    }
    async count() {
        const query = "SELECT COUNT(*) FROM roadmap WHERE visibility = 'public'";
        try {
            const result = await DBpool_1.default.query(query);
            return result.rows[0].count;
        }
        catch (error) {
            throw new customError_1.CustomError(error.message, 500, 'RoadmapRepo.count()');
        }
    }
    async getFollowed(userId, keyword = '') {
        let query = `
      SELECT r.id, r.title, r.description, r.slug, r.icon, r.visibility, r.created_at, r.updated_at
      FROM public.roadmap r
      JOIN public.follow f ON f.roadmap = r.id
      WHERE f.user_id = $1 AND visibility != 'hidden'
    `;
        const values = [userId];
        if (keyword) {
            query += ` AND (r.title ILIKE $2 OR r.description ILIKE $2)`;
            values.push(`%${keyword}%`); // Parameterize the keyword
        }
        try {
            const result = await DBpool_1.default.query(query, values);
            return result.rows;
        }
        catch (error) {
            throw new customError_1.CustomError(error.message, 500, 'RoadmapRepo.getFollowed()');
        }
    }
    async getByCreator(userId, keyword = '') {
        let query = `SELECT * FROM roadmap WHERE creator = $1`;
        const values = [userId];
        if (keyword) {
            query += ` AND (title ILIKE $2 OR description ILIKE $2)`;
            values.push(`%${keyword}%`); // Parameterize the keyword
        }
        query += ` ORDER BY created_at DESC`;
        try {
            const result = await DBpool_1.default.query(query, values);
            return result.rows;
        }
        catch (error) {
            throw new customError_1.CustomError(error.message, 500, 'RoadmapRepo.getByCreator()');
        }
    }
    async getId(slug) {
        const query = 'SELECT id FROM roadmap WHERE slug = $1';
        try {
            const result = await DBpool_1.default.query(query, [slug]);
            return result.rows?.[0]?.id;
        }
        catch (error) {
            throw new customError_1.CustomError(error.message, 500, 'RoadmapRepo.getId()');
        }
    }
}
exports.RoadmapRepo = RoadmapRepo;
//# sourceMappingURL=RoadmapRepo.js.map