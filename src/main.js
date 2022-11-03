import { createApp } from 'vue/dist/vue.esm-bundler.js';
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css";
import Multiselect from '@vueform/multiselect'
import { PopoverRow, Calendar, DatePicker } from 'v-calendar';
import { Money3Component } from 'v-money3';
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'
import VueMultiselect from 'vue-multiselect'
import VueToast from 'vue-toast-notification';
import 'v-calendar/dist/style.css';
import 'vue-toast-notification/dist/theme-default.css';
import "vue-multiselect/dist/vue-multiselect.css";

import { isUserAuthenticated } from './utils/auth';

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
  .component('multi-select', Multiselect)
  .component('vue-multi-select', VueMultiselect)
  .component('money', Money3Component)
  .component('popover-row', PopoverRow)
  .component('v-calendar', Calendar)
  .component('v-date-picker', DatePicker)
  .mount('#app')
