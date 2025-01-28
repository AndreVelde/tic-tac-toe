export const CellOptions = {
    EMPTY: '',
    X: 'X',
    O: 'O',
};
export type CellOptions = (typeof CellOptions)[keyof typeof CellOptions];
