
<script setup>
    import {onMounted,computed, ref} from 'vue'
    import { useRouter } from 'vue-router';
    import { useGame } from '@/composables/useGame';

    const game = useGame();
    const router = useRouter();
    const regions = [
      { name: "mojave", color: "#ffb642", bg: "/bgs/bg-new-vegas.jpg" },
      { name: "zion", color: "#1eff00", bg: "/bgs/honest-hearts-bg.jpg" }, 
      { name: "divide", color: "#ff4444", bg: "/bgs/lonesome-road-bg.jpg" },
      { name: "big_mt", color: "#00ccff", bg: "/bgs/owb-bg.jpg" },
      { name: "sierra_madre", color: "#ff3300", bg: "/bgs/dead-money-bg.jpg" }
    ];

    const selectedIndex = ref(0);
    const currentRegion = computed(() => regions[selectedIndex.value]);

    const toggleRegion = () => {
      selectedIndex.value = (selectedIndex.value + 1) % regions.length;
    }

    const handleButtonClick = () => {
        router.push(`/play/${currentRegion.value.name}`)
    };

    const displayScores = computed(() => game.topScores.value);
    onMounted(async() => {
        await game.getTopScores();
        console.log("Scores updated:", game.topScores.value);
    })

</script>

<template>
    <div class="home-screen" :style="{'--theme-color': currentRegion.color}">
      <transition name="fade-bg">
        <div 
          :key="currentRegion.name" 
          class="bg-image" 
          :style="{ backgroundImage: `url(${currentRegion.bg})` }"
        ></div>
      </transition>
        <div class="content">
            <header>
              <h1 class="logo">Lost <span>Courier</span></h1>
              <p class="status-text clickable" @click="toggleRegion">
                LOCATION: {{ currentRegion.name }}
              </p>
            </header>

            <div class="actions">
                <button @click="handleButtonClick" class="btn-start">Start Trek</button>
                <button @click="router.push('/submit')" class="btn-secondary">
                  [ Contribute_Data ]
                </button>
            </div>

            <div v-if="displayScores?.length > 0" class="leaderboard-preview">
                <h2 class="section-title">Top Scores</h2>
                <div class="score-list">
                  <div v-for="(entry, index) in displayScores.slice(0, 10)" :key="index" class="score-item">
                      <span class="name">{{ entry.player_name }}</span> 
                      
                      <span class="dots"></span>
                      
                      <span class="region">{{ entry.region }}</span>

                      <span class="dots"></span>

                      <span class="score">{{ entry.score }}</span>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.home-screen {
  height: 100vh;
  background-color: #0a0a0a;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  color: var(--theme-color);
  font-family: 'Inter', sans-serif;
  transition: color 0.6s ease-in-out;
}

.bg-image {
  position: absolute;
  inset: 0;
  opacity: 0.4;
  filter: sepia(100%) saturate(200%) brightness(0.3);
  z-index: 0;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transition: filter 0.6s ease-in-out;
}

.fade-bg-enter-active,
.fade-bg-leave-active {
  transition: opacity 1.2s ease-in-out;
}

.fade-bg-enter-from,
.fade-bg-leave-to {
  opacity: 0;
}

.fade-bg-enter-to {
  opacity: 0.4;
}

.content {
  z-index: 1;
  text-align: center;
}

.logo {
  color: var(--theme-color);
  font-size: 3.5rem;
  letter-spacing: 0.8rem;
  font-weight: 200;
  margin: 0;
  text-transform: uppercase;
  transition: color 0.6s ease;
}

.logo span {
  font-weight: 800;
}

.divider {
  height: 2px;
  width: 80px;
  background: var(--theme-color);
  margin: 1.5rem auto;
  transition: background 0.6s ease;
}

.status-text {
  font-family: monospace;
  font-size: 0.9rem;
  letter-spacing: 0.3rem;
  margin-bottom: 4rem;
  margin-top: 2rem;
  color: var(--theme-color);
  opacity: 0.7;
}

.clickable {
  cursor: pointer;
  user-select: none;
}

.clickable:hover {
  opacity: 1;
  text-decoration: underline;
  text-underline-offset: 8px;
}
.actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.btn-secondary {
  background: transparent;
  border: none;
  color: var(--theme-color);
  font-family: monospace;
  font-size: 0.8rem;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
  cursor: pointer;
  opacity: 0.6;
  transition: all 0.3s ease;
  padding: 10px;
}

.btn-secondary:hover {
  opacity: 1;
  letter-spacing: 0.3rem; 
}

.btn-start {
  background: transparent;
  border: 1px solid var(--theme-color);
  color: var(--theme-color);
  padding: 1.2rem 3.5rem;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.4rem;
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.btn-start:hover {
  background: var(--theme-color);
  color: #0a0a0a; 
}

.leaderboard-preview {
  margin-top: 4rem;
  animation: fadeIn 2s ease-in;
}

.section-title {
  font-size: 0.75rem;
  letter-spacing: 0.4rem;
  color: var(--theme-color);
  opacity: 0.6;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
}

.score-list {
  max-width: 320px;
  margin: 0 auto;
}

.score-item {
    display: flex;
    align-items: center;
    width: 100%;
    font-family: monospace;
    font-size: 0.9rem;
    margin-bottom: 0.6rem;
}


.name {
    width: 80px; 
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}


.dots {
    flex-grow: 1;
    border-bottom: 1px dotted var(--theme-color);
    margin: 0 10px;
    opacity: 0.2;
}


.region {
    text-transform: uppercase;
    font-weight: 400;
    opacity: 0.8;
    min-width: 80px;
    text-align: center;
}


.score {
    width: 60px;
    text-align: right;
    font-weight: 800;
}

.rank {
    margin-right: 10px;
    opacity: 0.5;
}
.val {
  font-weight: 800;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>