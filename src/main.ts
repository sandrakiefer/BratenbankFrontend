import Vue from 'vue'
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);

// FontAwesome-CSS laden
import '@fortawesome/fontawesome-free/css/all.css'

// Bulma-Anpassungen über main.scss
import '@/assets/main.scss'

// MIT diesem Import werden die <i class="fa.."/> durch <svg> ersetzt,
// was nett ist, ABER dann gehen <i ... v-bind:class=../> NICHT mehr,
// was z.B. umgebende <span v-bind:class="..."><i class="fa.."/></span> nötig macht.
// Mit all.css (ohne all.js) geht's.
//
// import '@fortawesome/fontawesome-free/js/all.js'

import App from './App.vue'

new Vue({
  render: h => h(App),
}).$mount('#app')
