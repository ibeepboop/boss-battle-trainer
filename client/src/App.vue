<script setup lang="ts">
import { ref, onMounted } from 'vue';

const healthStatus = ref<string>('checking...');

onMounted(async () => {
  const healthResponse = await fetch('http://localhost:3000/api/health');
  const healthData = await healthResponse.json();
  healthStatus.value = healthData.status;
});
</script>

<template>
  <h1>Boss Battle Trainer</h1>
  <p>Server health: {{ healthStatus }}</p>
</template>
