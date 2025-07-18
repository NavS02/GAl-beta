<template>
  <main class="app-main">
  
  <div class="cards-grid" v-if="eventi && eventi.length > 0">
    <div
      v-for="evento in eventi"
      :key="evento.id"
      class="service-card"
    >
      <div class="card-image-container" @click="goInfoEventi(evento)">
        <img
          :src="`http://195.231.23.205:8082/assets/${evento.cover}`"
          alt="Immagine evento"
          class="card-image"
        />
        <div class="card-overlay">
          <h3 class="card-title">{{ formatDate(evento.data) }}</h3>
        </div>
      </div>
    </div>
  </div>
  
</main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const eventi = ref(null)
async function getEventi() {
  const url = 'http://195.231.23.205:8082/items/eventi'
  try {
    const res = await fetch(url)
    const json = await res.json()
    eventi.value = json.data

  } catch (err) {
    console.error('Errore nel fetch degli eventi:', err)
  }
}

function formatDate(isoDate) {
  const date = new Date(isoDate)
  return date.toLocaleDateString('it-IT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function goInfoEventi(evento){
  router.push({ name: "InfoEventi", params: { lingua: route.params.lingua, id:evento.id } });
}

onMounted(() => {
  getEventi()
})
</script>

<style scoped>
.app-main {
  flex: 1;
  padding: 10px;
}
.cards-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  max-width: 600px;
  margin: 0 auto;
  padding: 0px 10px;
}

.service-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
}

.service-card:active {
  transform: scale(0.98);
}

.service-card:hover .card-image {
  transform: scale(1.05);
}

.card-image-container {
  position: relative;
  height: 15vh;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s ease;
  position: relative;
  z-index: 0;
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  pointer-events: none;
  z-index: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 5px;
  box-sizing: border-box;
}

.card-title {
  font-size: 15px;
  text-align: center;
  text-transform: uppercase;
  margin: 0;
  padding: 4px 8px;
  color: white;
  z-index: 0;
}

@media (min-width: 400px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .card-image-container {
    height: 150px;
  }
}
</style>
