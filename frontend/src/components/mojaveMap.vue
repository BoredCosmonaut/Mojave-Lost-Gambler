<script setup>
import { onMounted, ref, defineEmits, watch, defineProps } from "vue";
import L from 'leaflet';
import mapImage from "@/assets/wasteland_nv_1024_no_map_yellow.png";
import playerMarker from '@/assets/black-flag.svg';
import questMarker from '@/assets/flying-flag.svg';

const emit = defineEmits(['guess', 'next-round']);
const props = defineProps({
    round: Number,
    actualLocation: Object
});

let map;
let marker = null;
let actualMarker = null;

const guessLat = ref(null);
const guessLng = ref(null);
const submitted = ref(false);

const MAP_SIZE = 1024;
const HALF_MAP = 512;
const GAME_MAX = 250000; 
const Y_OFFSET = 32000; 
const X_OFFSET = -12000; 

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

watch(() => props.round, () => {
    guessLat.value = null;
    guessLng.value = null;
    submitted.value = false;
    if (marker) { map.removeLayer(marker); marker = null; }
    if (actualMarker) { map.removeLayer(actualMarker); actualMarker = null; }
});

watch(() => props.actualLocation, (loc) => {
    if (!loc || !map) return;
    console.log("Drawing flying flag at:", loc.x, loc.y);
    const [lat, lng] = gameToMap(loc.x, loc.y);
    if (actualMarker) actualMarker.remove();
    actualMarker = L.marker([lat, lng], { 
        icon: actualIcon, 
        zIndexOffset: 1000 
    }).addTo(map);
    const group = new L.featureGroup([marker, actualMarker].filter(m => m));
    map.fitBounds(group.getBounds().pad(0.2));
}, { deep: true });

onMounted(() => {
    const bounds = [[0, 0], [MAP_SIZE, MAP_SIZE]];
    map = L.map('map', {
        crs: L.CRS.Simple,
        minZoom: -1,
        maxZoom: 3,
        maxBounds: bounds,
        attributionControl: false
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
    <div id="map" />
    
    <div class="map-controls">
      <button
        v-if="!submitted"
        class="hud-btn"
        @click="submitGuess"
        :disabled="guessLat === null"
      >
        [ EXECUTE_GUESS ]
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
}

#map {
  width: 100%;
  height: 100%;
  background: #000; 
  /* Minimal amber border with a tiny glow */
  border: 1px solid #ffb642;
  box-shadow: 0 0 5px rgba(255, 182, 66, 0.2); 
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
  background: #000; 
  color: #ffb642;
  border: none;
  border-top: 1px solid #ffb642;
  font-family: 'Courier New', Courier, monospace;
  letter-spacing: 3px;
  text-transform: uppercase;
  position: relative;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  text-shadow: 0 0 4px rgba(255, 182, 66, 0.6);
  box-shadow: inset 0 0 5px rgba(255, 182, 66, 0.1);
}
.hud-btn:hover:not(:disabled) {
  cursor: pointer;
}

.hud-btn:disabled {
  color: #ffb642;
  opacity: 0.2;
  text-shadow: none;
  cursor: not-allowed;
}

.hud-btn.next-round {
  /* Double line for the 'Next' action to distinguish it without a new box */
  border-top: 3px double #ffb642;
}

/* Deep targeting for Leaflet internals */
:deep(.leaflet-container) {
  background: #000 !important;
}

:deep(.leaflet-control-zoom) {
  display: none;
}
</style>