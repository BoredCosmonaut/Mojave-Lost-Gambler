<script setup>
    import {ref} from 'vue'
    import { useRouter } from 'vue-router';
    import { useAdmin } from '@/composables/useAdmin';

    const {handleLogin,error,loading} = useAdmin();
    const router = new useRouter();

    const email = ref();
    const password = ref();

    const onLogin = async() => {
        const result = await handleLogin(email.value,password.value);
        console.log(result)
        if(result.success) {
            router.push('/admin/dashboard');
        }
    };
</script>

<template>
    <div class="terminal-container">
        <div class="overlay"></div>
        <div class="login-wrapper">
            <header>
                <h1 class="glitch">ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM</h1>
                <p>COPYRIGHT 2075-2077 ROBCO CORP</p>
            </header>

            <form @submit.prevent="onLogin" class="terminal-form">
                <div class="field">
                    <span class="prompt">></span>
                    <label for="email">USER_ID:</label>
                    <input 
                        type="email"
                        v-model="email"
                        id="email"
                        autocomplete="off"
                        :disabled="loading"
                    />
                </div>
                <div class="field">
                    <span class="prompt">></span>
                    <label for="password">PASS_PHRASE:</label>
                    <input 
                        type="password"
                        v-model="password"
                        id="password"
                        :disabled="loading"
                    />
                </div>
                <div v-if="error" class="error-msg">
                    ** {{ error }} **
                </div>

                <button type="submit" :disabled="loading" class="submit-btn">
                    {{ loading ? '[ATTEMPTING_ACCESS...]' : '[LOG_IN]' }}
                </button>

            </form>
        </div>
    </div>
</template>

<style scoped>
.terminal-container {
  min-height: 100vh;
  background-color: #050505;
  color: #ffb642; 
  font-family: 'Fixedsys', 'Courier New', monospace;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(
    rgba(18, 16, 16, 0) 50%, 
    rgba(0, 0, 0, 0.1) 50%
  ), linear-gradient(
    90deg, 
    rgba(255, 0, 0, 0.03), 
    rgba(0, 255, 0, 0.01), 
    rgba(0, 0, 255, 0.03)
  );
  background-size: 100% 3px, 3px 100%;
  pointer-events: none;
}

.login-wrapper {
  width: 100%;
  max-width: 500px;
  padding: 20px;
  z-index: 2;
}

header {
  margin-bottom: 40px;
  border-bottom: 1px solid #ffb642;
  padding-bottom: 10px;
}

h1 { font-size: 1.2rem; margin: 0; }
p { font-size: 0.8rem; margin: 5px 0; }


.terminal-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.field {
  display: flex;
  align-items: center;
  gap: 10px;
}

.prompt { font-weight: bold; }

label { font-size: 1rem; }

input {
  flex: 1;
  background: transparent;
  border: none;
  border-bottom: 2px solid #ffb642;
  color: #ffb642;
  font-family: inherit;
  font-size: 1.1rem;
  outline: none;
  padding: 5px;
}

.submit-btn {
  background: transparent;
  border: none;
  color: #ffb642;
  font-family: inherit;
  font-size: 1.2rem;
  padding: 15px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;
}

.submit-btn:hover:not(:disabled) {
  background: #ffb642;
  color: #050505;
}

.error-msg {
  color: #ff4444;
  font-weight: bold;
  animation: blink 1s steps(2) infinite;
}

@keyframes blink {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
</style>