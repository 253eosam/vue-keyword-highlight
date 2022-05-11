export type TColor = 'red'

export interface IState {
  search: string,
  separators: string[],
  options: IOptions
}

export interface IOptions {
  color: TColor
}