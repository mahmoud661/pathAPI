import { ServerError } from '../../application/exception/serverError';
import { ITopic } from '../../domain/entities/ITopic';
import { ITopicRepo } from '../../domain/IRepo/ITopicRepo';
import pool from './DBpool';

export class TopicRepo implements ITopicRepo {
  private static _instance: TopicRepo;
  private constructor() {}

  public static get instance() {
    if (!TopicRepo._instance) TopicRepo._instance = new TopicRepo();
    return TopicRepo._instance;
  }

  async create(topics: ITopic[], roadmapId: number): Promise<ITopic[]> {
    const query = `
      INSERT INTO topic (roadmap, prerequisites, label, type, description, position_x, position_y, skill_name, is_analysis_needed)
      VALUES
        ${topics
          .map(
            (_, index) =>
              `(${
                index * 8 + 1
              }, ${index * 8 + 2}, ${index * 8 + 3}, ${index * 8 + 4}, ${index * 8 + 5}, ${index * 8 + 6}, ${index * 8 + 7}, ${index * 8 + 8},  ${index * 8 + 9})`,
          )
          .join(', ')}
      RETURNING *;
    `;

    const values = topics.flatMap((topic) => [
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
      const result = await pool.query(query, values);
      return result.rows;
    } catch (error: Error | any) {
      throw new ServerError(error.message, 500, 'RoadmapRepo.create()');
    }
  }
  async delete(roadmapId: number): Promise<void> {
    const query = `DELETE FROM topic WHERE roadmap=$1`;
    try {
      await pool.query(query, [roadmapId]);
    } catch (error: Error | any) {
      throw new ServerError(error.message, 500, 'TopicRepo.delete()');
    }
  }
  async getByRoadmap(roadmapId: number): Promise<ITopic[]> {
    const query = `SELECT * FROM topic WHERE roadmap=$1`;
    try {
      const topics = await pool.query(query, [roadmapId]);
      return topics.rows;
    } catch (error: Error | any) {
      throw new ServerError(error.message, 500, 'TopicRepo.getByRoadmap()');
    }
  }
}
