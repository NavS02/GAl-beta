<template>
  <main class="app-main">
    <!-- Bottone di accesso -->
    <div class="button-section">
      <button @click="goToMap" class="start-button">Scopri le Mappe</button>
    </div>

    <!-- Sezione Testo -->
    <section
      class="content-section"
      v-for="(section, index) in sections"
      :key="index"
      :ref="(el) => (sectionRefs[index] = el)"
      :class="{ 'in-view': sectionInView[index] }"
    >
      <h1 class="title">{{ section.title }}</h1>
      <h2 class="subtitle">{{ section.subtitle }}</h2>
      <div class="description" v-html="section.description"></div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const goToMap = () => {
  router.push({ name: "SelectMap", params: { lingua: route.params.lingua } });
};

const sections = [
  {
    title: "Operazione Husky",
    subtitle: "SCOGLITTI 1943",
    description: `
    <p>Le truppe americane, qui sbarcate, occuparono la città. Mentre gli inglesi approdavano nel Golfo di Noto, gli americani prendevano terra nel Golfo di Gela, conquistando la città. Ma la conquista non fu semplice: subito dopo lo sbarco, gli americani subirono una dura controffensiva da parte delle forze italiane e tede-
    sche. La divisione italiana e quella tedesca diedero del filo da torcere agli invasori ma gli sforzi non furono sufficienti tanto che nella battaglia, che infuriò sulla
    Piana di Gela e sulle colline che la circondano, ebbero la meglio gli alleati.</p>
    <p>La difesa dei militari italiani a Gela fu notevole tanto che, anche se per breve tempo, riuscirono a rallentare l'avanzata americana. Di essi si ricordano il caporalmaggiore Cesare Pellegrini, che morì nel fortino di Porta Marina.
    L'Operazione Husky, avviata il 10 luglio 1943, rappresenta uno dei momenti più significativi della Seconda Guerra Mondiale. Con lo sbarco in Sicilia, gli Alleati diedero inizio alla campagna d'ltalia, mirata a sottrarre il paese al controllo dell'Asse e a stabilire un nuovo fronte europeo. Lo sbarco in Sicilia costituì una delle più grandi operazioni anfibie della Seconda Guerra Mondiale visto anche l'ingente utilizzo di navi, mezzi da sbarco e aerei.</p>
    <p>Nelle prime ore del 10 luglio, le truppe alleate sbarcarono lungo la costa meridionale della Sicilia, con particolare intensità tra Licata, Gela e Scoglitti. L'operazione coinvolse oltre 150.000 soldati supportati da una vasta flotta navale e aerea
    L'obiettivo era quello di stabilire una base militare sicura per permettere l'avanzata verso l'entroterra e la successiva conquista dell'isola.</p>
    <p>Vi presero parte due grandi unità alleate la 7ª armata statunitense al comando del generale George Smith Patton e l'8ª Armata britannica al comando del generale Bernard Law Montgomery. Le due armate sbarcarono nella zona sud-orientale della Sicilia con il compito di avanzare in contemporanea all'interno dell'isola: la 7ª Armata di Patton avrebbe dovuto avanzare verso Palermo e occupare la parte occidentale dell'isola, mentre l'8ª Armata di Montgomery avrebbe dovuto marciare lungo la parte centro-orientale della Sicilia verso Messina</p>
    <p>Gela fu uno dei principali punti di sbarco. La città e le sue spiagge furono teatro di intensi combattimenti, con le truppe americane che affrontarono una strenua resistenza da parte delle forze italiane e tedesche. La conquista di Gela fu cruciale per assicurare una base logistica per tutte le operazioni successive.
    Situata nell'entroterra, Acate divenne un punto strategico durante l'avanzata alleata. Le truppe utilizzarono le strade e i ponti della zona per spostarsi rapidamente verso nord, affrontando occasionali sacche di resistenza
    Vittoria fu coinvolta nelle operazioni militari poiché la città servì come punto di transito per le truppe e come base per il coordinamento delle operazioni nell'area circostante</p>
    <p>Il porto di Scoglitti fu uno dei siti di sbarco meno difesi, permettendo agli Alleati di stabilire rapidamente una testa di ponte. Da qui, le truppe avanzarono verso l'interno, contribuendo alla rapida progressione dell'operazione.</p>
    `,
  },
];

// IntersectionObserver
const sectionRefs = ref([]);
const sectionInView = ref([]);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const index = sectionRefs.value.indexOf(entry.target);
      if (index !== -1) {
        sectionInView.value[index] = entry.isIntersecting;
      }
    });
  },
  { threshold: 0.2 }
);

onMounted(() => {
  sectionInView.value = sections.map(() => false);

  sectionRefs.value.forEach((el, index) => {
    if (el) {
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
      if (isVisible) {
        sectionInView.value[index] = true;
      } else {
        observer.observe(el);
      }
    }
  });
});

onBeforeUnmount(() => {
  sectionRefs.value.forEach((el) => {
    if (el) observer.unobserve(el);
  });
});
</script>

<style scoped>
.app-main {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to bottom, #ffffff, #f3f8f5);
  font-family: "Roboto", sans-serif;
  overflow-x: hidden;
}

.button-section {
  margin-top: 40px;
  margin-bottom: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.start-button {
  background-color: #519171;
  color: white;
  border: none;
  padding: 14px 28px;
  font-size: 1.1rem;
  border-radius: 32px;
  box-shadow: 0 8px 16px rgba(81, 145, 113, 0.3);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.start-button:active {
  transform: scale(0.96);
  box-shadow: 0 4px 8px rgba(81, 145, 113, 0.2);
}

.content-section {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  max-width: 100%;
  text-align: center;
  margin-bottom: 40px;
}

.content-section.in-view {
  opacity: 1;
  transform: translateY(0);
}

.title {
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: #3e2f1c;
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 8px;
  color: #3e2f1c;
}

.description {
  font-size: 1rem;
  color: #3e2f1c;
  line-height: 1.6;
}

@media (min-width: 600px) {
  .title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1.4rem;
  }

  .description {
    font-size: 1.1rem;
  }
}
</style>
