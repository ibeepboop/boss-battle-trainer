<script setup lang="ts">
import { onMounted } from 'vue';
import { usePlayerStore } from '../stores/player';
import { useBossStore } from '../stores/boss';
import StatBlock from '../components/StatBlock.vue';
import BossCard from '../components/BossCard.vue';

const playerStore = usePlayerStore();
const bossStore = useBossStore();

onMounted(async () => {
    await playerStore.fetchPlayer();
    await bossStore.fetchBosses();
});
</script>

<template>
    <div class="dashboard">
        <StatBlock v-if="playerStore.player" :player="playerStore.player" />
        <BossCard v-if="bossStore.currentBoss" :boss="bossStore.currentBoss" />
    </div>
</template>