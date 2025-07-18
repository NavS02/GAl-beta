<template>
  <div>
    <div class="filter-container">
      <button
        v-for="tag in allTags"
        :key="tag"
        :class="{ active: selectedTag === tag }"
        @click="toggleTag(tag)"
      >
        {{ tag }}
      </button>
      <button v-if="selectedTag" class="clear-btn" @click="clearTag">
        Tutti
      </button>
    </div>

    <div class="carousel-wrapper">
      <div class="carousel" @touchstart="startTouch" @touchmove="moveTouch">
        <div
          v-for="(video, index) in filteredVideos"
          :key="video.id"
          class="card"
          :style="getCardStyle(index)"
        >
          <video
            :src="'http://directusgal.vidimus.it/assets/' + video.id"
            autoplay
            muted
            loop
            playsinline
            class="video-player"
            draggable="false"
            @dragstart.prevent
            @click="showFullVideo(video)"
          ></video>
          <div class="overlay">
            <h3>{{ video.title }}</h3>
            <p v-html="video.description"></p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tooltip -->
    <div v-if="showTooltip" class="tooltip">
      <p>⇠ ⇢ Swipe per sfogliare<br />👆 Tocca il video per ingrandirlo</p>
    </div>

    <!-- Fullscreen Modal Video -->
    <div v-if="fullVideo" class="fullscreen" @click.self="closeFullVideo">
      <video
        :src="'http://directusgal.vidimus.it/assets/' + fullVideo.id"
        controls
        autoplay
        class="fullscreen-player"
      ></video>
      <p class="fullscreen-title">{{ fullVideo.title }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed,onMounted } from "vue";

const folderId = "5aeecf5a-04e4-44ff-9a49-211de11ab809";
const videos = ref([]);
const activeIndex = ref(0);
const selectedTag = ref(null);
const allTags = ref([]);
const fullVideo = ref(null);
const showTooltip = ref(true);

let startX = 0;

async function fetchVideos() {
  try {
    const res = await fetch(
      `http://directusgal.vidimus.it/files?filter[folder][_eq]=${folderId}&fields=*.*.*`
    );
    const json = await res.json();
    videos.value = json.data;

    // Estrai tag
    const tagSet = new Set();
    videos.value.forEach((video) => {
      if (Array.isArray(video.tags)) {
        video.tags.forEach((tag) => tagSet.add(tag));
      }
    });
    allTags.value = Array.from(tagSet);
  } catch (err) {
    console.error("Errore nel caricamento video:", err);
  }
}

function toggleTag(tag) {
  selectedTag.value = selectedTag.value === tag ? null : tag;
  activeIndex.value = 0;
}

function clearTag() {
  selectedTag.value = null;
  activeIndex.value = 0;
}

const filteredVideos = computed(() => {
  if (!selectedTag.value) return videos.value;
  return videos.value.filter(
    (video) =>
      Array.isArray(video.tags) && video.tags.includes(selectedTag.value)
  );
});

function startTouch(e) {
  startX = e.touches[0].clientX;
}

function moveTouch(e) {
  if (!startX) return;
  const currentX = e.touches[0].clientX;
  const diffX = startX - currentX;

  if (diffX > 50 && activeIndex.value < filteredVideos.value.length - 1) {
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

function showFullVideo(video) {
  fullVideo.value = video;
}

function closeFullVideo() {
  fullVideo.value = null;
}

// Nasconde tooltip dopo 4 secondi
setTimeout(() => {
  showTooltip.value = false;
}, 4000);

onMounted(() => {
  fetchVideos();
});
</script>

<style scoped>
.carousel-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 0;
  bottom: 20px;
}

.carousel {
  position: relative;
  width: 90vw;
  height: 70vh;
}

.card {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  background: transparent;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  user-select: none;
}

.video-player {
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  padding: 12px 16px;
  color: #fff;
  text-align: center;
}

.overlay h3 {
  margin: 0 0 6px;
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.2;
}

.overlay p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.3;
  max-height: 4.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

.filter-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin: 20px auto 10px auto;
  max-width: 600px;
  padding: 0 10px;
}

.filter-container button {
  background-color: #eee;
  border: none;
  border-radius: 20px;
  padding: 6px 14px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.filter-container button.active {
  background-color: #519171;
  color: #954f00;
}

.clear-btn {
  color: black;
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

.fullscreen-player {
  width: 100%;
  max-width: 100%;
  max-height: 90vh;
  border-radius: 8px;
  background: black;
}

.fullscreen-title {
  margin-top: 10px;
  color: white;
  font-size: 1rem;
  text-align: center;
}

.tooltip {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background: rgb(0 0 0 / 85%);
  color: white;
  font-size: 30px;
  animation: fadeOut 1s ease-out 3s forwards;
  z-index: 1000;
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

@keyframes fadeOut {
  to {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px);
  }
}
</style>
