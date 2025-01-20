import { Request, Response } from 'express';
import { ICoursesService } from '../../infrastructure/CoursesService/ICoursesService';
import Logger from '../../infrastructure/logger/consoleLogger';

export class CoursesController {
  constructor(private readonly coursesService: ICoursesService) {}

  public searchCourses = async (req: Request, res: Response): Promise<void> => {
    try {
      const { keyword, limit = 5 } = req.query;

      if (!keyword || typeof keyword !== 'string') {
        res.status(400).json({
          success: false,
          message: 'Valid keyword is required',
        });
        return;
      }

      const result = await this.coursesService.searchCourses(
        keyword,
        Number(limit)
      );

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      Logger.Error(error, 'CoursesController.searchCourses');
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  };
}
