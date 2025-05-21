<script setup lang="ts">
import { reactive } from 'vue'
import { useCourseStore } from '../stores/courseStore'
import type { Course } from '../types/course'

const courseStore = useCourseStore()

const course = reactive<Course>({
  id: 0,
  name: '',
  teacher: ''
})

function handleSubmit() {
  if (!course.id || !course.name.trim() || !course.teacher.trim()) {
    alert('请填写完整信息')
    return
  }
  courseStore.addCourse({ ...course })
  course.id = 0
  course.name = ''
  course.teacher = ''
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="flex flex-wrap gap-4 items-center">
    <input v-model.number="course.id" type="number" placeholder="课程编号" class="input-text" />
    <input v-model="course.name" type="text" placeholder="课程名称" class="input-text" />
    <input v-model="course.teacher" type="text" placeholder="授课老师" class="input-text" />
    <button type="submit" class="btn-success">添加课程</button>
  </form>
</template>
