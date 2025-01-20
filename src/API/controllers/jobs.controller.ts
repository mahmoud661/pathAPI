import { Request, Response } from 'express';
import { IJobsService } from '../../infrastructure/JobsService/IJobsService';
import Logger from '../../infrastructure/logger/consoleLogger';

export class JobsController {
  constructor(private readonly jobsService: IJobsService) {}

  public searchJobs = async (req: Request, res: Response): Promise<void> => {
    try {
      const { keyword, location, dateSincePosted, option } = req.query;

      // TODO: use not empty middleware
      if (!keyword || !location || !dateSincePosted) {
        res.status(400).json({
          success: false,
          message: 'Missing required parameters',
        });
        return;
      }

      const result = await this.jobsService.searchJobs(
        keyword as string,
        location as string,
        dateSincePosted as string,
        (option as 'all' | 'count') || 'all'
      );

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      Logger.Error(error, 'JobsController.searchJobs');
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  };
}
