import { CellOptions } from './CellOptions';
import { MoveOptions } from './MoveOptions';
import { Player } from './Player';

export class TicTacToe {
    private readonly _board: CellOptions[][];
    private _currentPlayer: Player;
    private readonly winnerOptions: MoveOptions[][] = [
        // Vertical wins
        [MoveOptions.TOP_LEFT, MoveOptions.MIDDLE_LEFT, MoveOptions.BOTTOM_LEFT],
        [MoveOptions.TOP_MIDDLE, MoveOptions.MIDDLE, MoveOptions.BOTTOM_MIDDLE],
        [MoveOptions.TOP_RIGHT, MoveOptions.MIDDLE_RIGHT, MoveOptions.BOTTOM_RIGHT],

        // Horizontal wins
        [MoveOptions.TOP_LEFT, MoveOptions.TOP_MIDDLE, MoveOptions.TOP_RIGHT],
        [MoveOptions.MIDDLE_LEFT, MoveOptions.MIDDLE, MoveOptions.MIDDLE_RIGHT],
        [MoveOptions.BOTTOM_RIGHT, MoveOptions.BOTTOM_MIDDLE, MoveOptions.BOTTOM_RIGHT],

        // Diagonal wins
        [MoveOptions.TOP_LEFT, MoveOptions.MIDDLE, MoveOptions.BOTTOM_RIGHT],
        [MoveOptions.TOP_RIGHT, MoveOptions.MIDDLE, MoveOptions.BOTTOM_LEFT],
    ];

    constructor() {
        this._currentPlayer = Player.X;
        this._board = [
            [CellOptions.EMPTY, CellOptions.EMPTY, CellOptions.EMPTY],
            [CellOptions.EMPTY, CellOptions.EMPTY, CellOptions.EMPTY],
            [CellOptions.EMPTY, CellOptions.EMPTY, CellOptions.EMPTY],
        ];
    }

    public get board() {
        return this._board;
    }

    public get currentPlayer() {
        return this._currentPlayer;
    }

    public makeMove(move: MoveOptions) {
        if (this._board.at(move.x)?.at(move.y) === undefined) {
            throw new Error('Invalid move, cell out of bounds');
        }

        if (this._board[move.x][move.y] !== CellOptions.EMPTY) {
            throw new Error('Invalid move, already occupied cell');
        }

        this._board[move.x][move.y] = this._currentPlayer;

        if (!this.checkWinner() && !this.isDraw()) {
            this._currentPlayer = this._currentPlayer === Player.X ? Player.O : Player.X;
        }
    }

    public checkWinner() {
        for (const winnerOption of this.winnerOptions) {
            const [first, second, third] = winnerOption;
            const firstCell = this._board[first.x][first.y];
            const secondCell = this._board[second.x][second.y];
            const thirdCell = this._board[third.x][third.y];

            if (firstCell === CellOptions.EMPTY || secondCell === CellOptions.EMPTY || thirdCell === CellOptions.EMPTY) {
                continue;
            }

            if (firstCell === secondCell && firstCell === thirdCell) {
                return true;
            }
        }

        return false;
    }

    public isDraw() {
        return !this._board.flat().some((cell) => cell === CellOptions.EMPTY);
    }
}
