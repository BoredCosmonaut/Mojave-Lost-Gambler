<script setup>
    import { onMounted,ref,defineEmits, watch, defineProps  } from "vue";
    import L from 'leaflet'
    import mapImage from "@/assets/wasteland_nv_1024_no_map_yellow.png";
    import playerMarker from '@/assets/black-flag.svg';
    import questMarker from '@/assets/flying-flag.svg';
    
    const emit = defineEmits(['guess']);
    let map;
    let marker = null;
    const guessLat = ref(null);
    const guessLng = ref(null);
    const props = defineProps({
    round: Number,
    actualLocation: Object
    });
    const submitted = ref(false);
    const MAP_SIZE = 1024;
    const MIN = -260000;
    const MAX = 260000;

    function gameToMap(x, y) {
        const mapX = ((x - MIN) / (MAX - MIN)) * MAP_SIZE;
        const mapY = ((y - MIN) / (MAX - MIN)) * MAP_SIZE;

        return [MAP_SIZE - mapY, mapX]; 
    }

    function mapToGame(lat, lng) {
        const x = MIN + (lng / MAP_SIZE) * (MAX - MIN);
        const y = MIN + ((MAP_SIZE - lat) / MAP_SIZE) * (MAX - MIN);

        return { x, y };
    }

    const guessIcon = L.icon({
    iconUrl: playerMarker,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
    });

    const actualIcon = L.icon({
    iconUrl: questMarker,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
    });

    watch(() => props.round, () => {
    guessLat.value = null;
    guessLng.value = null;
    submitted.value = false;

    if (marker) {
        marker.remove();
        marker = null;
    }

    if (actualMarker) {
        actualMarker.remove();
        actualMarker = null;
    }
    });
    let actualMarker = null;

    watch(() => props.actualLocation, loc => {
    if (!loc || !map) return;

    const [lat, lng] = gameToMap(loc.x, loc.y);

    if (actualMarker) actualMarker.remove();

    actualMarker = L.marker([lat, lng], {
        icon: actualIcon
    }).addTo(map);
    });



    onMounted(() => {
        const img = new Image();
        img.src = mapImage;

        img.onload = () => {
            const bounds = [[0,0],[img.height,img.width]];
            map = L.map('map', {
                crs:L.CRS.Simple,
                minZoom:-1,
                maxZoom:3,
                maxBounds:bounds,
                maxBoundsViscosity:1.0
            });

            L.imageOverlay(mapImage,bounds).addTo(map);
            map.fitBounds(bounds);

            map.on('click', e => {
                if(submitted.value) return;
                guessLat.value = e.latlng.lat;
                guessLng.value = e.latlng.lng;

                if(marker) marker.remove();
                marker = L.marker([guessLat.value, guessLng.value], {
                icon: guessIcon
                }).addTo(map);
            })

        }
    })

    function submitGuess(){
    if(guessLat.value !== null && guessLng.value !== null){
        submitted.value = true;

        const gameCoords = mapToGame(
        guessLat.value,
        guessLng.value
        );

        emit('guess', gameCoords.x, gameCoords.y);
    }
    }
</script>

<template>
  <div class="map-outer">
    <div class="map-wrapper">
      <div id="map" />
    </div>

    <div class="map-controls">
      <button
        class="submit-guess"
        @click="submitGuess"
        :disabled="guessLat === null || submitted"
      >
        Submit Guess
      </button>
    </div>
  </div>
</template>


<style scoped>
.map-outer {
  width: 100%;
  position: relative;
  bottom: 10%;
  max-width: 600px; 
  margin: 0 auto; 
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px; 
}

.map-wrapper {
  width: 100%;
  aspect-ratio: 1 / 1; /* keep map square */
  overflow: hidden;
}

#map {
  width: 100%;
  height: 100%;
  border-radius: 12px;
}

.map-controls {
  width: 100%;
  display: flex;
  justify-content: center; /* centers the button horizontally */
}

.submit-guess {
  padding: 12px 24px;
  background: #ffcc00;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  color: #111;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  transition: transform 0.2s ease, background 0.2s ease;
}

.submit-guess:hover:not(:disabled) {
  transform: translateY(-2px);
  background: #ffdd33;
}

.submit-guess:disabled {
  background: #aaa;
  cursor: not-allowed;
}

</style>