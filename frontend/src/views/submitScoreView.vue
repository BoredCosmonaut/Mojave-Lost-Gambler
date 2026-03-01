<script setup>
    import {onMounted, ref} from 'vue'
    import { useRouter } from 'vue-router';
    import { useGame } from '@/composables/useGame';
    
    const router = useRouter();
    const game = useGame();

    const name = ref('');

    onMounted(() => {
        console.log(game.totalScore.value)
    })

    async function handleSubmit() {
        if(!name.value) return;

        await game.submitScore(name.value);
        
        router.push('/')
    }
</script>

<template>
    <div class="terminal-screen">
        <div class="scanlines"></div>

        <div class="content">
            <header class="terminal-header">
                <h3 class="status">> LOG_ENTRY: COMPLETE</h3>
                <p class="score-display">ASSESSMENT SCORE: {{ game.totalScore.value }} UNITS</p>
            </header>

            <div class="input-wrapper">
                <label for="courier-name">ASSIGNED COURIER:</label>
                <div class="input-line">
                    <span class="prompt">></span>
                    <input
                        id="courier-name"
                        v-model="name"
                        placeholder="______"
                        @keyup.enter="handleSubmit"
                        class="terminal-input"
                        maxlength="20"
                        autofocus
                    >
                </div>
            </div>

            <button 
                @click="handleSubmit" 
                class="btn-submit" 
                :disabled="game.loading.value"
            >
                {{ game.loading.value ? '[ UPLOADING ]': '[ EXECUTE_SUBMISSION ]' }}
            </button>
        </div>
    </div>
</template>

<style scoped>
/* Import a proper terminal font */
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

.terminal-screen {
  height: 100vh;
  --terminal-green: #00ff41; 
  background-color: #020502; 
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--terminal-green);
  font-family: 'VT323', 'Courier New', Courier, monospace;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
}

.scanlines {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    rgba(0, 0, 0, 0) 50%, 
    rgba(0, 0, 0, 0.2) 50%
  );
  background-size: 100% 4px;
  z-index: 2;
  pointer-events: none;
}

.content {
  position: relative;
  z-index: 3;
  text-align: left;
  width: 100%;
  max-width: 500px;
  padding: 2rem;
}

.status {
  font-size: 1.8rem;
  letter-spacing: 0.1rem;
  margin-bottom: 0.5rem;
  text-shadow: none;
}

.score-display {
  font-size: 1.2rem;
  margin-bottom: 4rem;
  opacity: 0.9;
}

.input-wrapper {
  margin-bottom: 4rem;
}

.input-line {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.prompt {
  font-size: 2rem;
}

label {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  display: block;
  opacity: 0.7;
}

.terminal-input {
  background: transparent;
  border: none;
  color: var(--terminal-green);
  font-family: inherit;
  font-size: 2.2rem;
  outline: none;
  width: 100%;
  text-shadow: none;
}

.terminal-input::placeholder {
  color: var(--terminal-green);
  opacity: 0.1;
}

.btn-submit {
  background: transparent;
  border: 1px solid var(--terminal-green);
  color: var(--terminal-green);
  font-family: inherit;
  font-size: 1.4rem;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
  transition: all 0.1s steps(2); 
}

.btn-submit:hover:not(:disabled) {
  background: var(--terminal-green);
  color: #020502;
  box-shadow: none;
}

.btn-submit:disabled {
  opacity: 0.3;
}
</style>