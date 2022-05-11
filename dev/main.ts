import Vue, { VNode } from 'vue';
import Dev from './dev.vue';
import VueCompositionAPI from '@vue/composition-api'
import Vuex from 'vuex'
import { tokenizeSeparators } from '../src/util/keyword';
import { IState, IOptions } from '@/types';

Vue.use(Vuex)
Vue.use(VueCompositionAPI)
Vue.config.productionTip = false;

const store = new Vuex.Store<IState>({
  state: {
    search: '',
    separators: [' ', ','],
    options: {
      color: 'red'
    }
  },
  mutations: {
    setSearch(state, val: string): void {
      state.search = val
    }
  },
  actions: {
    putSearch ({ commit }, payload: string): void {
      commit('setSearch', payload)
    },
  },
  getters: {
    getSearchKeywords (state): string[] {
      return tokenizeSeparators( state.search, state.separators )
    },
    getOptions (state): IOptions {
      return state.options
    }
  }
})

new Vue({
  el: '#app',
  render: (h): VNode => h(Dev),
  store
})