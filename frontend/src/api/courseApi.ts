import axios from "axios";
import type { Course } from "../types/course";

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000'
})

export const getCourses = async (): Promise<Course[]> => {
    const res = await api.get<Course[]>('/courses')
    return res.data
}

export const postCourse = async (course: Course): Promise<void> => {
    await api.post('/courses', course)
}

export const deleteCourseById = async (id: number): Promise<void> => {
    await api.delete(`/course/${id}`)
}