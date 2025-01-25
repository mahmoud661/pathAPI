import { ServerError } from '../../application/exception/serverError';
import { IResource } from '../../domain/entities/IResource';
import { IResourceRepo } from '../../domain/IRepo/IResoureRepo';
import Logger from '../logger/consoleLogger';
import pool from './DBpool';

export class ResourceRepo implements IResourceRepo {
  private static _instance: ResourceRepo;
  private constructor() {}
  public static get instance() {
    if (!ResourceRepo._instance) ResourceRepo._instance = new ResourceRepo();
    return ResourceRepo._instance;
  }

  async create(resources: IResource[]): Promise<IResource[]> {
    const query = `
      INSERT INTO roadmap_resource (roadmap, title, link, icon)
      VALUES
        ${resources
          .map(
            (_, index) =>
              `($${index * 4 + 1},
            $${index * 4 + 2},
            $${index * 4 + 3},
            $${index * 4 + 4})`,
          )
          .join(', ')};
    `;
    const values = resources.flatMap((resource) => [
      resource.roadmap,
      resource.title,
      resource.link,
      resource.icon,
    ]);
    try {
      return (await pool.query(query, values)).rows;
    } catch (error: Error | any) {
      throw new ServerError(error.message, 500, 'ResourceRepo.create()');
    }
  }

  async delete(roadmapId: number): Promise<void> {
    const query = 'DELETE FROM roadmap_resource WHERE roadmap = $1';

    try {
      await pool.query(query, [roadmapId]);
    } catch (Error: Error | any) {
      throw new ServerError(Error.message, 500, 'ResourceRepo.delete()');
    }
  }

  async getByRoadmap(roadmapId: number): Promise<IResource[]> {
    const query = `SELECT * FROM roadmap_resource WHERE roadmap = $1`;
    try {
      return (await pool.query(query, [roadmapId])).rows;
    } catch (error: Error | any) {
      throw new ServerError(error.message, 500, 'ResourceRepo.getByRoadmap()');
    }
  }
}
