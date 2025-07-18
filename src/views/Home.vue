<template>
  <main class="app-main">
    <div class="cards-grid">
      <div
        v-for="card in cards"
        :key="card.id"
        class="service-card"
        @click="navigateTo(card)"
      >
        <div class="card-image-container">
          <img :src="card.image" :alt="card.title" class="card-image" />
          <div class="card-overlay">
            <h3 class="card-title">{{ card.title }}</h3>
          </div>
        </div>
      </div>
    </div>

    <!-- Crediti -->
    <div class="crediti-section">
      <div class="crediti-logos" v-if="crediti">
        <img
          v-for="logo in crediti.gallery"
          :key="logo.id"
          :src="
            'http://directusgal.vidimus.it/assets/' + logo.directus_files_id?.id
          "
          :alt="logo.title || 'Logo'"
          class="logo-img"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const cards = [
  {
    id: 1,
    title: "Storia dello Sbarco",
    image:
      "https://cdn.pixabay.com/photo/2012/10/26/02/44/war-63137_1280.jpg",
    name: "Storia-Sbarco",
  },
  {
    id: 2,
    title: "Testimonianze",
    image:
      "https://cdn.pixabay.com/photo/2017/09/12/19/30/signature-2743370_1280.jpg",
    name: "Testimonianze",
  },
  {
    id: 3,
    title: "Mappe",
    image:
      "https://cdn.pixabay.com/photo/2020/01/12/17/31/middle-earth-4760561_1280.jpg",
    name: "Mappe",
  },
  {
    id: 4,
    title: "Galleria",
    image:
      "https://cdn.pixabay.com/photo/2017/08/06/09/29/man-2590655_1280.jpg",
    name: "Gallery",
  },
  {
    id: 5,
    title: "Eventi GAL",
    image:
      "https://cdn.pixabay.com/photo/2020/03/23/17/05/phone-4961455_1280.jpg",
    name: "Eventi",
  },
  {
    id: 6,
    title: "Info",
    image:
      "https://cdn.pixabay.com/photo/2019/02/02/14/27/qr-code-3970681_1280.jpg",
    name: "Info",
  },
];

const navigateTo = (card) => {
  const myroute = { name: card.name };
  myroute.params = route.params.lingua;
  router.push(myroute);
};

// CREDITI
const crediti = ref();

onMounted(async () => {
  try {
    const res = await fetch(
      "http://directusgal.vidimus.it/items/APP/1?fields=*.*.*"
    );
    const json = await res.json();
    crediti.value = json.data;
  } catch (error) {
    console.error("Errore nel caricamento dei crediti:", error);
  }
});
</script>

<style scoped>
/* Main Content */
.app-main {
  flex: 1;
  padding: 10px;
}

.cards-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  max-width: 600px;
  margin: 0 0 0 0;
  text-transform: uppercase;
}

/* .service-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5px;
  flex-wrap: wrap;
  flex-direction: row;
} */

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
  height: 80px;
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
  height: auto;
  object-fit: cover;
  transition: all 0.3s ease;
  position: relative;
  z-index: 0;
}

.service-card:hover .card-image {
  transform: scale(1.05);
}

.card-title {
  font-size: 15px;
  text-align: center;
  margin: 0;
  padding: 4px 8px;
  z-index: 0;
  color: white;
}

/* -------------------- */
/* --- Main Crediti --- */
/* -------------------- */

.crediti-section {
  margin-top: 40px;
  padding-top: 20px;
}

.crediti-title {
  font-size: 14px;
  margin-bottom: 10px;
}

.crediti-logos {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
}

.logo-img {
  max-height: 40px;
  object-fit: contain;
}

.card-arrow {
  font-size: 18px;
}

/* Responsive Adjustments */
@media (min-width: 400px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .card-image-container {
    height: 150px;
  }
}

@media (min-width: 600px) {
  .app-header {
    padding: 1rem 2rem;
  }

  .app-main {
    padding: 2rem;
  }

  .mobile-menu {
    width: 60%;
    max-width: 300px;
  }
}
</style>
