
<script setup>
    import {onMounted,computed} from 'vue'
    import { useRouter } from 'vue-router';
    import { useGame } from '@/composables/useGame';

    const game = useGame();
    const router = useRouter();

    const handleButtonClick = () => {
        router.push('/play')
    };

    const displayScores = computed(() => game.topScores.value);
    onMounted(async() => {
        await game.getTopScores();
        console.log("Scores updated:", game.topScores.value);
    })

</script>

<template>
    <div class="home-screen">
        <div class="bg-coords">36.1167° N, 115.1750° W</div>
        <div class="content">
            <header>
                <h1 class="logo">Lost <span>Courier</span></h1>
                <div class="divider"></div>
                <p class="status-text">Mojave Wasteland</p>
            </header>

            <div class="actions">
                <button @click="handleButtonClick" class="btn-start">Start Trek</button>
            </div>

            <div v-if="displayScores?.length > 0" class="leaderboard-preview">
                <h2 class="section-title">Top Scores</h2>
                <div class="score-list">
                    <div v-for="(entry, index) in displayScores.slice(0, 10)" :key="index" class="score-item">
                        <span class="rank">{{ index < 9 ? '0' : '' }}{{ index + 1 }}</span>
                        
                        <span class="name">{{ entry.player_name }}</span> 
                        
                        <span class="dots"></span>
                        <span class="val">{{ entry.score }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.home-screen {
  height: 100vh;
  background-color: #ffffff; 
  color: #2d5a27; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif; 
  overflow: hidden;
  position: relative;
}

.bg-coords {
  position: absolute;
  font-family: monospace;
  font-size: 15vw;
  font-weight: 900;
  opacity: 0.03; 
  white-space: nowrap;
  pointer-events: none;
  z-index: 0;
}

.content {
  z-index: 1;
  text-align: center;
}

.logo {
  font-size: 3.5rem;
  letter-spacing: 0.8rem;
  font-weight: 200;
  margin: 0;
}

.logo span {
  font-weight: 800;
}

.divider {
  height: 1px;
  width: 60px;
  background: #2d5a27;
  margin: 1.5rem auto;
  opacity: 0.5;
}

.status-text {
  font-family: monospace;
  font-size: 0.9rem;
  letter-spacing: 0.2rem;
  margin-bottom: 4rem;
}

.btn-start {
  background: transparent;
  border: 1px solid #2d5a27;
  color: #2d5a27;
  padding: 1.2rem 3.5rem;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.4rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.btn-start:hover {
  background: #2d5a27;
  color: #ffffff;
  padding-left: 4.5rem;
  padding-right: 4.5rem;
}

.home-footer {
  position: absolute;
  bottom: 2rem;
  width: 90%;
  display: flex;
  justify-content: space-between;
  font-family: monospace;
  font-size: 0.7rem;
  opacity: 0.4;
  letter-spacing: 0.1rem;
}
.leaderboard-preview {
  margin-top: 5rem;
  animation: fadeIn 2s ease-in;
}

.section-title {
  font-size: 0.7rem;
  letter-spacing: 0.3rem;
  opacity: 0.6;
  margin-bottom: 1.5rem;
}

.score-list {
  max-width: 300px;
  margin: 0 auto;
}

.score-item {
  display: flex;
  align-items: center;
  font-family: monospace;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.rank {
  opacity: 0.4;
  margin-right: 1rem;
}

.name {
  font-weight: 600;
}

.dots {
  flex-grow: 1;
  border-bottom: 1px dotted #2d5a27;
  margin: 0 10px;
  opacity: 0.2;
}

.val {
  font-weight: 800;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>