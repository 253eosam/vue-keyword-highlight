export type TColor = string

export interface IState {
  search: string,
  separators: string[],
  highlightField: string | null,
  options: IOptions
}

export interface IOptions {
  color: TColor
}

export type THighlightField = null | string

export interface IKeywordHighlight {
  setSearch: (search: string) => void
  setHighlightField: (field: THighlightField)=> void
  getOptions: ()=> string[]
  getSearchKeywords: ()=> IOptions
  getHighlightField: ()=> THighlightField
}