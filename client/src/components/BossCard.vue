<script setup lang="ts">
import type { Boss } from '@boss-battle-trainer/shared';
import HpBar from './HpBar.vue';

defineProps<{
    boss: Boss;
}>();
</script>

<template>
    <div class="boss-card">
        <h2>{{ boss.name }}</h2>
        <p class="flavor-text">{{ boss.flavorText }}</p>
        <HpBar :current-hp="boss.currentHp" :max-hp="boss.maxHp" />
    </div>
</template>

<style scoped>
.flavor-text {
    font-style: italic;
    color: #aaa;
}
</style>