<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    currentHp: number;
    maxHp: number;
}>();

const percentage = computed(() => (props.currentHp / props.maxHp) * 100);
</script> 

<template>
    <div class="hp-bar">
        <div class="hp-bar-fill" :style="{ width: percentage + '%'}"></div>
        <span class ="hp-bar-text">{{ currentHp }} / {{ maxHp }}</span>
    </div>
</template>

<style scoped>
.hp-bar {
    position: relative;
    width: 100%;
    height: 24px;
    background-color: #333;
    border-radius: 4px;
    overflow: hidden;
}
.hp-bar-fill {
    height: 100%;
    background-color: #c0392b;
    transition: width 0.3s ease;
}
.hp-bar-text {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.8rem;
    font-weight: bold;
}
</style>