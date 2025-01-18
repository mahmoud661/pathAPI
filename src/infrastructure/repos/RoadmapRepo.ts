import { CustomError } from '../../application/exception/customError';
import { PostRoadmapDTO } from '../../domain/DTOs/roadmap/PostRoadmapDTO';
import { PutRoadmapDTO } from '../../domain/DTOs/roadmap/PutRoadmapDTO';
import { IRoadmap } from '../../domain/entities/IRoadmap';
import { IRoadmapRepo } from '../../domain/IRepo/IRoadmapRepo';
import pool from './DBpool';

export class RoadmapRepo implements IRoadmapRepo {
  private static _instance: RoadmapRepo;
  private constructor() {}

  public static get instance() {
    if (!RoadmapRepo._instance) RoadmapRepo._instance = new RoadmapRepo();
    return RoadmapRepo._instance;
  }

  async create(roadmap: PostRoadmapDTO): Promise<IRoadmap> {
    const query = `
      INSERT INTO roadmap (title, description, icon, resources)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [
      roadmap.title,
      roadmap.description,
      roadmap.icon,
      JSON.stringify(roadmap.resources),
    ];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error: Error | any) {
      throw new CustomError(error.message, 500, 'RoadmapRepo.create()');
    }
  }

  async update(id: number, updateData: PutRoadmapDTO): Promise<IRoadmap> {
    const fields = Object.keys(updateData).filter(
      (key) => updateData[key as keyof PutRoadmapDTO] !== undefined,
    );

    if (fields.length === 0) {
      throw new CustomError('No fields to update', 400);
    }

    const setClause = fields
      .map((field, index) => `${field} = $${index + 1}`)
      .join(', ');

    // Create values array with proper types
    const queryValues: any[] = fields.map((field) => {
      const value = updateData[field as keyof PutRoadmapDTO];
      return field === 'resources' ? JSON.stringify(value) : value;
    });

    // Add id as the last parameter
    queryValues.push(id);

    const query = `
      UPDATE roadmap
      SET ${setClause}, updated_at = NOW()
      WHERE id = $${queryValues.length}
      RETURNING *
    `;

    try {
      const result = await pool.query(query, queryValues);
      if (!result.rows[0]) {
        throw new CustomError('Roadmap not found', 404);
      }
      return result.rows[0];
    } catch (error: Error | any) {
      throw new CustomError(error.message, 500, 'RoadmapRepo.update()');
    }
  }

  async delete(id: number): Promise<void> {
    const query = 'DELETE FROM roadmap WHERE id = $1';
    try {
      await pool.query(query, [id]);
    } catch (error: Error | any) {
      throw new CustomError(error.message, 500, 'RoadmapRepo.delete()');
    }
  }

  async getById(id: number): Promise<IRoadmap> {
    const query = 'SELECT * FROM roadmap WHERE id = $1';
    try {
      const result = await pool.query(query, [id]);
      if (!result.rows[0]) {
        throw new CustomError('Roadmap not found', 404);
      }
      return result.rows[0];
    } catch (error: Error | any) {
      throw new CustomError(error.message, 500, 'RoadmapRepo.getById()');
    }
  }

  async getAll(): Promise<IRoadmap[]> {
    const query = 'SELECT * FROM roadmap ORDER BY created_at DESC';
    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (error: Error | any) {
      throw new CustomError(error.message, 500, 'RoadmapRepo.getAll()');
    }
  }
}