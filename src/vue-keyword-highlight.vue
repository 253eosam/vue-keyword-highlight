<template>
  <span v-html="output"/>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import { IOptions, TColor } from '@/types'
import store from '@/store/vueKeywordHighlight'

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
    const { getSearchKeywords, getOptions  } = store()
    const keywords = computed<string[]>(() => getSearchKeywords())
    const options = computed<IOptions>(()=> getOptions())

    const highlightWrapping = (str: string): string => {
      const spanEl = document.createElement('b')
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

    const output = computed<string>(() => {
      const text = props.text
      let result = Array.from(text)
      const regexp = new RegExp(`[${keywords.value.join('|')}]`, 'g')
      const iterator = text.matchAll(regexp)
      for(const iter of iterator) {
        const [s,i]: [string, number] = [iter[0], iter.index!]
        result[i] = highlightWrapping(s)
      }

      return result.join('')  
    })
    return {
      output,
      options,
    }
  },
})
</script>

<style scoped>
::v-deep b {
  font-weight: 400;
}
</style>