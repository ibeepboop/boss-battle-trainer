<script setup lang="ts">
import type { Player } from '@boss-battle-trainer/shared';

defineProps<{
    player: Player;
}> ();
</script>

<template>
    <div class="stat-block">
        <h2>{{ player.name }}</h2>
        <p>Level {{ player.level }}</p>
        <p>XP: {{ player.xp }} / {{ player.xpToNextLevel }}</p>
        <p>STR: {{ player.str }} &nbsp; STA: {{ player.sta }}</p>
        <p v-if="player.unspentStatPoints > 0">Unspent stat points: {{ player.unspentStatPoints }}</p>
    </div>
</template>