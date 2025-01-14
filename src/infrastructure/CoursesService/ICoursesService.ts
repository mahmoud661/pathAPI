export interface CourseSearchResult {
  courses: any[];
  totalCourses: number;
}

export interface ICoursesService {
  searchCourses(keyword: string, limit: number): Promise<CourseSearchResult>;
}
