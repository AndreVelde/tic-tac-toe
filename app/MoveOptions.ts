interface Coordinate {
    x: number;
    y: number;
}

export const MoveOptions: Record<string, Coordinate> = {
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
