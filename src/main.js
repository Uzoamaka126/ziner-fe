import { createApp } from 'vue/dist/vue.esm-bundler.js';
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css";
import Multiselect from '@vueform/multiselect'
import Draggable from "vuedraggable";
import { PopoverRow, Calendar, DatePicker } from 'v-calendar';
import { Money3Component } from 'v-money3';
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'
import Vue3Tour from 'vue3-tour'
import 'vue3-tour/dist/vue3-tour.css';
import VueToast from 'vue-toast-notification';
// Import one of the available themes
import 'vue-toast-notification/dist/theme-default.css';
// import 'vue-toast-notification/dist/theme-sugar.css';

import { isUserAuthenticated } from './utils/auth';

window.moment = require('moment');
// set a navigation guard for protected routes
router.beforeEach((to, from, next) => {
  const isAuthOrHomePage = to.name !== 'login' && to.name !== 'signup' && to.name !== 'reset';
  if (!isUserAuthenticated() && isAuthOrHomePage) next({ name: 'login' })
  else next()
});

createApp(App)
  .use(router)
  .use(store)
  .use(VueChartkick)
  .use(VueToast)
  .use(Vue3Tour)
  .component('multi-select', Multiselect)
  .component('money', Money3Component)
  .component('draggable', Draggable)
  .component('popover-row', PopoverRow)
  .component('v-calendar', Calendar)
  .component('v-date-picker', DatePicker)
  .mount('#app')
