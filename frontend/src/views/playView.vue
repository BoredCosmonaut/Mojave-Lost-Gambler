<script setup>
import { onMounted } from 'vue';
import { useGame } from '@/composables/useGame';
import MojaveMap from '@/components/mojaveMap.vue';
import SubmitScoreBox from '@/components/submitScoreBox.vue';
import LoadingOverlay from '@/components/loadingOverlay.vue';

const {
  round,
  roundIndex,
  isGameOver,
  loading,
  lastResult,
  totalScore,
  guessRound,
  startRound,
  submitScore
} = useGame();

onMounted(startRound);

async function onGuess(lat, lng) {
  if (loading.value || isGameOver.value || !round.value?.location) return;
  console.log('Submitting guess:');
  console.log('Player guess ->', { lat, lng });
  console.log('Actual location ->', round.value.location);

  await guessRound(
    round.value.location.x,
    round.value.location.y,
    lat,
    lng
  );
  startRound()
}
</script>

<template>
  <LoadingOverlay v-if="loading" />

  <div class="play-container">

    <header class="top-bar">
      <h1>☢ Mojave GeoGuessr</h1>
      <div class="round-info">
        Round {{ roundIndex }} / 5
        Score: {{ lastResult ? Math.round(lastResult.score) : 0 }}
      </div>
    </header>

    <img
      v-if="round?.location"
      :key="round.location.image_url" 
      :src="`http://localhost:8080${round.location.image_url}`"
      class="round-bg"
    />

    <div class="hud">
      <div class="map-box">
        <MojaveMap 
          @guess="onGuess" 
          :round="roundIndex" 
          :actualLocation="lastResult?.actual"
        />
      </div>
    </div>

    <div 
      v-if="isGameOver" 
      class="submit-score-overlay"
    >
      <SubmitScoreBox
        :score="totalScore"
        @submit="submitScore"
      />
    </div>

  </div>
</template>

<style scoped>

.play-container {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
}

.round-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; 
  z-index: 0;
}


.hud {
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 340px;
  z-index: 10;

  display: flex;
  flex-direction: column;
  gap: 12px;
}

.map-box {
  width: 340px;
  height: 340px;
}

.result-panel {
  background: rgba(20,20,20,0.9);
  padding: 12px;
  border-radius: 12px;
  backdrop-filter: blur(6px);
  color: white;
}

.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 12px 20px;
  z-index: 15;
  background: linear-gradient(to bottom, rgba(0,0,0,.7), transparent);
  color: white;
}

.submit-score-overlay {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 50; 
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
