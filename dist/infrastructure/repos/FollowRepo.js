"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowRepo = void 0;
const serverError_1 = require("../../application/exception/serverError");
const DBpool_1 = __importDefault(require("./DBpool"));
class FollowRepo {
    constructor() { }
    static get instance() {
        if (!FollowRepo._instance)
            FollowRepo._instance = new FollowRepo();
        return FollowRepo._instance;
    }
    async followToggle(roadmap, user) {
        const isFollowed = await this.isFollowing(roadmap, user);
        try {
            const updateQuery = isFollowed
                ? `DELETE FROM follow WHERE roadmap=$1 AND user_id=$2;`
                : `INSERT INTO follow (roadmap, user_id) VALUES ($1, $2);`;
            await DBpool_1.default.query(updateQuery, [roadmap, user]);
        }
        catch (error) {
            throw new serverError_1.ServerError(error.message, 500, 'FollowRepo.followToggle()');
        }
    }
    async following(user) {
        const query = `SELECT r.id as id,
                           r.title as title, 
                           r.description as description, 
                           r.slug as slug, 
                           r.is_official as is_official, 
                           r.icon as icon
                  FROM follow WHERE user_id=$1`;
        try {
            return (await DBpool_1.default.query(query, [user])).rows;
        }
        catch (error) {
            throw new serverError_1.ServerError(error.message, 500, 'FollowRepo.following()');
        }
    }
    async followers(roadmap) {
        const query = `SELECT user_id FROM follow WHERE roadmap=$1`;
        try {
            return (await DBpool_1.default.query(query, [roadmap])).rows;
        }
        catch (error) {
            throw new serverError_1.ServerError(error.message, 500, 'FollowRepo.followers()');
        }
    }
    async isFollowing(roadmap, user) {
        const checkQuery = `SELECT * FROM follow WHERE roadmap=$1 AND user_id=$2;`;
        try {
            return !!(await DBpool_1.default.query(checkQuery, [roadmap, user])).rowCount;
        }
        catch (error) {
            throw new serverError_1.ServerError(error.message, 500, 'FollowRepo.isFollowing()');
        }
    }
}
exports.FollowRepo = FollowRepo;
//# sourceMappingURL=FollowRepo.js.map