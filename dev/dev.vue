<template>
  <div>
    <h1>DEV space</h1>
    <table>

      <tr>
        <th>
          Selected search field ::
        </th>
        <td>
          <label>
            <input type="radio" name="field" v-model="field">
            ALL
          </label>
          <label>
            <input type="radio" name="field" v-model="field" value="A">
            A
          </label>
          <label>
            <input type="radio" name="field" v-model="field" value="B">
            B
          </label>
        </td>
      </tr>

      <tr>
        <th>
          Input search keywords ::
        </th>
        <td>
          <input class="search-input" type="text" :value="input" @input="onInput"/>
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
          Highlight (No field). ::
        </th>
        <td>
          <VueKeywordHighlight :text="TEXT" />
        </td>
      </tr>

      <tr>
        <th>
          Highlight (field A). ::
        </th>
        <td>
          <VueKeywordHighlight :text="TEXT" :field="'A'" />
        </td>
      </tr>

      <tr>
        <th>
          Highlight (field B). ::
        </th>
        <td>
          <VueKeywordHighlight :text="TEXT" :field="'B'" />
        </td>
      </tr>

    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, getCurrentInstance } from '@vue/composition-api'
import VueKeywordHighlight from '@/vue-keyword-highlight.vue'
import { THighlightField } from '@/types'

const TEXT = '사랑시 고백구 행복동 123-456 7동 809호'

export default defineComponent({
  components: {
    VueKeywordHighlight
  },
  setup() {
    const that = getCurrentInstance()!.proxy 
    const { setSearch, getSearchKeywords, setHighlightField } = that.$vueKeywordHighlight()
    const input = ref<string>('')
    const field = ref<THighlightField>(null)

    watch(field, ()=> {
      setHighlightField(field.value)
    })
    
    const keywords = computed(()=> getSearchKeywords())

    return {
      input,
      field,
      keywords,
      TEXT,
      onInput(evt : InputEvent & { target : HTMLInputElement }) {
        input.value = evt.target!.value
        setSearch(input.value)
      }
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
.search-input {
  width: 100%;
}
label {
  padding: 0 10px;
}
</style>