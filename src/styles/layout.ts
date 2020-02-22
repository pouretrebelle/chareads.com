interface Sizes {
  S?: number
  M?: number
  L?: number
  XL?: number
}

export const COLUMNS = {
  S: 2,
  M: 12,
  L: 14,
  XL: 16,
}

export const GAP = {
  S: 0.04,
  M: 0.03,
  L: 0.02,
  XL: 0.02,
}

export const COLUMN_WIDTH: Sizes = {}
Object.keys(COLUMNS).forEach((size) => {
  COLUMN_WIDTH[size] = (1 - (COLUMNS[size] + 1) * GAP[size]) / COLUMNS[size]
})

export const MARGIN_COLUMNS = {
  S: 0,
  M: 0,
  L: 1,
  XL: 2,
}

export const GRID_MARGIN: Sizes = {}
Object.keys(COLUMNS).forEach((size) => {
  GRID_MARGIN[size] =
    (MARGIN_COLUMNS[size] + 1) * GAP[size] +
    MARGIN_COLUMNS[size] * COLUMN_WIDTH[size]
})

export const getWidthOfColumns: {
  S?: (columns: number) => {}
  M?: (columns: number) => {}
  L?: (columns: number) => {}
  XL?: (columns: number) => {}
} = {}
Object.keys(COLUMNS).forEach((size) => {
  getWidthOfColumns[size.toLowerCase()] = (columns: number): number =>
    (columns - 1) * GAP[size] + columns * COLUMN_WIDTH[size]
})

export const toPerc = (number: number): string =>
  `${(number * 100).toFixed(2)}%`
export const toVW = (number: number): string => `${(number * 100).toFixed(2)}vw`
