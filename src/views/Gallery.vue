<template>
  <div class="cards-grid">
    <div class="service-card" @click="goImg()">
      <div class="card-image-container">
        <img src="/foto-album.png" alt="Immagini" class="card-image" />
        <div class="card-overlay">
          <h3 class="card-title">Immagini</h3>
        </div>
      </div>
    </div>

    <div class="service-card" @click="goVideo()">
      <div class="card-image-container">
        <img src="/pellicola.png" alt="Video" class="card-image" />
        <div class="card-overlay">
          <h3 class="card-title">Video</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

function goImg(){
  router.push({ name: "Gallery-Img", params: { lingua: route.params.lingua } });
}
function goVideo(){
  router.push({ name: 'Video', params: { lingua: route.params.lingua } });
}
</script>

<style scoped>
.cards-grid {
  display: flex;
  gap: 20px;
  max-width: 600px;
  margin: 0 auto;
  text-transform: uppercase;
  padding: 20px;
  height: 60vh;
  align-items: center;
  flex-direction: column;
  justify-content: center;
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
  height: 25vh;
  overflow: hidden;
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

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s ease;
  position: relative;
  z-index: 0;
}

.card-title {
  font-size: 15px;
  text-align: center;
  margin: 0;
  padding: 4px 8px;
  z-index: 0;
  color: white;
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
