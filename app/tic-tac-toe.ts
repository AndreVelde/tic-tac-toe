import { CellOptions } from './CellOptions';
import { MoveOptions } from './MoveOptions';
import { Player } from './Player';

export class TicTacToe {
    private _board: CellOptions[][];
    private _currentPlayer: Player;

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
        this._currentPlayer = this._currentPlayer === Player.X ? Player.O : Player.X;
    }
}
