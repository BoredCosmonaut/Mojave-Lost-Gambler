<script setup>
import { ref } from 'vue';
import { useSubmission } from '@/composables/useSubmisson.js';

const { submit, submitting, success } = useSubmission();

const form = ref({
  image: null,
  x: '',
  y: '',
  title: '',
  description: '',
  region: ''
});

function onFile(e) {
  form.value.image = e.target.files[0];
}

function onSubmit() {
  submit(form.value);
}
</script>

<template>
  <h1>Submit Location</h1>

  <input type="file" @change="onFile" />
  <input v-model="form.title" placeholder="Title" />
  <input v-model="form.x" placeholder="X" />
  <input v-model="form.y" placeholder="Y" />
  <input v-model="form.region" placeholder="Region" />
  <textarea v-model="form.description" placeholder="Description" />

  <button :disabled="submitting" @click="onSubmit">
    Submit
  </button>

  <p v-if="success">Submitted for review!</p>
</template>
