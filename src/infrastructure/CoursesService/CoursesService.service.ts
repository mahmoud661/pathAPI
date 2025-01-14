import dotenv from 'dotenv';
import pkg from 'lodash';
dotenv.config();
import { fetchCourseraCourses } from './providors/coursera.service';
import { fetchUdemyCourses } from './providors/Udemy.service';
import { ICoursesService, CourseSearchResult } from './ICoursesService';

const { shuffle } = pkg;


class CoursesService implements ICoursesService {
  private static _instance: CoursesService = new CoursesService();
  private constructor() {}

  public static get instance(): CoursesService {
    return CoursesService._instance;
  }

  /**
   * Search for courses on both platforms
   * @param query
   * @param limit
   * @returns {Promise<{courses: any[]; totalCourses: number}>}
   */

  async searchCourses(query: string, limit = 10): Promise<CourseSearchResult> {
    const udemyLimit = limit; // Limit for Udemy courses
    const courseraLimit = limit; // Limit for Coursera courses

    // Fetch top courses from both platforms
    const udemyCourses = await fetchUdemyCourses(query, udemyLimit);
    const courseraCourses = await fetchCourseraCourses(query, courseraLimit);

    // Combine the results
    const combinedCourses = [...udemyCourses, ...courseraCourses];

    return {
      courses: shuffle(combinedCourses),
      totalCourses: combinedCourses.length,
    };
    
}


}

export default CoursesService;