<script lang="ts">
import Vue from 'vue';
import VueKeywordHighlight from '@/vue-keyword-highlight.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueKeywordHighlight
  }
});
</script>

<template>
  <div id="app">
    <vue-keyword-highlight />
  </div>
</template>
