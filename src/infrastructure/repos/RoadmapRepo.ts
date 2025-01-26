import { off } from 'process';
import { CustomError } from '../../application/exception/customError';
import { ServerError } from '../../application/exception/serverError';
import { GetRoadmapDTO } from '../../domain/DTOs/roadmap/GetRoadmapDTO';
import { PostRoadmapDTO } from '../../domain/DTOs/roadmap/PostRoadmapDTO';
import { PutRoadmapDTO } from '../../domain/DTOs/roadmap/PutRoadmapDTO';
import { IRoadmap } from '../../domain/entities/IRoadmap';
import { IRoadmapRepo } from '../../domain/IRepo/IRoadmapRepo';
import Logger from '../logger/consoleLogger';
import pool from './DBpool';

export class RoadmapRepo implements IRoadmapRepo {
  private static _instance: RoadmapRepo;
  private constructor() {}

  public static get instance() {
    if (!RoadmapRepo._instance) RoadmapRepo._instance = new RoadmapRepo();
    return RoadmapRepo._instance;
  }

  async create(roadmap: IRoadmap): Promise<IRoadmap> {
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
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error: Error | any) {
      throw new ServerError(error.message, 500, 'RoadmapRepo.create()');
    }
  }

  async update(slug: string, updateData: PutRoadmapDTO): Promise<IRoadmap> {
    const fields = Object.keys(updateData).filter(
      (key) =>
        updateData[key as keyof PutRoadmapDTO] !== undefined &&
        updateData[key as keyof PutRoadmapDTO] !== null,
    );

    if (fields.length === 0) {
      throw new CustomError('No fields to update', 400);
    }

    const setClause = fields
      .map((field, index) => `${field} = $${index + 1}`)
      .join(', ');

    const queryValues: any[] = fields.map(
      (field) => updateData[field as keyof PutRoadmapDTO],
    );

    queryValues.push(slug);

    const query = `
      UPDATE roadmap
      SET ${setClause}
      WHERE slug = $${queryValues.length}
      RETURNING *
    `;

    try {
      const result = await pool.query(query, queryValues);
      if (!result.rows[0]) {
        throw new CustomError('Roadmap not found', 404);
      }
      return result.rows[0];
    } catch (error: Error | any) {
      throw new ServerError(error.message, 500, 'RoadmapRepo.update()');
    }
  }

  async delete(slug: string): Promise<void> {
    const query = 'DELETE FROM roadmap WHERE string = $1';
    try {
      await pool.query(query, [slug]);
    } catch (error: Error | any) {
      throw new CustomError(error.message, 500, 'RoadmapRepo.delete()');
    }
  }

  async getBySlug(slug: string): Promise<IRoadmap> {
    const query = 'SELECT *  FROM roadmap WHERE slug = $1';
    const values = [slug.toLowerCase()];
    try {
      return (await pool.query(query, values)).rows[0];
    } catch (error: Error | any) {
      throw new ServerError(error.message, 500, 'RoadmapRepo.getBySlug()');
    }
  }

  async getById(id: number): Promise<IRoadmap> {
    const query = 'SELECT *  FROM roadmap WHERE id = $1';
    const values = [id];
    try {
      return (await pool.query(query, values)).rows[0];
    } catch (error: Error | any) {
      throw new ServerError(error.message, 500, 'RoadmapRepo.getBySlug()');
    }
  }

  async getAll(
    page: number = 1,
    limit: number = 10,
    keyword: string = '',
  ): Promise<GetRoadmapDTO[]> {
    const offset = (page - 1) * limit;

    // Base query
    let query = `
    SELECT id, title, description, slug, is_official, icon 
    FROM roadmap 
    WHERE visibility = 'public'
  `;

    const values: any[] = [limit, offset];

    // Add keyword filter dynamically if provided
    if (keyword) {
      query += ` AND (title ILIKE $3 OR description ILIKE $3)`;
      values.push(`%${keyword}%`); // Properly parameterize the keyword
    }

    // Add order and limit/offset
    query += ` ORDER BY created_at ASC LIMIT $1 OFFSET $2`;

    try {
      const result = await pool.query(query, values);
      return result.rows;
    } catch (error: Error | any) {
      throw new CustomError(error.message, 500, 'RoadmapRepo.getAll()');
    }
  }

  async count(): Promise<number> {
    const query = "SELECT COUNT(*) FROM roadmap WHERE visibility = 'public'";
    try {
      const result = await pool.query(query);
      return result.rows[0].count;
    } catch (error: Error | any) {
      throw new CustomError(error.message, 500, 'RoadmapRepo.count()');
    }
  }

  async getFollowed(userId: number): Promise<IRoadmap[]> {
    const query = `
      SELECT r.id, r.title, r.description, r.slug, r.icon, r.visibility, r.created_at, r.updated_at
      FROM public.roadmap r
      JOIN public.follow f ON f.roadmap = r.id
      WHERE f.user_id=$1 AND visibility!='hidden';`;
    try {
      const result = await pool.query(query, [userId]);
      return result.rows;
    } catch (error: Error | any) {
      throw new CustomError(error.message, 500, 'RoadmapRepo.getFollowed()');
    }
  }

  async getByCreator(userId: number): Promise<IRoadmap[]> {
    const query = `SELECT * FROM roadmap WHERE creator = ${userId} ORDER BY created_at DESC`;
    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (error: Error | any) {
      throw new CustomError(error.message, 500, 'RoadmapRepo.getByCreator()');
    }
  }

  async getId(slug: string): Promise<number> {
    const query = 'SELECT id FROM roadmap WHERE slug = $1';
    try {
      const result = await pool.query(query, [slug]);
      return result.rows?.[0]?.id;
    } catch (error: Error | any) {
      throw new CustomError(error.message, 500, 'RoadmapRepo.getId()');
    }
  }
}
