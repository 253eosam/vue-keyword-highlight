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
          {{ text }}
        </td>
      </tr>

      <tr>
        <th>
          Highlight ::
        </th>
        <td>
          <VueKeywordHighlight :text=text />
        </td>
      </tr>

    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, getCurrentInstance, watch, computed } from '@vue/composition-api'
import VueKeywordHighlight from '@/vue-keyword-highlight.vue'

export default defineComponent({
  components: {
    VueKeywordHighlight
  },
  setup() {
    const { getters, dispatch }: any = getCurrentInstance()?.proxy.$store

    const input = ref('')
    watch(input, ()=> {
      dispatch('putSearch', input.value)
    })
    const text = '사랑시 고백구 행복동 123-456 7동 809호'
    
    const keywords = computed(()=> getters.getSearchKeywords)
    return {
      input,
      keywords,
      text
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