import { ServerError } from '../../application/exception/serverError';
import { GetRoadmapDTO } from '../../domain/DTOs/roadmap/GetRoadmapDTO';
import { IFollowRepo } from '../../domain/IRepo/IFollowRepo';
import pool from './DBpool';

export class FollowRepo implements IFollowRepo {
  private static _instance: FollowRepo;
  private constructor() {}
  static get instance() {
    if (!FollowRepo._instance) FollowRepo._instance = new FollowRepo();
    return FollowRepo._instance;
  }

  async followToggle(roadmap: number, user: number): Promise<void> {
    const isFollowed = await this.isFollowing(roadmap, user);
    try {
      const updateQuery = isFollowed
        ? `DELETE FROM follow WHERE roadmap=$1 AND user_id=$2;`
        : `INSERT INTO follow (roadmap, user_id) VALUES ($1, $2);`;
      await pool.query(updateQuery, [roadmap, user]);
    } catch (error: Error | any) {
      throw new ServerError(error.message, 500, 'FollowRepo.followToggle()');
    }
  }
  async following(user: number): Promise<GetRoadmapDTO[]> {
    const query = `SELECT r.id as id,
                           r.title as title, 
                           r.description as description, 
                           r.slug as slug, 
                           r.is_official as is_official, 
                           r.icon as icon
                  FROM follow WHERE user_id=$1`;
    try {
      return (await pool.query(query, [user])).rows;
    } catch (error: Error | any) {
      throw new ServerError(error.message, 500, 'FollowRepo.following()');
    }
  }
  async followers(roadmap: number): Promise<number[]> {
    const query = `SELECT user_id FROM follow WHERE roadmap=$1`;
    try {
      return (await pool.query(query, [roadmap])).rows;
    } catch (error: Error | any) {
      throw new ServerError(error.message, 500, 'FollowRepo.followers()');
    }
  }
  async isFollowing(roadmap: number, user: number): Promise<boolean> {
    const checkQuery = `SELECT * FROM follow WHERE roadmap=$1 AND user_id=$2;`;
    try {
      return !!(await pool.query(checkQuery, [roadmap, user])).rowCount;
    } catch (error: Error | any) {
      throw new ServerError(error.message, 500, 'FollowRepo.isFollowing()');
    }
  }
}
