import { ServerError } from '../../application/exception/serverError';
import { ITopic } from '../../domain/entities/ITopic';
import { ITopicRepo } from '../../domain/IRepo/ITopicRepo';
import Logger from '../logger/consoleLogger';
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
      INSERT INTO topic (id, roadmap, prerequisites, label, type, description, position_x, position_y, skill_name, is_analysis_needed)
      VALUES
        ${topics
          .map(
            (_, index) =>
              `($${index * 10 + 1},
             $${index * 10 + 2},
               $${index * 10 + 3},
                $${index * 10 + 4},
                 $${index * 10 + 5},
                  $${index * 10 + 6},
                   $${index * 10 + 7},
                    $${index * 10 + 8},
                     $${index * 10 + 9},
                     $${index * 10 + 10})`,
          )
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
    console.clear();
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
