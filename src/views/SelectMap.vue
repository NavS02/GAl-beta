<template>
  <div v-if="showTooltip" class="tooltip" :class="{ rotated: isPortrait }">
    <div class="tooltip-content">
      <svg
        class="rotate-icon"
        width="60px"
        height="60px"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M2 8C2 5.17 2 3.76 2.88 2.88C3.76 2 5.17 2 8 2H9C11.83 2 13.24 2 14.12 2.88C15 3.76 15 5.17 15 8V16C15 18.83 15 20.24 14.12 21.12C13.24 22 11.83 22 9 22H8C5.17 22 3.76 22 2.88 21.12C2 20.24 2 18.83 2 16V8Z"
          stroke="#ffffff"
          stroke-width="1.5"
        />
        <path
          d="M20.5 6.99L22 8C22 4.99 19.84 2.48 17 2"
          stroke="#ffffff"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
      <p>
        Ruota il dispositivo per visualizzare i <strong>mappe</strong><br />
      </p>
    </div>
  </div>

  <main class="app-main" :class="{ 'force-landscape': isPortrait }">
    <img
      src="/logo-valli-del-golfo.png"
      alt="Logo"
      class="top-left-logo"
      :class="{ rotated: isPortrait }"
    />

    <div class="grid-container" v-if="mapsData.length">
      <div
        v-for="(map, index) in mapsData"
        :key="index"
        class="grid-item"
        :style="{
          backgroundImage: `url(http://directusgal.vidimus.it/assets/${map.id})`,
        }"
        @click="(e) => handleMapClick(e, map)"
      >
        <div class="overlay">
          <span class="image-text">{{ map.title }}</span>
        </div>
      </div>
    </div>

    <div
      v-if="selectedMap"
      class="floating-map"
      :style="floatingMapStyle"
    ></div>
  </main>
</template>

<script setup>
import { onMounted, ref, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";

const mapsData = ref([]);
const showTooltip = ref(true);
const isPortrait = ref(window.matchMedia("(orientation: portrait)").matches);

const selectedMap = ref(null);
const floatingMapStyle = ref(null);
const animating = ref(false);

const router = useRouter();
const route = useRoute();

async function getMapImages() {
  try {
    const response = await fetch(
      "http://directusgal.vidimus.it/files?filter[_and][0][folder][_eq]=dc17849a-2f6a-436b-ae2d-164b36f0141b&filter[_and][1][type][_eq]=image/png"
    );
    const data = await response.json();
    mapsData.value = data.data.map((item) => ({
      id: item.id,
      title: item.title,
    }));
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

function handleMapClick(event, map) {
  const lingua = route.params.lingua;

  if (isPortrait.value) {
    router.push({ name: "InteractiveMap", params: { lingua, id: map.id } });
    return;
  }

  const rect = event.currentTarget.getBoundingClientRect();
  selectedMap.value = map;

  const baseStyle = {
    position: "fixed",
    backgroundImage: `url(http://directusgal.vidimus.it/assets/${map.id})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    zIndex: 9999,
    transition: "all 2s ease",
  };

  floatingMapStyle.value = {
    ...baseStyle,
    top: `${rect.top}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
  };

  nextTick(() => {
    requestAnimationFrame(() => {
      floatingMapStyle.value = {
        ...baseStyle,
        top: "0px",
        left: "0px",
        width: "100vw",
        height: "100vh",
      };
    });
  });

  animating.value = true;

  setTimeout(() => {
    router.push({ name: "InteractiveMap", params: { lingua, id: map.id } });
  }, 2000);
}

onMounted(() => {
  getMapImages();
  window.addEventListener("resize", () => {
    isPortrait.value = window.matchMedia("(orientation: portrait)").matches;
  });
  setTimeout(() => {
    showTooltip.value = false;
  }, 2000);
});
</script>

<style scoped>
.app-main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.force-landscape {
  transform: rotate(90deg) translateY(-100%);
  transform-origin: top left;
  width: 100vh;
  height: 100vw;
  position: fixed;
  overflow: hidden;
}

.rotated {
  transform: rotate(-90deg);
  transform-origin: top left;
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

@keyframes fadeOut {
  to {
    opacity: 0;
    visibility: hidden;
  }
}

.grid-container {
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 0;
}

.grid-item {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  cursor: pointer;
}

.overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-text {
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  padding: 0 10px;
  text-shadow: 1px 1px 3px black;
}

.top-left-logo {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
  width: 15vw;
  height: auto;
}

.floating-map {
  position: fixed;
  border-radius: 0;
}
</style>
