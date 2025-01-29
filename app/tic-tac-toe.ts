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
        [MoveOptions.BOTTOM_LEFT, MoveOptions.BOTTOM_MIDDLE, MoveOptions.BOTTOM_RIGHT],

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
        if (this._board.at(move.row)?.at(move.column) === undefined) {
            throw new Error('Invalid move, cell out of bounds');
        }

        if (this._board[move.row][move.column] !== CellOptions.EMPTY) {
            throw new Error('Invalid move, already occupied cell');
        }

        this._board[move.row][move.column] = this._currentPlayer;

        this.drawBoard();

        if (!this.checkWinner() && !this.isDraw()) {
            this._currentPlayer = this._currentPlayer === Player.X ? Player.O : Player.X;
        }
    }

    public checkWinner() {
        for (const winnerOption of this.winnerOptions) {
            const [first, second, third] = winnerOption;
            const boardCellsForWinnerOption = [
                this._board[first.row][first.column],
                this._board[second.row][second.column],
                this._board[third.row][third.column],
            ];

            if (
                !boardCellsForWinnerOption.includes(CellOptions.EMPTY) &&
                boardCellsForWinnerOption.every((cell) => cell === boardCellsForWinnerOption[0])
            ) {
                return true;
            }
        }

        return false;
    }

    public isDraw() {
        return !this._board.flat().some((cell) => cell === CellOptions.EMPTY);
    }

    public playGame(smartBot: boolean = false) {
        while (!this.checkWinner() && !this.isDraw()) {
            console.log(`Currently playing: ${this._currentPlayer}`);
            this.makeMove(this.getRandomMove(smartBot));
        }

        if (this.isDraw()) {
            console.log('Draw!');
        } else {
            console.log(`Player ${this._currentPlayer} wins!`);
        }
    }

    private drawBoard() {
        const boardToDraw = this._board.map((row) => row.map((cell) => (cell === CellOptions.EMPTY ? ' ' : cell)).join('|')).join('\n-----\n');

        console.log(boardToDraw);
    }

    private getRandomMove(smartBot: boolean): MoveOptions {
        if (smartBot) {
            const smartMove = this.getSmartMove();

            if (smartMove) {
                return smartMove;
            }
        }

        const emptyCells: MoveOptions[] = this._board.flatMap((row, rowIndex) =>
            row
                .map((cell, columnIndex) => (cell === CellOptions.EMPTY ? { row: rowIndex, column: columnIndex } : undefined))
                .filter((cell) => cell !== undefined),
        );

        return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    private getSmartMove(): MoveOptions | undefined {
        for (const winnerOption of this.winnerOptions) {
            const [first, second, third] = winnerOption;
            const boardCellsForWinnerOption = [
                this._board[first.row][first.column],
                this._board[second.row][second.column],
                this._board[third.row][third.column],
            ];

            const twoCellsOfCurrentUser = boardCellsForWinnerOption.filter((cell) => cell === this._currentPlayer).length === 2;
            const oneCellStillEmpty = boardCellsForWinnerOption.filter((cell) => cell === CellOptions.EMPTY).length === 1;
            const twoCellsInRowForOpponent =
                boardCellsForWinnerOption.filter((cell) => cell !== this._currentPlayer && cell !== CellOptions.EMPTY).length === 2;

            if (twoCellsOfCurrentUser && oneCellStillEmpty) {
                return winnerOption.find((cell) => this._board[cell.row][cell.column] === CellOptions.EMPTY)!;
            }

            if (twoCellsInRowForOpponent && oneCellStillEmpty) {
                return winnerOption.find((cell) => this._board[cell.row][cell.column] === CellOptions.EMPTY)!;
            }
        }

        if (this._board[MoveOptions.MIDDLE.row][MoveOptions.MIDDLE.column] === CellOptions.EMPTY) {
            return MoveOptions.MIDDLE;
        }

        return undefined;
    }
}
