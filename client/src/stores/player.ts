import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Player } from '@boss-battle-trainer/shared';
import { apiGet } from '../api/client';

export const usePlayerStore = defineStore('player', () => {
    const player = ref<Player | null>(null);
    
    async function fetchPlayer() {
        player.value = await apiGet<Player>('/player');
    }

    return { player, fetchPlayer };
});
