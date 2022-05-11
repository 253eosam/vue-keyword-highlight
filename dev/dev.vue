<template>
  <div>
    <h1>vue-keyword-highlight.vue</h1>
    <VueKeywordHighlight :text=text>
    </VueKeywordHighlight>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import VueKeywordHighlight from '@/vue-keyword-highlight.vue'

export default defineComponent({
  components: {
    VueKeywordHighlight
  },
  setup() {
    const user = ref({
      name: '253eosam',
      age: 29,
      address: '사랑시 고백구 행복동 123-456 7동 809호',
      tel: '010-1234-5678'
    })

    return {
      text: user.value.address
    }
  },
})
</script>