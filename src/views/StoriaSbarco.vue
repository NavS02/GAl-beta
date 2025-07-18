<template>
  <div class="poi-container" v-if="poi">
    <div class="poi-cover">
      <img
        :src="'http://directusgal.vidimus.it/assets/' + poi.cover"
        :alt="poi.titolo"
      />
    </div>

    <div class="poi-content">
      <h1>{{ poi.titolo }}</h1>
      <div class="poi-description" v-html="poi.descrizione"></div>
    </div>

    <div v-if="poi.mappa" ref="mapContainer" id="map" class="poi-map"></div>
  </div>

  <div v-else class="loading">Caricamento in corso...</div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import L from "leaflet";

const poi = ref(null);
const mapContainer = ref(null);
let mapInitialized = false;

async function fetchPOI() {
  try {
    const res = await fetch("http://directusgal.vidimus.it/items/POI?id=1")
    const json = await res.json();
    poi.value = json.data[0];

    if (poi.value?.mappa?.coordinates && !mapInitialized) {
      await nextTick();
      const [lng, lat] = poi.value.mappa.coordinates;
      initMap(lat, lng);
      mapInitialized = true;
    }
  } catch (error) {
    console.error("Errore nel caricamento del POI:", error);
  }
}

function initMap(lat, lng) {
  const map = L.map(mapContainer.value).setView([lat, lng], 13);

  L.tileLayer(
    "https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
    {
      maxZoom: 20,
      attribution:
        '',
    }
  ).addTo(map);
  L.marker([lat, lng]).addTo(map).bindPopup('Sbarco americani a Gela').openPopup();
}

onMounted(() => {
  fetchPOI();
});
</script>

<style scoped>
.poi-container {
  padding: 20px;
  max-width: 900px;
  margin: auto;
  font-family: system-ui, sans-serif;
  color: #673900;
}

.poi-cover img {
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
}

.poi-content h1 {
  font-size: 2rem;
  margin-bottom: 10px;
  color: #519171;
}

.poi-description {
  line-height: 1.6;
  font-size: 1rem;
}

.poi-map {
  margin-top: 30px;
  height: 300px;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  z-index: 0;
}

.loading {
  text-align: center;
  padding: 50px;
  font-size: 1.2rem;
}
</style>
