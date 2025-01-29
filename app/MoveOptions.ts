interface Coordinate {
    row: number;
    column: number;
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

export const MoveOptions = {
    TOP_LEFT: { row: 0, column: 0 },
    TOP_MIDDLE: { row: 0, column: 1 },
    TOP_RIGHT: { row: 0, column: 2 },

    MIDDLE_LEFT: { row: 1, column: 0 },
    MIDDLE: { row: 1, column: 1 },
    MIDDLE_RIGHT: { row: 1, column: 2 },

    BOTTOM_LEFT: { row: 2, column: 0 },
    BOTTOM_MIDDLE: { row: 2, column: 1 },
    BOTTOM_RIGHT: { row: 2, column: 2 },
} as const satisfies Record<Moves, Coordinate>;
export type MoveOptions = (typeof MoveOptions)[keyof typeof MoveOptions];
