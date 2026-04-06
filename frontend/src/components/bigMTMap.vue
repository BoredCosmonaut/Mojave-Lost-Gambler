<script setup>
import { onMounted, ref, watch, defineEmits, defineProps } from 'vue';
import L from 'leaflet';
import mapImage from '@/assets/wasteland_bigmt_1024_no_map_blue.png';
import playerMarker from '@/assets/black-flag.svg';
import questMarker from '@/assets/flying-flag.svg';

const emit = defineEmits(['guess', 'next-round']);
const props = defineProps({
  round: Number,
  actualLocation: Object
});

const mapContainer = ref(null);

const guessLat = ref(null);
const guessLng = ref(null);
const submitted = ref(false);

let map;
let marker = null;
let actualMarker = null;


const MAP_SIZE = 1024;
const HALF_MAP = 512;
const GAME_MAX = 180000; 
const X_OFFSET = 0; 
const Y_OFFSET = 0;

const gameToMap = (x, y) => {
  const lng = HALF_MAP + ((x + X_OFFSET) / GAME_MAX) * HALF_MAP;
  const lat = HALF_MAP - ((y + Y_OFFSET) / GAME_MAX) * HALF_MAP;
  return [lat, lng];
};

const mapToGame = (lat, lng) => ({
  x: (((lng - HALF_MAP) / HALF_MAP) * GAME_MAX) - X_OFFSET,
  y: (((HALF_MAP - lat) / HALF_MAP) * GAME_MAX) - Y_OFFSET
});

const guessIcon = L.icon({ iconUrl: playerMarker, iconSize: [40, 40], iconAnchor: [20, 40] });
const actualIcon = L.icon({ iconUrl: questMarker, iconSize: [40, 40], iconAnchor: [20, 40] });

onMounted(() => {
  const bounds = [[0, 0], [MAP_SIZE, MAP_SIZE]];
  
  map = L.map(mapContainer.value, {
    crs: L.CRS.Simple,
    maxBounds: bounds,
    attributionControl: false,
    zoomControl: false
  });

  L.imageOverlay(mapImage, bounds).addTo(map);
  map.fitBounds(bounds);

  map.on('click', e => {
    if (submitted.value) return;
    
    guessLat.value = e.latlng.lat;
    guessLng.value = e.latlng.lng;

    if (marker) marker.setLatLng(e.latlng);
    else marker = L.marker(e.latlng, { icon: guessIcon }).addTo(map);
  });
});

watch(() => props.round, () => {
  guessLat.value = null;
  guessLng.value = null;
  submitted.value = false;
  if (marker) { map.removeLayer(marker); marker = null; }
  if (actualMarker) { map.removeLayer(actualMarker); actualMarker = null; }
});

// Reveal logic
watch(() => props.actualLocation, (loc) => {
  if (!loc || !map) return;
  
  const [lat, lng] = gameToMap(loc.x, loc.y);
  if (actualMarker) actualMarker.remove();
  
  actualMarker = L.marker([lat, lng], { 
    icon: actualIcon, 
    zIndexOffset: 1000 
  }).addTo(map);

  const group = new L.featureGroup([marker, actualMarker].filter(m => m));
  map.fitBounds(group.getBounds().pad(0.3));
}, { deep: true });

function submitGuess() {
  if (guessLat.value !== null && !submitted.value) {
    submitted.value = true;
    const coords = mapToGame(guessLat.value, guessLng.value);
    emit('guess', coords.x, coords.y);
  }
}
</script>

<template>
  <div class="map-outer">
    <div id="map-zion" ref="mapContainer" class="map-instance" />
    
    <div class="map-controls">
      <button
        v-if="!submitted"
        class="hud-btn"
        @click="submitGuess"
        :disabled="guessLat === null"
      >
        [ EXECUTE_RECON ]
      </button>

      <button
        v-else
        class="hud-btn next-round"
        @click="$emit('next-round')"
      >
        [ NEXT_LOCATION ]
      </button>
    </div>
  </div>
</template>

<style scoped>
.map-outer {
  width: 100%;
  height: 100%;
  position: relative;
  background: #000;
  border: 1px solid #1bff80;
  box-shadow: 0 0 10px rgba(27, 255, 128, 0.15);
}

.map-instance {
  width: 100%;
  height: 100%;
  background: #000; 
}

.map-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.hud-btn {
  width: 100%;
  padding: 14px;
  background: rgba(0, 0, 0, 0.8); 
  color: #1bff80;
  border: none;
  border-top: 1px solid #1bff80;
  font-family: 'Courier New', Courier, monospace;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  text-shadow: 0 0 5px rgba(27, 255, 128, 0.5);
  transition: all 0.2s ease;
}

.hud-btn:hover:not(:disabled) {
  background: #1bff80;
  color: #000;
}

.hud-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.hud-btn.next-round {
  border-top: 3px double #1bff80;
}

:deep(.leaflet-container) {
  background: #000 !important;
}
</style>