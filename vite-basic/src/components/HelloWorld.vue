<template>
  <div>
    <p>{{ msg }}</p>
    <button @click="handleAdd">Add {{ count }}</button>
  </div>
</template>

<script setup lang="ts">
import useCount from '../hooks/useCount'

defineProps<{
  msg: string
}>()

const { count, handleAdd } = useCount()
</script>

<style scoped></style>
