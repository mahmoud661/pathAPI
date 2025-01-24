import { ServerError } from '../../application/exception/serverError';
import { PostUserDTO } from '../../domain/DTOs/user/PostUserDTO';
import { PutUserDTO } from '../../domain/DTOs/user/PutUserDTO';
import { IUser } from '../../domain/entities/IUser';
import { IUserRepo } from '../../domain/IRepo/IUserRepo';
import Logger from '../logger/consoleLogger';
import pool from './DBpool';

export class UserRepo implements IUserRepo {
  private static _instance: UserRepo;
  private constructor() {}
  /**
   * A getter for the instance of the UserRepo class.
   * This is a singleton implementation, so it will create a new instance
   * if it doesn't already exist.
   * @returns {UserRepo} The instance of the UserRepo class.
   */
  public static get instance() {
    if (!UserRepo._instance) UserRepo._instance = new UserRepo();
    return UserRepo._instance;
  }

  /**
   * Creates a new user and returns the newly created user.
   * @param {IUser} user The user to be created.
   * @returns {Promise<IUser>} The newly created user.
   */
  async create(user: PostUserDTO): Promise<IUser> {
    const query = `INSERT INTO "user" (first_name, last_name, email, password)
    VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [user.first_name, user.last_name, user.email, user.password];

    try {
      return (await pool.query(query, values)).rows[0];
    } catch (error: Error | any) {
      throw new ServerError(error.message, 500, 'userRepo.create()');
    }
  }
  async update(id: number, updateData: PutUserDTO): Promise<IUser> {
    const fields = Object.keys(updateData).filter(
      (key) =>
        updateData[key as keyof PutUserDTO] !== undefined &&
        updateData[key as keyof PutUserDTO] !== null,
    );

    if (fields.length === 0) {
      throw new ServerError(
        'No fields to update',
        500,
        'userRepo.updateUser() -> fields.length',
      );
    }
    fields.push('updated_at');

    const setClause = fields
      .map((field, index) => `${field} = $${index + 1}`)
      .join(', ');
    const values = fields.map((field) => updateData[field as keyof PutUserDTO]);
    values.pop(); //## remove the undefined values comes with 'updated_at' key
    values.push(new Date().toISOString());
    values.push(String(id));

    const query = `
      UPDATE "user"
      SET ${setClause}
      WHERE id = $${values.length}
      RETURNING *;
    `;

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error: Error | any) {
      throw new ServerError(error.message, 500, 'userRepo.updateUser()');
    }
  }
  /**
   * Deletes a user by ID.
   * @param {number} id The ID of the user to be deleted.
   * @returns {Promise<void>} A promise that resolves when the user has been deleted.
   */
  async delete(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  /**
   * Retrieves a user by their ID.
   * @param {number} id - The ID of the user to retrieve.
   * @returns {Promise<IUser>} A promise that resolves to the user with the specified ID.
   * @throws {Error} If the user cannot be found or an error occurs during retrieval.
   */
  async getById(id: number): Promise<IUser> {
    const query = 'SELECT * FROM "user" WHERE id=$1';
    const value = [id];
    try {
      return (await pool.query(query, value)).rows?.[0] as IUser;
    } catch (error: Error | any) {
      throw new ServerError(error.message, 500, 'userRepo.getById()');
    }
  }
  /**
   * Retrieves a user by their email address.
   * @param {string} email The email address to search for.
   * @returns {Promise<IUser>} A promise that resolves to the user with the specified email address.
   * @throws {Error} If the user cannot be found or an error occurs during retrieval.
   */
  async getByEmail(email: string): Promise<IUser> {
    const query = `SELECT * FROM "user" WHERE email=$1`;
    try {
      return (await pool.query(query, [email])).rows?.[0] as IUser;
    } catch (error: Error | any) {
      throw new ServerError(error.message, 500, 'userRepo.getByEmail()');
    }
  }
}
