<script setup lang="ts">
import { ref, onMounted } from 'vue';

const healthStatus = ref<string>('checking...');

onMounted(async () => {
  const response = await fetch('http://localhost:3000/api/health');
  const data = await response.json();
  healthStatus.value = data.status;
});
</script>

<template>
  <h1>Boss Battle Trainer</h1>
  <p>Server health: {{ healthStatus }}</p>
</template>
