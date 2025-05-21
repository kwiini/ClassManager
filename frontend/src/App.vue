<script setup lang="ts">
import CourseForm from './components/CourseForm.vue'
import CourseTable from './components/CourseTable.vue'
</script>

<template>
  <div class="max-w-4xl mx-auto p-8">
    <h1 class="text-5xl font-bold mb-6">课程管理系统</h1>
    <CourseForm />
    <CourseTable />
  </div>
</template>
