export class TicTacToe {
    private _board: string[][];

    constructor() {
        this._board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ];
    }

    public get board() {
        return this._board;
    }
}
