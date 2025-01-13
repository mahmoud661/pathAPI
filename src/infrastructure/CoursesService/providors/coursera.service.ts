import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
import { Course } from './types';
const COURSERA_ACCESS_TOKEN = process.env.COURSERA_ACCESS_TOKEN;

// Function to fetch top courses from Coursera
interface CourseraCourse {
  id: string;
  name: string;
  photoUrl: string;
  slug: string;
}


export const fetchCourseraCourses = async (
  keyword: string,
  limit: number = 6,
): Promise<Course[]> => {
  const encodedSearchTerm = encodeURIComponent(keyword);
  const COURSES_API_URL = `https://api.coursera.org/api/courses.v1?q=search&query=${encodedSearchTerm}&fields=name,photoUrl,slug`; // Fetching top-rated courses without pagination

  const headers = {
    Authorization: `Bearer ${COURSERA_ACCESS_TOKEN}`,
  };

  try {
    const response = await axios.get<{ elements: CourseraCourse[] }>(
      COURSES_API_URL,
      { headers },
    );
    return response.data.elements.slice(0, limit).map((course) => ({
      title: course.name,
      photoUrl: course.photoUrl,
      url: `https://www.coursera.org/learn/${course.slug}`,
      platform: 'Coursera',
      price: 'Subscription',
    }));
  } catch (error) {
    console.error('Error fetching Coursera courses:', error);
    return [];
  }
};
