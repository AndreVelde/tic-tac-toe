export const Player = {
    X: 'X',
    O: 'O',
} as const;
export type Player = (typeof Player)[keyof typeof Player];
