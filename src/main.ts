import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import 'boxicons/css/boxicons.min.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Tambahkan ikon ke pustaka FontAwesome
library.add(faWhatsapp);

// Buat aplikasi Vue
const app = createApp(App);

// Gunakan router dan daftarkan komponen global FontAwesomeIcon
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);

// Mount aplikasi
app.mount('#app');
