// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import SelectLang from '../views/SelectLang.vue'
import Home from '../views/Home.vue'
import Info from '../views/Info.vue'
import Gallery from '../views/Gallery.vue'
import GalleryImg from '../views/GalleryImg.vue'
import GalleryVideo from '../views/GalleryVideo.vue'
import ImageList from '../views/ImageList.vue'
import VideoList from '../views/VideoList.vue'
import StoriaSbarco from '../views/StoriaSbarco.vue'
import Testimonianze from '../views/Testimonianze.vue'
import Mappe from '../views/Mappe.vue'
import Eventi from '../views/Eventi.vue'
import InfoEventi from '../views/InfoEventi.vue'
import SelectMap from '../views/SelectMap.vue'
import InteractiveMap from '../views/interactiveMap.vue'


const routes = [
  { path: '/', name: 'Lang', component: SelectLang, props:false },
  { path: '/:lingua/home', name: 'Home', component: Home, props:true },
  { path: '/:lingua/info', name: 'Info', component: Info, props:true },
  { path: '/:lingua/gallery', name: 'Gallery', component: Gallery, props:true },
  { path: '/:lingua/testimonanze', name: 'Testimonianze', component: Testimonianze, props:true },
  { path: '/:lingua/mappe', name: 'Mappe', component: Mappe, props:true },
  { path: '/:lingua/selectmap', name: 'SelectMap', component: SelectMap, props:true },
  { path: '/:lingua/interactivemap/:id', name: 'InteractiveMap', component: InteractiveMap, props:true },
  { path: '/:lingua/eventi', name: 'Eventi', component: Eventi, props:true },
  { path: '/:lingua/info-eventi/:id', name: 'InfoEventi', component: InfoEventi, props:true },
  { path: '/:lingua/gallery-img', name: 'Gallery-Img', component: GalleryImg, props:false },
  { path: '/:lingua/gallery-video', name: 'Gallery-Video', component: GalleryVideo, props:false },
  { path: '/:lingua/immagini/:image', name: 'Immagini', component: ImageList, props:true },
  { path: '/:lingua/video', name: 'Video', component: VideoList, props:false },
  { path: '/:lingua/storia-sbarco', name: 'Storia-Sbarco', component: StoriaSbarco, props:true },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
