import searchCoursesService from "../../../infrastructure/CoursesService/CoursesService.service";
import { Response } from 'express';

interface SearchCoursesRequest {
    query: {
        keyword?: string;
        limit?: number;
    };
}

interface SearchCoursesResponse {
    courses: any[]; // Type depends on what searchCoursesService returns
}

export const searchCourses = async (
    req: SearchCoursesRequest,
    res: Response
): Promise<void> => {
    try {
        const { keyword , limit = 5 } = req.query;

        if (!keyword) {
            throw new Error('Keyword is required');
        }
        if (typeof keyword !== 'string') {
            throw new Error('Keyword must be a string');
        }

        const courses = await searchCoursesService(keyword, limit);
        res.status(200).send(courses);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(400).json({ error: errorMessage });
    }
};
