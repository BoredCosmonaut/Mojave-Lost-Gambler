<script setup>
  import {ref,reactive} from 'vue'
  import { useRouter } from 'vue-router';
  import { useSubmission } from '@/composables/useSubmisson';

  const router = new useRouter()
  const {submit,submitting,success,error} = useSubmission();
  const imagePreview =ref(null);

  const form = reactive({
    image:null,
    x:0,
    y:onabort,
    region:''
  });

  function handleFileChange(e) {
    const file = e.target.files[0];
    if(!file) return;
    form.image = file;
    imagePreview.value = URL.createObjectURL(file);
  }

  async function handleSubmit() {
    try {
      await submit(form);
    } catch (err) {
      console.error(err)
    }
  }
</script>

<template>
  <nav class="top-nav">
  <button @click="router.push('/')" class="back-link">
    &lt; RETURN_TO_BASE
  </button>
  </nav>
  <div class="submit-container">
    <div class="content">
      <header class="view-header">
        <h2 class="terminal-text">NEW_LOCATION_RECON</h2>
        <p class="subtitle">SUBMIT VISUAL DATA</p>
      </header>
      <div class="form-layout">

        <div class="upload-section">
          <label class="image-dropzone" :class="{'has-image' : imagePreview}">
            <input type="file" @change="handleFileChange" accept="image/*" class="hidden-input">
            <img :src="imagePreview" class="preview-img" v-if="imagePreview">
            <div v-else class="upload-prompt">
              <span class="icon">[+]</span>
              <span class="label">ATTACH_VISUAL_FEED</span>
            </div>
          </label>
        </div>

        <div class="meta-section">
          <div class="input-group">
            <label>LOC_X</label>
             <input v-model="form.x" type="number" placeholder="0.00">
          </div>
          <div class="input-group">
            <label >LOC_Y</label>
            <input type="number" placeholder="0.00" v-model="form.y">
          </div>
          <div class="input-group">
            <label>WORLD_INST_ID</label>
            <div class="select-wrapper">
              <select v-model="form.region" class="terminal-select">
                <option value="" disabled selected>-- SELECT_MAP_SECTOR --</option>
                <option value="mojave">THE_MOJAVE_WASTELAND</option>
                <option value="sierra_madre">SIERRA_MADRE</option>
                <option value="zion">ZION_CANYON</option>
                <option value="big_mt">BIG_MT</option>
                <option value="divide">THE_DIVIDE</option>
              </select>
              <span class="select-arrow">▼</span>
            </div>
          </div>

          <button class="submit-btn" @click="handleSubmit" :disabled="submitting || !form.image">{{ submitting? '[SUBMITTING]' : '[INITIALIZE_SUBMISSION]' }}</button>

          <p v-if="success" class="status-msg success">DATA_LOGGED</p>
          <p v-if="error" class="status-msg error">UPLOAD_FAILURE: {{ error }}</p>
        </div>

      </div>
      <div class="recon-guide">
        <h3 class="guide-title">// RECON_PROCEDURE</h3>
        <div class="guide-steps">
          <div class="step">
            <span class="step-num">01</span>
            <p>Locate target position within the <span class="highlight">Mojave</span>.</p>
          </div>
          <div class="step">
            <span class="step-num">02</span>
            <p>Open Terminal Access Key <span class="highlight">[`]</span> (Tilde).</p>
          </div>
          <div class="step">
            <span class="step-num">03</span>
            <p>Execute Command: <span class="cmd">GetPos X</span> and <span class="cmd">GetPos Y</span>.</p>
          </div>
          <div class="step">
            <span class="step-num">04</span>
            <p>Get Visual Data <span class="highlight">[F12]</span> and write the coordinates above.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.top-nav {
  position: absolute;
  top: 2rem;
  left: 2rem;
}

.back-link {
  background: transparent;
  border: none;
  color: #ffb642; 
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.8rem;
  letter-spacing: 2px;
  cursor: pointer;
  opacity: 0.5;
  transition: all 0.3s ease;
  padding: 0;
}

.back-link:hover {
  opacity: 1;
  transform: translateX(-5px); 
}


.submit-container {
  min-height: 100vh;
  background-color: #020502; 
  color: #ffffff; 
  font-family: 'Courier New', Courier, monospace;
  display: flex;
  justify-content: center;
  padding: 4rem 2rem;
}

.content {
  width: 100%;
  max-width: 900px;
}

.view-header {
  margin-bottom: 4rem;
  border-bottom: 1px solid rgba(255, 182, 66, 0.2); 
  padding-bottom: 1.5rem;
}

.terminal-text {
  font-size: 1.6rem;
  color: #ffb642; 
  margin: 0;
  letter-spacing: 4px;
  text-shadow: 0 0 8px rgba(255, 182, 66, 0.4);
}

.subtitle {
  font-size: 0.75rem;
  color: #ffb642;
  opacity: 0.5;
  margin-top: 0.5rem;
  text-transform: uppercase;
}

.form-layout {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 4rem;
  align-items: start;
}

.upload-section {
  width: 100%;
}

.image-dropzone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  border: 1px dashed rgba(255, 182, 66, 0.4); 
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  overflow: hidden; 
  background: #000;
}

.image-dropzone:hover {
  border-color: #ffb642;
  background: rgba(255, 182, 66, 0.05);
}

.image-dropzone.has-image {
  border: 1px solid rgba(255, 182, 66, 0.2);
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: brightness(0.8) contrast(1.2) sepia(0.2);
  display: block;
}

.upload-prompt {
  text-align: center;
  color: #ffb642;
}

.upload-prompt .icon {
  display: block;
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.upload-prompt .label {
  font-size: 0.8rem;
  letter-spacing: 2px;
}

.hidden-input {
  display: none;
}

.meta-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  position: relative;
}

.input-group label {
  font-size: 0.65rem;
  color: #ffb642;
  opacity: 0.8;
  letter-spacing: 1px;
}

input, .terminal-select {
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 182, 66, 0.2);
  color: #ffffff;
  padding: 10px 0;
  font-family: inherit;
  font-size: 1rem;
  outline: none;
  transition: border-bottom 0.2s ease;
}

input:focus, .terminal-select:focus {
  border-bottom: 1px solid #ffb642;
}

.select-wrapper {
  position: relative;
  width: 100%;
}

.terminal-select {
  width: 100%;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
}

.terminal-select option {
  background-color: #020502;
  color: #ffb642;
  padding: 15px;
}

.select-arrow {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.6rem;
  color: #ffb642;
  pointer-events: none;
  opacity: 0.5;
}

.submit-btn {
  margin-top: 2rem;
  background: transparent;
  border: 1px solid #ffb642;
  color: #ffb642;
  padding: 18px;
  cursor: pointer;
  font-family: inherit;
  font-weight: bold;
  letter-spacing: 3px;
  text-transform: uppercase;
  transition: all 0.2s ease;
}

.submit-btn:hover:not(:disabled) {
  background: rgba(255, 182, 66, 0.1);
  box-shadow: 0 0 15px rgba(255, 182, 66, 0.2);
}

.submit-btn:disabled {
  opacity: 0.2;
  border-color: #ffffff;
  color: #ffffff;
  cursor: not-allowed;
}

.status-msg {
  font-size: 0.75rem;
  margin-top: 1.5rem;
  text-align: center;
  letter-spacing: 1px;
}

.status-msg.success { color: #ffb642; }
.status-msg.error { color: #ff5555; border: 1px solid #ff5555; padding: 10px; }

.recon-guide {
  margin-top: 5rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 182, 66, 0.1);
}

.guide-title {
  font-size: 0.8rem;
  color: #ffb642;
  letter-spacing: 3px;
  margin-bottom: 2rem;
  opacity: 0.8;
}

.guide-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.step {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 85%;
}

.step-num {
  font-size: 0.6rem;
  color: #ffb642;
  opacity: 0.4;
  font-weight: bold;
}

.step p {
  font-size: 0.85rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

/* Subtle Highlights */
.highlight {
  color: #ffb642;
  font-weight: bold;
}

.cmd {
  background: rgba(255, 182, 66, 0.1);
  padding: 2px 6px;
  color: #ffb642;
  border-radius: 2px;
}

@media (max-width: 768px) {
  .form-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .image-dropzone {
    height: 250px;
  }
  
  .guide-steps {
    grid-template-columns: 1fr;
  }

}
</style>