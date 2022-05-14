import Vue, { VNode } from 'vue';
import '@/lib/composition-api'
import Dev from './dev.vue';

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  render: (h): VNode => h(Dev),
})