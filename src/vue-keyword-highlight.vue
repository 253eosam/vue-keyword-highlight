<template>
  <span v-html="output"/>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import { IOptions, TColor, THighlightField } from '@/types'
import store from '@/store/vueKeywordHighlight'

export interface IVueKeywordHighlightProps {
  text: string,
  field: string
}

export default defineComponent({
  name: 'vue-keyword-highlight',
  props: {
    text: {
      type: String,
      default: '',
      required: true,
    },
    field: {
      type: String
    }
  },
  setup(props: IVueKeywordHighlightProps) {
    const { getSearchKeywords, getOptions, getHighlightField  } = store()
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

    const isOnlyHighlight = computed<[boolean, THighlightField]>(() => {
      const field = getHighlightField()
      return [typeof field === 'string', field]
    })

    const output = computed<string>(() => {
      const text = props.text

      if (isOnlyHighlight.value[0] && props.field !== isOnlyHighlight.value[1]) return text

      return keywords.value
        .reduce((acc: string[], keyword: string): string[] => {
          let idx = text.indexOf(keyword)
          while(idx !== -1) {
            for(let ci = 0 ; ci < keyword.length; ci++) 
              acc[idx + ci] = highlightWrapping(keyword[ci])
            idx = text.indexOf(keyword, idx+1)
          }
          return acc
        }, Array.from(text))
        .join('')
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
</style>Í