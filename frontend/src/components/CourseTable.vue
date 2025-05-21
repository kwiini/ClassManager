<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useCourseStore } from '../stores/courseStore'
import CourseRow from './CourseRow.vue'

const courseStore = useCourseStore()
const courses = computed(() => courseStore.courses)

onMounted(() => {
  courseStore.fetchCourses()
})

function remove(id: number) {
  courseStore.removeCourse(id)
}
</script>

<template>
  <div>
    <p v-if="courses.length === 0">暂无课程</p>
    <table v-else class="w-full border mt-6 text-left">
      <thead class="bg-gray-100">
        <tr>
          <th class="p-2 border">课程编号</th>
          <th class="p-2 border">课程名称</th>
          <th class="p-2 border">授课老师</th>
          <th class="p-2 border">操作</th>
        </tr>
      </thead>
      <tbody>
        <CourseRow
          v-for="course in courses"
          :key="course.id"
          :course="course"
          @delete="remove"
        />
      </tbody>
    </table>
  </div>
</template>