interface Coordinate {
    x: number;
    y: number;
}

export const Moves = {
    TOP_LEFT: 'TOP_LEFT',
    TOP_MIDDLE: 'TOP_MIDDLE',
    TOP_RIGHT: 'TOP_RIGHT',

    MIDDLE_LEFT: 'MIDDLE_LEFT',
    MIDDLE: 'MIDDLE',
    MIDDLE_RIGHT: 'MIDDLE_RIGHT',

    BOTTOM_LEFT: 'BOTTOM_LEFT',
    BOTTOM_MIDDLE: 'BOTTOM_MIDDLE',
    BOTTOM_RIGHT: 'BOTTOM_RIGHT',
} as const;
export type Moves = (typeof Moves)[keyof typeof Moves];

export const MoveOptions: Record<Moves, Coordinate> = {
    TOP_LEFT: { x: 0, y: 0 },
    TOP_MIDDLE: { x: 1, y: 0 },
    TOP_RIGHT: { x: 2, y: 0 },

    MIDDLE_LEFT: { x: 0, y: 1 },
    MIDDLE: { x: 1, y: 1 },
    MIDDLE_RIGHT: { x: 2, y: 1 },

    BOTTOM_LEFT: { x: 0, y: 2 },
    BOTTOM_MIDDLE: { x: 1, y: 2 },
    BOTTOM_RIGHT: { x: 2, y: 2 },
} as const;
export type MoveOptions = (typeof MoveOptions)[keyof typeof MoveOptions];
