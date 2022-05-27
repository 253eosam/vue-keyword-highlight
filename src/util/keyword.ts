interface IKeywords {
  inKeyword: string;
  outKeyword: string;
}

interface IOptions {
  isUnion: boolean;
  isCaseSensitive: boolean;
  separators: string[];
}

const defaultKeywords: IKeywords = {
  inKeyword: '',
  outKeyword: '',
};

const defaultOptions: IOptions = {
  isUnion: false,
  isCaseSensitive: true,
  separators: [' ', ','],
};

export function keywordFilter <T, K extends keyof T>(
  arr: T[],
  key: T[K] extends string ? K : never,
  keywords: Partial<IKeywords>,
  options: Partial<IOptions>
): T[] {
  const { inKeyword, outKeyword }: IKeywords = { ...defaultKeywords, ...keywords };
  const { isUnion, separators, isCaseSensitive }: IOptions = { ...defaultOptions, ...options };

  const parsedInKeywords: string[] = tokenizeSeparators(inKeyword, separators);
  const parsedOutKeywords: string[] = tokenizeSeparators(outKeyword, separators);

  return arr
    .filter(item=> parsedInKeywords[isUnion ? 'every' : 'some']((x: string)=> x.length === 0 || strIncludes(String(item[key]), x, isCaseSensitive)))
    .filter((item: T)=> parsedOutKeywords.every((x: string)=> x.length === 0 || !strIncludes(String(item[key]), x, isCaseSensitive)));
}

function strIncludes(str: string, x: string, isCaseSensitive: boolean) {
  if (isCaseSensitive) return str.includes(x);
  return str.toUpperCase().includes(x.toUpperCase());
}

export function tokenizeSeparators(str: string, separators: string[]): any {
  const reg = new RegExp('([\\wㄱ-ㅎㅏ-ㅣ가-힣]+(?:[^' + separators.join('') + '])?)', 'g');
  return str.match(reg) || [];
}