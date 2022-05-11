<template>
  <span>
    {{ text }}
  </span>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'vue-keyword-highlight',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
})
</script>
