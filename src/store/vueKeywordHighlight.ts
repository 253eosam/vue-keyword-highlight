import { reactive } from "@vue/composition-api";
import { tokenizeSeparators } from '@/util/keyword';
import { IState, THighlightField } from "@/types";
import { IOptions } from '../types/index';

const initState = (): IState => ({
  search: '',
  separators: [' ',','],
  highlightField: null,
  options: {
    color: 'pink'
  }
})

const state = reactive<IState>(initState());

export default function useKeywordHighlight() {

  function setSearch (pSearch: string ): void {
    state.search = pSearch
  }
  function setHighlightField (pField: THighlightField): void {
    state.highlightField = pField
  }

  function getSearchKeywords (): string[] {
    return tokenizeSeparators( state.search, state.separators )
      .filter(filterOverlap)
      .sort(sortStringLengthDesc)
  }

  function getOptions (): IOptions {
    return state.options
  }
  function getHighlightField (): THighlightField {
    return state.highlightField
  }

    return {
        setSearch,
        setHighlightField,
        getOptions,
        getSearchKeywords,
        getHighlightField
    }
}

function filterOverlap (str: string, idx: number, arr: string[]): boolean {
  return arr.indexOf(str) === idx
}

function sortStringLengthDesc (a: string, b: string): number {
  return b.length - a.length
} 