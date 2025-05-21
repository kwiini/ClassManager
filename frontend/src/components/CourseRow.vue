<script setup lang="ts">
import type { Course } from '../types/course'

defineProps<{
  course: Course
}>()

defineEmits<{
  (e: 'delete', id: number): void
}>()
</script>

<template>
  <tr class="hover:bg-gray-50">
    <td class="p-2 border">{{ course.id }}</td>
    <td class="p-2 border">{{ course.name }}</td>
    <td class="p-2 border">{{ course.teacher }}</td>
    <td class="p-2 border">
      <button class="text-red-500 hover:underline" @click="$emit('delete', course.id)">
        删除
      </button>
    </td>
  </tr>
</template>