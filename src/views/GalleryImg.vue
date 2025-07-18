<template>
  <div class="cards-grid" v-if="folders && folders.length > 0">
    <div v-for="folder in folders" :key="folder.id" class="service-card" @click="openFolder(folder.id)">
      <div class="card-image-container">
        <img src="/foto-album.png" alt="Immagine cartella" class="card-image" />
        <div class="card-overlay">
          <h3 class="card-title">{{ folder.name }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const items = ref();
const folders = ref(null);


async function getData() {
  const url = "http://195.231.23.205:8082/folders?filter[parent][_eq]=f287b23d-6ddf-4e52-914f-4195f330523f&sort=name&fields=id,name";
  try {
    const res = await fetch(url);
    const json = await res.json();
    items.value = json.data;
    folders.value = items.value.map(item => ({ id: item.id, name: item.name }));
  } catch (err) {
    console.error("Errore nel fetch:", err);
  }
}

function openFolder(folderId) {
  router.push({ name: "Immagini", params: { image: folderId, lingua: route.params.lingua } });
}

onMounted(() => {
  getData();
});
</script>

<style scoped>
.cards-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  max-width: 600px;
  margin: 0 auto;
  padding: 0px 10px 0px 10px;
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
