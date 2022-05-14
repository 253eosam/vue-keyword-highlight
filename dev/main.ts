import Vue, { VNode } from 'vue';
import '@/lib/composition-api'
import Dev from './dev.vue';
import vueKeywordHighlight from  '@/store/vueKeywordHighlight'

Vue.config.productionTip = false;
Vue.prototype.$vueKeywordHighlight = vueKeywordHighlight

new Vue({
  el: '#app',
  render: (h): VNode => h(Dev),
})