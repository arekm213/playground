export const COLUMNS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as const;
export const ROWS = [8, 7, 6, 5, 4, 3, 2, 1] as const;

export const squareToIndices = (square: string): [number, number] => {
  const ci = COLUMNS.indexOf(square[0] as (typeof COLUMNS)[number]);
  const ri = ROWS.indexOf(parseInt(square.slice(1), 10) as (typeof ROWS)[number]);
  return [ci, ri];
};
