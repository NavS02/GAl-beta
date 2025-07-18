<template>
  <div class="evento-container" v-if="evento">
    <div class="evento-cover">
      <img
        :src="'http://195.231.23.205:8082/assets/' + evento.cover.id"
        :alt="evento.titolo"
      />
    </div>

    <div class="evento-content">
      <h1>{{ evento.titolo }}</h1>
      <p class="evento-data">{{ formatDate(evento.data) }}</p>
      <div class="evento-descrizione" v-html="evento.descrizione"></div>
    </div>

    <!-- Carosello -->
    <div v-if="images && images.length > 0" class="carousel-wrapper">
      <div class="carousel" @touchstart="startTouch" @touchmove="moveTouch">
        <div
          v-for="(image, index) in images"
          :key="image.id"
          class="card"
          :style="getCardStyle(index)"
        >
          <img
            :src="image"
            :alt="image.title"
            @click="showFullImage(image)"
            draggable="false"
          />
        </div>
      </div>
    </div>

    <!-- Modal fullscreen -->
    <div v-if="fullImage" class="fullscreen" @click="fullImage = null">
      <img
        :src="fullImage"
        :alt="fullImage.title"
      />
      <p class="fullscreen-title">{{ fullImage.title }}</p>
    </div>
  </div>

  <div v-else class="loading">Caricamento in corso...</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const evento = ref(null);
const images = ref([]);
const fullImage = ref(null);
const activeIndex = ref(0);

let startX = 0;

async function fetchEvento() {
  const id = route.params.id;
  try {
    const res = await fetch(`http://195.231.23.205:8082/items/eventi/${id}?fields=*.*.*`);
    const json = await res.json();
    evento.value = json.data;

    if (evento.value.gallery && evento.value.gallery.length > 0) {
      console.log(evento.value)
      let imagesArray= evento.value.gallery.map(g => 'http://195.231.23.205:8082/assets/'+g.directus_files_id.id);
    images.value = imagesArray;

      console.log(imagesArray)
      // fetchGallery(imagesArray);
    }
  } catch (err) {
    console.error("Errore nel caricamento dell'evento:", err);
  }
}

// async function fetchGallery(galleryIds) {
//   try {
//     const idList = galleryIds
//     const res = await fetch(
//       `http://195.231.23.205:8082/assets?filter[id][_in]=${idList}`
//     );
//     const json = await res.json();
//     images.value = json.data;
//   } catch (err) {
//     console.error("Errore nel caricamento immagini:", err);
//   }
// }

function startTouch(e) {
  startX = e.touches[0].clientX;
}

function moveTouch(e) {
  if (!startX) return;
  const currentX = e.touches[0].clientX;
  const diffX = startX - currentX;
  if (diffX > 50 && activeIndex.value < images.value.length - 1) {
    activeIndex.value++;
    startX = 0;
  } else if (diffX < -50 && activeIndex.value > 0) {
    activeIndex.value--;
    startX = 0;
  }
}

function getCardStyle(index) {
  const offset = index - activeIndex.value;
  const scale = 1 - Math.abs(offset) * 0.1;
  const z = 100 - Math.abs(offset);
  const visible = Math.abs(offset) <= 2;
  return {
    transform: `translateX(${offset * 20}px) scale(${scale})`,
    zIndex: z,
    opacity: visible ? 1 : 0,
    display: visible ? "block" : "none",
  };
}

function formatDate(isoDate) {
  const date = new Date(isoDate);
  return date.toLocaleDateString("it-IT", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function showFullImage(img) {
  fullImage.value = img;
}

onMounted(() => {
  fetchEvento();
});
</script>

<style scoped>
/* (rimasto invariato) */

.evento-container {
  padding: 10px;
  max-width: 900px;
  margin: auto;
  font-family: system-ui, sans-serif;
  color: #3e2f1c;
}

.evento-cover img {
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
}

.evento-content h1 {
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: #519171;
}

.evento-data {
  color: #888;
  margin-bottom: 20px;
}

.evento-descrizione {
  line-height: 1.6;
  font-size: 1rem;
}

.carousel-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 0;
  margin-bottom: 10vh;
  padding: 10px;
}

.carousel {
  position: relative;
  width: 90vw;
  height: 60vh;
}

.card {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  background: transparent;
  transition: all 0.3s ease;
}

.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
}

.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  flex-direction: column;
  padding: 20px;
}

.fullscreen img {
  max-width: 100%;
  max-height: 90vh;
  border-radius: 8px;
}

.fullscreen-title {
  margin-top: 10px;
  color: white;
  font-size: 1rem;
  text-align: center;
}

.loading {
  text-align: center;
  padding: 50px;
  font-size: 1.2rem;
}
</style>
