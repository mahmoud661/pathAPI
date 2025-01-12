dotenv.config();
import dotenv from 'dotenv';
import axios from "axios";


const COURSERA_ACCESS_TOKEN = process.env.COURSERA_ACCESS_TOKEN;

// Function to fetch top courses from Coursera
interface CourseraCourse {
    id: string;
    name: string;
    photoUrl: string;
    slug: string;
}

interface FormattedCourse {
    id: string;
    title: string;
    photoUrl: string;
    url: string;
}

interface CourseResponse {
    courses: FormattedCourse[];
}

export const fetchCourseraCourses = async (keyword: string, limit: number = 6): Promise<CourseResponse> => {
    const encodedSearchTerm = encodeURIComponent(keyword);
    const COURSES_API_URL = `https://api.coursera.org/api/courses.v1?q=search&query=${encodedSearchTerm}&fields=name,photoUrl,slug`; // Fetching top-rated courses without pagination

    const headers = {
        Authorization: `Bearer ${COURSERA_ACCESS_TOKEN}`,
    };

    try {
        const response = await axios.get<{ elements: CourseraCourse[] }>(COURSES_API_URL, { headers });
        return {
            courses: response.data.elements.slice(0, limit).map((course) => ({
                id: course.id,
                title: course.name,
                photoUrl: course.photoUrl,
                url: `https://www.coursera.org/learn/${course.slug}`,
            })),
        };
    } catch (error) {
        console.error('Error fetching Coursera courses:', error);
        return { courses: [] };
    }
};
