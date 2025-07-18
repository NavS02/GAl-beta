<template>
  <div class="video-page">
    <!-- Messaggio guida fisso -->
      <div class="video-hint">
        🎥 Puoi cliccare sul video per ingrandirlo a schermo intero, regolare il volume e utilizzare i comandi del player.
      </div>
    <!-- Contenitore del video -->
    <div class="video-wrapper">
      <!-- Video player -->
      <video
        v-if="videoUrl"
        :src="videoUrl"
        controls
        autoplay
        playsinline
        class="video-player"
      ></video>
      <p v-else class="loading">Caricamento video...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const videoUrl = ref(null)

onMounted(() => {
  videoUrl.value = 'http://195.231.23.205:8082/assets/85755332-7004-4c23-964b-ba8597498915'
})
</script>

<style scoped>
.video-page {
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  font-family: system-ui, sans-serif;
}

.video-wrapper {
  border-radius: 20px;
  max-width: 900px;
  width: 100%;
  position: relative;
  background: #fff;
  padding-top: 60px; /* spazio per il messaggio */
}

.video-hint {
  position: absolute;
  top: 15vh;
  left: 0;
  right: 0;
  color: #3e2f1c;
  padding: 10px;
  text-align: center;
  border-radius: 20px;
  font-size: 0.95rem;
  z-index: 2;
  background: #519171;
  margin: 10px;
}

.video-player {
  width: 100%;
  height: auto;
  border-radius: 12px;
  outline: none;
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
}
</style>
