export const Player = {
    X: 'X',
    O: 'O',
};
export type Player = (typeof Player)[keyof typeof Player];
