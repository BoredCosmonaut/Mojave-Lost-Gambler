<script setup>
import { onMounted, watch,computed } from 'vue';
import { useGame } from '@/composables/useGame';
import MojaveMap from '@/components/mojaveMap.vue';
import ZionMap from '@/components/zionMap.vue';
import DivideMap from '@/components/divideMap.vue';
import BigMTMap from '@/components/bigMTMap.vue';
import SierraMap from '@/components/sierraMap.vue';
import LoadingOverlay from '@/components/loadingOverlay.vue';
import { useRouter,useRoute } from 'vue-router';
import { useTransition,TransitionPresets } from '@vueuse/core';
const {
  round,
  roundIndex,
  isGameOver,
  loading,
  lastResult,
  totalScore,
  guessRound,
  startRound,
} = useGame();

const router = useRouter()
const route = useRoute();

const mapRegistry = {
  mojave:MojaveMap,
  zion:ZionMap,
  divide:DivideMap,
  big_mt:BigMTMap,
  sierra_madre:SierraMap
};

const activeMapComponent = computed(() => {
  const zone = route.params.zone || 'mojave';
  return mapRegistry[zone] || MojaveMap;
})

onMounted(startRound);
watch(isGameOver, (gameOver) => {
  if(gameOver) {
    router.push('/submitScore')
  }
})

const output = useTransition(totalScore,{
  duration:1000,
  transition:TransitionPresets.easeOutExpo
})

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
}

function handleNextRound() {
  startRound();
}
const displayedScore = computed(() => Math.round(output.value));
</script>

<template>
  <LoadingOverlay v-if="loading" />

  <div class="play-container">
    <img
      v-if="round?.location"
      :key="round.location.image_url" 
      :src="round.location.image_url"
      class="round-bg"
    />

    <header class="hud-top">
      <div class="hud-item">
        <span class="label">LOCATION_INDEX:</span> 
        <span class="value">{{ roundIndex }} / 5</span>
      </div>
      <div class="hud-item">
        <span class="label">TOTAL_SCORE:</span> 
        <span class="value">{{displayedScore}}</span>
      </div>
    </header>

    <div class="hud-bottom-right">
      <div class="map-frame">
        <component
          :is="activeMapComponent"
          @guess="onGuess"
          @next-round="handleNextRound" 
          :round="roundIndex" 
          :actualLocation="lastResult?.actual"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.play-container {
  height: 100vh;
  width: 100vw;
  background: #000;
  color: #ffb642;
  font-family: monospace;
}

.round-bg {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; 
  z-index: 0;
  opacity: 1; 
  filter: none;
}


.hud-top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 25px 30px;
  z-index: 10;
  background: linear-gradient(to bottom, 
    rgba(0, 0, 0, 0.7) 0%, 
    rgba(0, 0, 0, 0.4) 60%, 
    transparent 100%);
}

.label, .value {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 1);
}

.label {
  font-size: 0.8rem;
  margin-right: 10px;
  color: #ffb642;
  opacity: 0.9;
}

.value {
  font-weight: bold;
  font-size: 1.2rem;
  color: #ffb642;
}
/* MAP HUD */
.hud-bottom-right {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 10;
}

.map-frame {
  width: 340px;
  height: 340px;
  overflow: hidden; 
}


:deep(.leaflet-container) {
  background: transparent !important;
  filter: none !important; 
}

:deep(.leaflet-bar), 
:deep(.leaflet-control) {
  border: 1px solid #ffb642 !important;
  border-radius: 0 !important;
  background: rgba(0, 0, 0, 0.7) !important;
  color: #ffb642 !important;
}


</style>