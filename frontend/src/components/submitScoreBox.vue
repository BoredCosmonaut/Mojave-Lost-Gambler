<script setup>
import { ref,defineEmits,defineProps } from 'vue';

defineProps({ score: Number });
const emit = defineEmits(['submit']);

const name = ref('');

function submit() {
  emit('submit', name.value);
}
</script>

<template>
  <div class="submit-box">
    <h3>Game Over</h3>
    <p>Total Score: {{ score }}</p>

    <input v-model="name" placeholder="Your name" />
    <button @click="submit">Submit Score</button>
  </div>
</template>
<style scoped>
.submit-box {
  background: rgba(20,20,20,0.9);
  color: #fff;
  padding: 14px;
  border-radius: 12px;
  backdrop-filter: blur(6px);
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 300px;
  height: 120px;
  text-align: center;
}

input {
  padding: 6px;
  border-radius: 6px;
  border: none;
}

button {
  background: #2ecc71;
  border: none;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}


</style>
