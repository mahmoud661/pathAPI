import dotenv from 'dotenv';
import pkg from 'lodash';
dotenv.config();
import { fetchCourseraCourses } from './providors/coursera.service';
import { fetchUdemyCourses } from './providors/Udemy.service';

const { shuffle } = pkg;


class CourseService {
  private static _instance: CourseService = new CourseService();
  private constructor() {}

  public static get instance() {
    return CourseService._instance;
  }

  /**
   * Search for courses on both platforms
   * @param query
   * @param limit
   * @returns {Promise<{courses: any[]; totalCourses: number}>}
   */

  async searchCourses(query: string, limit = 10) {
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

export default CourseService;