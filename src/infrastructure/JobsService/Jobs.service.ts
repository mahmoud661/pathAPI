import Logger from '../logger/consoleLogger';
import Job from './types';
import { IJobsService } from './IJobsService';
// eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef
const linkedIn = require('linkedin-jobs-api');

class JobsService implements IJobsService {
  private static _instance: JobsService = new JobsService();
  private constructor() {}
  public static get instance() {
    return JobsService._instance;
  }

  /**
   * Search for jobs on LinkedIn
   * @param keyword
   * @param location
   * @param dateSincePosted
   * @returns {Promise<any>}
   */
  async searchJobs(
    keyword: string,
    location: string,
    dateSincePosted: string,
    option: 'all' | 'count' = 'all',
  ): Promise<Job[] | number> {
    const queryOptions = {
      keyword,
      location,
      dateSincePosted,
    };
    try {
      const result = await linkedIn.query(queryOptions);
      return option === 'all' ? result : result.length;
    } catch (error: Error | any) {
      Logger.Error(error, 'JobsService.searchJobs');
      throw error;
    }
  }
}

export default JobsService;
