import { CustomError } from '../../application/exception/customError';
import { ServerError } from '../../application/exception/serverError';
import { IEdge } from '../../domain/entities/IEdge';
import { IEdgeRepo } from '../../domain/IRepo/IEdgeRepo';
import Logger from '../logger/consoleLogger';
import pool from './DBpool';

export class EdgeRepo implements IEdgeRepo {
  private static _instance: EdgeRepo;
  private constructor() {}
  public static get instance() {
    if (!EdgeRepo._instance) EdgeRepo._instance = new EdgeRepo();
    return EdgeRepo._instance;
  }
  async create(edges: IEdge[], roadmapId: number): Promise<void> {
    Logger.Debug('EdgeRepo.create()');
    if (edges.length === 0) return;
    const query = `
    INSERT INTO edge (id, roadmap, source, target, target_handle, source_handle, line_style, animation, type)
    VALUES
      ${edges
        .map(
          (_, index) =>
            `($${index * 9 + 1}, $${index * 9 + 2}, $${index * 9 + 3},$${index * 9 + 4}, $${index * 9 + 5},
            $${index * 9 + 6}, $${index * 9 + 7}, $${index * 9 + 8}, $${index * 9 + 9})`,
        )
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
      const result = (await pool.query(query, values)).rowCount;
      if (edgesBefore + edges.length !== result)
        throw new CustomError('Error creating edges', 500);
      return;
    } catch (error: Error | any) {
      if (!(error instanceof CustomError))
        throw new ServerError(error.message, 500, 'EdgeRepo.create()');
      throw error;
    }
  }
  async delete(roadmapId: number): Promise<void> {
    Logger.Debug('EdgeRepo.delete()');
    const query = `DELETE FROM edge WHERE roadmap=$1`;
    try {
      await pool.query(query, [roadmapId]);
    } catch (error: Error | any) {
      throw new ServerError(error.message, 500, 'EdgeRepo.delete()');
    }
  }
  async getByRoadmap(roadmapId: number): Promise<IEdge[]> {
    const query = `SELECT * FROM edge WHERE roadmap=$1`;
    try {
      return (await pool.query(query, [roadmapId])).rows;
    } catch (error: Error | any) {
      throw new ServerError(error.message, 500, 'EdgeRepo.getByRoadmap()');
    }
  }
}
