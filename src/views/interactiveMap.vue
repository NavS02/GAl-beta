<template>
  <div style="display: flex; flex-direction: row; height: 100vh">
    <div class="map-wrapper" ref="mapContainer" v-if="isLandscape">
      <img
        src="/logo-valli-del-golfo.png"
        alt="Logo"
        class="top-left-logo"
        :class="{ rotated: !isLandscape }"
        @click="goHome"
      />
      <div class="map-inner"></div>
    </div>

    <div class="info-panel" v-if="isLandscape">
      <div style="text-align: center">
        <h1 class="info-title">
          {{ townData?.title || towns[route.params.id]?.name }}
        </h1>
      </div>

      <p class="info-description">
        {{ townData?.description || "Nessuna descrizione disponibile." }}
      </p>
    </div>

    <div v-else class="error-message">
      Per favore, ruota il tuo dispositivo in modalità orizzontale (landscape)
      per usare la mappa.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const mapContainer = ref(null);
const map = ref(null);
const isLandscape = ref(window.innerWidth > window.innerHeight);
const myImage = ref();
const townData = ref(null);

const towns = {
  "0d11d373-f5d0-440c-91b6-139670c2ddf9": {
    name: "Operazione Husky (zona Gela-Acate-Vittoria)",
    lat: 36.956618,
    lng: 14.249829,
    zoom: 10,
  },
  "1528bf7f-1cdf-4ea9-acad-a2c7a1362f16": {
    name: "Scoglitti",
    lat: 36.892098,
    lng: 14.423981,
    zoom: 14,
  },
  "18a23ec5-eb16-4e73-84df-d69b9aa49345": {
    name: "Gela",
    lat: 37.07,
    lng: 14.25,
    zoom: 13,
  },
  "4f2e4e22-47da-4935-9cb2-3077e9ea47fa": {
    name: "Comiso",
    lat: 37.000501,
    lng: 14.603046,
    zoom: 14,
  },
  "5a1b3a18-1790-4562-bdd0-ef2a62bb0ec0": {
    name: "Acate",
    lat: 37.027443,
    lng: 14.48787,
    zoom: 14,
  },
  "b1d19ab9-62c5-4f7f-9abe-bf4696b73e03": {
    name: "Vittoria",
    lat: 36.96,
    lng: 14.53,
    zoom: 14,
  },
};

function updateOrientation() {
  isLandscape.value = window.innerWidth > window.innerHeight;

  if (isLandscape.value) {
    nextTick(() => {
      if (!map.value) {
        initMap();
      } else {
        map.value.invalidateSize();
      }
    });
  } else {
    if (map.value) {
      map.value.remove();
      map.value = null;
    }
  }
}
let overlay;

async function getMapImages() {
  try {
    const response = await fetch(
      "http://195.231.23.205:8082/files?filter[_and][0][id][_eq]=" + route.params.id
    );
    const data = await response.json();
    const item = data.data[0];

    myImage.value = "http://195.231.23.205:8082/assets/" + item.id;
    townData.value = item;

    if (towns[route.params.id]) {
      const { lat, lng, zoom } = towns[route.params.id];
      map.value.setView([lat, lng], zoom);
    }

    if (map.value && route.params.id === "b1d19ab9-62c5-4f7f-9abe-bf4696b73e03") {


      overlay = L.imageOverlay(myImage.value, bounds, {
        opacity: 1,
      }).addTo(map.value);

      map.value.setMaxBounds(bounds);

      map.value.setMinZoom(14);
      map.value.setMaxZoom(18);

    
    }
  } catch (error) {
    console.error("Errore nel recuperare le immagini:", error);
  }
}
const bounds = [
  [36.9370, 14.51023],
  [36.9638, 14.55403],
];




function initMap() {
  if (!mapContainer.value) return;

map.value = L.map(mapContainer.value.querySelector(".map-inner"), {
  zoomControl: false,
  maxBoundsViscosity: 1.0, 
  inertia: false,           
});


  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(map.value);

  getMapImages();
}


function goHome() {
  router.push({ name: "Home", params: { lingua: route.params.lingua } });
}

onMounted(() => {
  updateOrientation();
  window.addEventListener("resize", updateOrientation);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateOrientation);
  if (map.value) {
    map.value.remove();
  }
});
</script>

<style scoped>
.map-wrapper {
  width: 60vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.map-inner {
  width: 100%;
  height: 100%;
}

.top-left-logo {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 120px;
  height: auto;
  z-index: 1000;
  cursor: pointer;
}

.rotated {
  transform: rotate(-90deg);
  transform-origin: top left;
}

.error-message {
  width: 90vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  padding: 20px;
  text-align: center;
  background-color: #f8d7da;
  color: #721c24;
  user-select: none;
}
.info-panel {
  width: 40vw;
  height: 100vh;
  padding: 2rem;
  background-color: #f9f9f9;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-sizing: border-box;
  overflow: hidden; 
}

.info-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #2c3e50;
  text-align: center;
  flex-shrink: 0;
  margin:0
}

.info-description {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
  overflow-y: auto;
  flex: 1; 
  padding-right: 0.5rem;
}

</style>
