<template>
  <span v-html="output"></span>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance } from '@vue/composition-api'
import { TColor } from '@/types'

export interface IVueKeywordHighlightProps {
  text: string
}

export default defineComponent({
  name: 'vue-keyword-highlight',
  props: {
    text: {
      type: String,
      default: '',
      required: true,
    },
  },
  setup(props: IVueKeywordHighlightProps) {
    const { getters }: any = getCurrentInstance()?.proxy.$store

    const keywords = computed<string[]>(() => getters.getSearchKeywords)
    const options = computed<{ color: TColor }>(()=> getters.getOptions)

    const highlightWrapping = (str: string): string => {
      const spanEl = document.createElement('span')
      spanEl.setAttribute('style', makeStyle({ highlightColor : options.value.color}))
      spanEl.innerText = str
      return spanEl.outerHTML

      function makeStyle({ highlightColor }: { highlightColor: TColor }): string {
        return Object.entries({
          background: highlightColor,
        })
          .map(([key, value]) => `${key}:${value}`)
          .join(';')
      }
    }

    const output = computed(() => {
      let text = props.text

      return text.replaceAll(
        new RegExp(`[${keywords.value.join('|')}]`, 'g'),
        'r'
      )

    })
    return {
      output,options
    }
  },
})
</script>
