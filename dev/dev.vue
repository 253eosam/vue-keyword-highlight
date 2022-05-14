<template>
  <div>
    <h1>DEV space</h1>
    <table>

      <tr>
        <th>
          Input search keywords ::
        </th>
        <td>
          <input type="text" v-model="input"/>
        </td>
      </tr>

      <tr>
        <th>
          Keyword result ::
        </th>
        <td>
          {{ keywords }}
        </td>
      </tr>

      <tr>
        <th>
          Test string :: 
        </th>
        <td>
          {{ TEXT }}
        </td>
      </tr>

      <tr>
        <th>
          Highlight ::
        </th>
        <td>
          <VueKeywordHighlight :text="TEXT" />
        </td>
      </tr>

    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from '@vue/composition-api'
import VueKeywordHighlight from '@/vue-keyword-highlight.vue'
import store from '@/store/vueKeywordHighlight'

const TEXT = '사랑시 고백구 행복동 123-456 7동 809호'

export default defineComponent({
  components: {
    VueKeywordHighlight
  },
  setup() {
    const { setSearch, getSearchKeywords } = store()
    const input = ref('')

    watch(input, ()=> {
      setSearch(input.value)
    })
    
    const keywords = computed(()=> getSearchKeywords())

    return {
      input,
      keywords,
      TEXT
    }
  },
})
</script>

<style scoped>
th {
  text-align: left;
}
td {
  text-align: center;
}
input {
  width: 100%;
}
</style>