import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
import { Course } from './types';

// API credentials
const clientId = process.env.UDEMY_CLIENT_ID;
const clientSecret = process.env.UDEMY_CLIENT_SECRET;

// Function to fetch top courses from Udemy
interface UdemyCourse {
  title: string;
  image_240x135: string;
  url: string;
  platform: string;
    price: string;
}

interface UdemyApiResponse {
  results: UdemyCourse[];
}

export async function fetchUdemyCourses(
  keyword: string,
  limit: number = 5,
): Promise<Course[]> {

  const base64Credentials = btoa(`${clientId}:${clientSecret}`);

  const url = `https://www.udemy.com/api-2.0/courses/?search=${encodeURIComponent(
    keyword,
  )}&page_size=${limit}&page=1&ordering=highest_rated`;

  try {
    const response = await axios.get<UdemyApiResponse>(url, {
      headers: {
        Authorization: `Basic blpldm9vcFUwYnlTdHB6VXFnNGliU2g0TTE1UXBvbmNDOGFBUEtRQToxM29zQ0tmYVpSMWFneVFianl5SjdtSjNLeGxGaWhaYUZ3UTJ5WFJSYTJMUmgxb21kOGNWRExwS2VQQTBHbG1hOXUzUGJMQ040Y3Brc0lBT2dORlpCUUsxeHI2cUlnSkJoVFl0ZGVoQ1RFV2JBOTgwQmJQQU9jOUFiRDRJempEZw==`,
      },
    });

    return response.data.results.map((course) => ({
      title: course.title,
      photoUrl: course.image_240x135,
      url: `https://www.udemy.com${course.url}`,
      platform : "Udemy",
      price : course.price
    }));

  } 
  catch (error) {
    console.error('Error fetching Udemy courses:', error);
    return [];

  }

}
