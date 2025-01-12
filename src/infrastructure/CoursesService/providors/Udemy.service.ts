import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
import { Course } from './types';

// API credentials
const clientId = process.env.UDEMY_CLIENT_ID;
const clientSecret = process.env.UDEMY_CLIENT_SECRET;

console.log('Udemy credentials:', clientId, clientSecret);
// Function to fetch top courses from Udemy
interface UdemyCourse {
  title: string;
  image_240x135: string;
  url: string;
}

interface UdemyApiResponse {
  results: UdemyCourse[];
}

export async function fetchUdemyCourses(
  keyword: string,
  limit: number = 6,
): Promise<Course[]> {
  const base64Credentials = btoa(`${clientId}:${clientSecret}`);
  const url = `https://www.udemy.com/api-2.0/courses/?search=${encodeURIComponent(
    keyword,
  )}&page_size=${limit}&page=1&ordering=highest_rated`;

  try {
    const response = await axios.get<UdemyApiResponse>(url, {
      headers: {
        Authorization: `Basic ${base64Credentials}`,
      },
    });

    return response.data.results.map((course) => ({
      title: course.title,
      photoUrl: course.image_240x135,
      url: `https://www.udemy.com${course.url}`,
    }));
  } catch (error) {
    console.error('Error fetching Udemy courses:', error);
    return [];
  }
}
