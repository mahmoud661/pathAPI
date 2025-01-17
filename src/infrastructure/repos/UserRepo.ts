import { CustomError } from '../../application/exception/customError';
import { PostUserDTO } from '../../domain/DTOs/user/PostUserDTO';
import { PutUserDTO } from '../../domain/DTOs/user/PutUserDTO';
import { IUser } from '../../domain/entities/IUser';
import { IUserRepo } from '../../domain/IRepo/IUserRepo';
import pool from './DBpool';

export class UserRepo implements IUserRepo {
  private static _instance: UserRepo;
  private constructor() {}

  public static get instance() {
    if (!UserRepo._instance) UserRepo._instance = new UserRepo();
    return UserRepo._instance;
  }

  async create(user: PostUserDTO): Promise<IUser> {
    const query = `INSERT INTO "user" (first_name, last_name, email, password)
    VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [user.first_name, user.last_name, user.email, user.password];

    try {
      return (await pool.query(query, values)).rows[0];
    } catch (error: Error | any) {
      throw new CustomError(error.message, 500, 'userRepo.create()');
    }
  }

  async update(id: number, updateData: PutUserDTO): Promise<IUser> {
    const fields = Object.keys(updateData).filter(
      (key) =>
        updateData[key as keyof PutUserDTO] !== undefined &&
        updateData[key as keyof PutUserDTO] !== null,
    );

    if (fields.length === 0) {
      throw new CustomError('No fields to update', 400, 'userRepo.update()');
    }

    // Create values array with proper types
    const queryValues: (string | boolean | Buffer | null)[] = fields.map(
      (field) => updateData[field as keyof PutUserDTO] ?? null,
    );

    const setClause = fields
      .map((field, index) => `${field} = $${index + 1}`)
      .join(', ');

    // Convert id to string for the query
    queryValues.push(id.toString());

    const query = `
      UPDATE "user"
      SET ${setClause}, updated_at = NOW()
      WHERE id = $${queryValues.length}
      RETURNING *
    `;

    try {
      const result = await pool.query(query, queryValues);
      if (!result.rows[0]) {
        throw new CustomError('User not found', 404);
      }
      return result.rows[0];
    } catch (error: Error | any) {
      throw new CustomError(error.message, 500, 'userRepo.update()');
    }
  }

  async delete(id: number): Promise<void> {
    const query = 'DELETE FROM "user" WHERE id = $1';
    try {
      await pool.query(query, [id.toString()]);
    } catch (error: Error | any) {
      throw new CustomError(error.message, 500, 'userRepo.delete()');
    }
  }

  async getById(id: number): Promise<IUser> {
    const query = 'SELECT * FROM "user" WHERE id = $1';
    try {
      const result = await pool.query(query, [id.toString()]);
      if (!result.rows[0]) {
        throw new CustomError('User not found', 404);
      }
      return result.rows[0];
    } catch (error: Error | any) {
      throw new CustomError(error.message, 500, 'userRepo.getById()');
    }
  }

  async getByEmail(email: string): Promise<IUser> {
    const query = 'SELECT * FROM "user" WHERE email = $1';
    try {
      const result = await pool.query(query, [email]);
      return result.rows[0];
    } catch (error: Error | any) {
      throw new CustomError(error.message, 500, 'userRepo.getByEmail()');
    }
  }
}
