import dotenv from 'dotenv';
import pkg from 'lodash';
dotenv.config();
import { fetchCourseraCourses } from './providors/coursera.service';
import { fetchUdemyCourses } from './providors/Udemy.service';

const { shuffle } = pkg;

// Function to search top courses on both platforms
async function searchCoursesService(query: string, limit = 10) {
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

export default searchCoursesService;
