import { defineStore } from "pinia";
import type { Course } from "../types/course";
import { deleteCourseById, getCourses, postCourse } from "../api/courseApi";

export const useCourseStore = defineStore('course', {
    state: () => ({
        courses: [] as Course[]
    }),
    actions: {
        async fetchCourses() {
            this.courses = await getCourses()
        },
        async addCourse(course: Course) {
            await postCourse(course)
            this.fetchCourses()
        },
        async removeCourse(id: number) {
            await deleteCourseById(id)
            this.fetchCourses()
        }
    }
})