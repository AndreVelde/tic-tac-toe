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

        this.drawBoard();

        if (!this.checkWinner() && !this.isDraw()) {
            this._currentPlayer = this._currentPlayer === Player.X ? Player.O : Player.X;
        }
    }

    public checkWinner() {
        for (const winnerOption of this.winnerOptions) {
            const [first, second, third] = winnerOption;
            const boardCellsForWinnerOption = [this._board[first.x][first.y], this._board[second.x][second.y], this._board[third.x][third.y]];

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
            this.makeMove(this.getRandomMove(smartBot));
        }

        if (this.isDraw()) {
            console.log('Draw!');
        } else {
            console.log(`Player ${this._currentPlayer} wins!`);
        }
    }

    private drawBoard() {
        const boardToDraw: string[] = [];

        this._board.forEach((row, index) => {
            boardToDraw.push(row.map((cell) => (cell === CellOptions.EMPTY ? ' ' : cell)).join('|'));
            if (index < this._board.length - 1) {
                boardToDraw.push('-----');
            }
        });

        console.log(boardToDraw.join('\n'));
    }

    private getRandomMove(smartBot: boolean): MoveOptions {
        if (smartBot) {
            const smartMove = this.getSmartMove();

            if (smartMove) {
                return smartMove;
            }
        }

        const emptyCells: MoveOptions[] = [];

        for (let x = 0; x < this._board.length; x++) {
            for (let y = 0; y < this._board[x].length; y++) {
                if (this._board[x][y] === CellOptions.EMPTY) {
                    emptyCells.push({ x, y });
                }
            }
        }

        return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    private getSmartMove(): MoveOptions | undefined {
        for (const winnerOption of this.winnerOptions) {
            const [first, second, third] = winnerOption;
            const boardCellsForWinnerOption = [this._board[first.x][first.y], this._board[second.x][second.y], this._board[third.x][third.y]];

            const twoCellsOfCurrentUser = boardCellsForWinnerOption.filter((cell) => cell === this._currentPlayer).length === 2;
            const oneCellStillEmpty = boardCellsForWinnerOption.filter((cell) => cell === CellOptions.EMPTY).length === 1;

            if (twoCellsOfCurrentUser && oneCellStillEmpty) {
                return winnerOption.find((cell) => this._board[cell.x][cell.y] === CellOptions.EMPTY)!;
            }
        }

        return undefined;
    }
}
