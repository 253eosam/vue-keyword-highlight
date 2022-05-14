import { reactive } from "@vue/composition-api";
import { tokenizeSeparators } from '@/util/keyword';
import { IState } from "@/types";
import { IOptions } from '../types/index';

const initState = (): IState => ({
  search: '',
  separators: [' ',','],
  options: {
    color: 'pink'
  }
})

const state = reactive<IState>(initState());

export default function useKeywordHighlight() {

  function setSearch (pSearch: string ): void {
    state.search = pSearch
  }

  function getSearchKeywords (): string[] {
    return tokenizeSeparators( state.search, state.separators )
  }

  function getOptions (): IOptions {
    return state.options
  }


    return {
        setSearch,
        getOptions,
        getSearchKeywords
    }
}