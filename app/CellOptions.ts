export const CellOptions = {
    EMPTY: '',
    X: 'X',
    O: 'O',
} as const;
export type CellOptions = (typeof CellOptions)[keyof typeof CellOptions];
