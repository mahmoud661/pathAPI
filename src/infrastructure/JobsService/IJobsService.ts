import Job from './types';

export interface IJobsService {
  searchJobs(
    keyword: string,
    location: string,
    dateSincePosted: string,
    option?: 'all' | 'count'
  ): Promise<Job[] | number>;
}
