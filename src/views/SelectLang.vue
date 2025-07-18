<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();


function selectLingua(lingua) {
  switch (lingua) {
    case "english":
      router.push({ name: "Home", params: { lingua: "en" } });
      break;
    case "italiano":
      router.push({ name: "Home", params: { lingua: "it" } });
      break;
  }
}


</script>

<template>
  <div class="container">

    <!-- SELEZIONA UNA LINGUA</h1> -->

    <div class="cards-wrapper">
      <div class="card" @click="selectLingua('italiano')">
        <img src="/italy-flag-round-large.png" alt="ITALIANO" class="flag" />
        <strong class="language">ITALIANO</strong>
      </div>
      <div class="card" @click="selectLingua('english')">
        <img
          src="/United-kingdom_flag_icon_round.svg.png"
          alt="ENGLISH"
          class="flag"
        />
        <strong class="language">ENGLISH</strong>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;     
  min-height: 80vh;
  max-height: 100vh;
  text-align: center;
  box-sizing: border-box;
  background-image: url("/Mediamodifier-Design.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 4000px;
  background-position-x: -900px;
  background-position-y: -900px;
  
}

.title {
  margin-top: 20px;
  font-size: 24px;
}

.cards-wrapper {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.card {
  background-color: #f5f5f5;
  padding: 30px 20px;
  width: 100%;
  height: 45px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color:black;
}

.flag {
  width: 46px;
  margin-bottom: 10px;
}

.language {
  font-size: 16px;
}
</style>

