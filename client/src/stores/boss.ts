import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Boss } from '@boss-battle-trainer/shared';
import { apiGet } from '../api/client';

export const useBossStore = defineStore('boss', () => {
    const bosses = ref<Boss[]>([]);

    const currentBoss = computed(() => bosses.value.find((boss) => !boss.defeated));

    async function fetchBosses() {
        bosses.value = await apiGet<Boss[]>('/bosses');
    }

    return { bosses, currentBoss, fetchBosses };
});