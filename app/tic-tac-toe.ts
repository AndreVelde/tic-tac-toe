import { Player } from './Player';

export class TicTacToe {
    private _board: string[][];
    private _currentPlayer: Player;

    constructor() {
        this._currentPlayer = Player.X;
        this._board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ];
    }

    public get board() {
        return this._board;
    }

    public get currentPlayer() {
        return this._currentPlayer;
    }
}
