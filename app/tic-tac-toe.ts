import { CellOptions } from './CellOptions';
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

    public makeMove(x: number, y: number) {
        if (this._board.at(x)?.at(y) === undefined) {
            throw new Error('Invalid move, cell out of bounds');
        }

        if (this._board[x][y] === CellOptions.EMPTY) {
            this._board[x][y] = this._currentPlayer;
            this._currentPlayer = this._currentPlayer === Player.X ? Player.O : Player.X;
        } else {
            throw new Error('Invalid move, already occupied cell');
        }
    }
}
