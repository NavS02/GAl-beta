<script setup>
import { ref, watch,computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import ChatBot from "./components/ChatBot.vue";

const router = useRouter();
const route = useRoute();
const currentLang = ref(route.params.lingua || "it");
const isOnLanguagePage = computed(() => {
  return (
    route.path === "Lang" ||
    route.name === "SelectMap" ||
    route.name === "InteractiveMap"
  );
});



const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const menuItems = [
  { name: "Home", to: { name: "Home", params: { lingua: currentLang.value } } },
  {
    name: "Storia dello Sbarco",
    to: { name: "Storia-Sbarco", params: { lingua: currentLang.value } },
  },
  {
    name: "Testimonianze",
    to: { name: "Testimonianze", params: { lingua: currentLang.value } },
  },
  {
    name: "Mappe",
    to: { name: "Mappe", params: { lingua: currentLang.value } },
  },
  {
    name: "Galleria",
    to: { name: "Gallery", params: { lingua: currentLang.value } },
  },
  {
    name: "Eventi",
    to: { name: "Eventi", params: { lingua: currentLang.value } },
  },
  { name: "Info", to: { name: "Info", params: { lingua: currentLang.value } } },
  { name: "Lingue", to: "/" },
];

// const menuItems_eng = [
//   { name: "Home", route: "Home", param: { lingua: "en" } },
//   {
//     name: "Storia dello Sbarco",
//     route: "Storia-sbarco",
//     param: { lingua: "en" },
//   },
//   { name: "Testimonianze", path: "/testimonianze" },
//   { name: "Mappa", path: "/map" },
//   { name: "Galleria", path: "/gallery" },
//   { name: "Eventi", path: "/eventi" },
//   { name: "Info", path: "/info" },
//   { name: "Lingue", path: "/" },
// ];
function goHome() {
  router.push({ name: "Home", params: { lingua: currentLang.value } });
}
watch(
  () => route.params.lingua,
  (newVal) => {
    if (newVal) currentLang.value = newVal;
  }
);
</script>

<template>
  <div>
    <!-- Header -->
    <header class="app-header"
    v-if="!isOnLanguagePage"
    >
      <div class="logo">
        <a @click="goHome()">
          <img src="/logo-valli-del-golfo.png" alt="" />
        </a>
      </div>

      <!-- Hamburger Button -->
      <button
        v-if="!isOnLanguagePage"

        class="hamburger-btn"
        :class="{ active: isMenuOpen }"
        @click="toggleMenu"
      >
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>

      <!-- Mobile Menu -->
      <div class="mobile-menu" :class="{ active: isMenuOpen }">
        <nav>
          <ul>
            <li v-for="item in menuItems" :key="item.name" @click="closeMenu()">
              <router-link
                :to="item.to"
                @click="closeMenu"
                class="menu-link"
                active-class="menu-link2"
              >
                {{ item.name }}
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <router-view> </router-view>
    <!-- Footer with Social Networks -->
        
    <footer class="app-footer" v-if="!isOnLanguagePage">
      <ChatBot></ChatBot>
    </footer>
  </div>
</template>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css");

/* === IMPORT FONT-FACE === */
@font-face {
  font-family: 'Roboto Light';
  src: url('/fonts/Roboto-Light.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: 'Neutral Face Bold';
  src: url('/fonts/NeutralFace-Bold.otf') format('opentype');
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: 'Neris Light';
  src: url('/fonts/Neris-Light.otf') format('opentype');
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: 'Neris SemiBold';
  src: url('/fonts/Neris-SemiBold.otf') format('opentype');
  font-weight: 600;
  font-style: normal;
}

@font-face {
  font-family: 'Neris Black';
  src: url('/fonts/Neris-Black.otf') format('opentype');
  font-weight: 900;
  font-style: normal;
}

@font-face {
  font-family: 'Neris Black Italic';
  src: url('/fonts/Neris-BlackItalic.otf') format('opentype');
  font-weight: 900;
  font-style: italic;
}

@font-face {
  font-family: 'Coolvetica';
  src: url('/fonts/coolvetica-rg.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
}

/* === ROOT VARIABLES AND DEFAULT FONT STACK === */
:root {
  font-family: 'Roboto Light', 'Neris Light', 'Neutral Face Bold', 'Neris SemiBold', 'Neris Black', 'Coolvetica', sans-serif;
  color: #519171;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  font-weight: 500;
  color: #967147;
  text-decoration: inherit;
}
a:hover {
  color: #954f00;
}

body {
  font-family: "Inter", sans-serif;
  margin: 0;
  background: url(/background.jpg) no-repeat center center;
  background-size: cover;
}

h1 {
  font-size: 3rem;
}

/* Header Styles */
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo img {
  width: 35vw;
  height: auto;
}

/* Hamburger Menu */
.hamburger-btn {
  background: none;
  border: none;
  width: 32px;
  height: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  cursor: pointer;
  padding: 0;
  z-index: 101;
}

.hamburger-line {
  display: block;
  width: 100%;
  height: 3px;
  background-color: #519171;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: center;
}

.hamburger-btn.active .hamburger-line:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}

.hamburger-btn.active .hamburger-line:nth-child(2) {
  opacity: 0;
}

.hamburger-btn.active .hamburger-line:nth-child(3) {
  transform: translateY(-12px) rotate(-45deg);
}

/* Mobile Menu */
.mobile-menu {
  position: fixed;
  top: 0;
  right: -100%;
  width: 75%;
  height: 100vh;
  background-color: #213c2e;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  padding: 5rem 1.5rem 2rem;
  z-index: 99;
}

.mobile-menu.active {
  right: 0;
}

.mobile-menu ul {
  list-style: none;
}

.mobile-menu li {
  margin-bottom: 10px;
}

.menu-link {
  text-decoration: none;
  color: #519171;
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: block;
  padding: 0.5rem 0;
}

.menu-link2 {
  text-decoration: none;
  color: #00ff80;
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: block;
  padding: 0.5rem 0;
}
/* Footer with Social Networks */
.app-footer {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  padding: 10px;
}

@media (min-width: 600px) {
  .app-header {
    padding: 1rem 2rem;
  }
}
</style>
