import { MoveOptions } from '../app/MoveOptions';
import { Player } from '../app/Player';
import { TicTacToe } from '../app/tic-tac-toe';

describe('Tic tac toe Test', () => {
    it('board is created with a 3 by 3 grid', () => {
        const ticTacToe = new TicTacToe();

        expect(ticTacToe.board).toStrictEqual([
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ]);
    });

    it('on board creation the current player is assigned by default X', () => {
        const ticTacToe = new TicTacToe();

        expect(ticTacToe.currentPlayer).toBe(Player.X);
    });

    it('When player X makes a move player O should become the current player', () => {
        const ticTacToe = new TicTacToe();

        ticTacToe.makeMove(MoveOptions.TOP_LEFT);

        expect(ticTacToe.currentPlayer).toBe(Player.O);
    });

    it('When player O wants to place their move on the same location as X throw an error', () => {
        const ticTacToe = new TicTacToe();

        ticTacToe.makeMove(MoveOptions.TOP_LEFT);

        expect(() => ticTacToe.makeMove(MoveOptions.TOP_LEFT)).toThrow('Invalid move, already occupied cell');
    });

    it('When player O wants to place their move on the same location as X throw an error', () => {
        const ticTacToe = new TicTacToe();

        expect(() => ticTacToe.makeMove({ x: 30, y: 0 } as MoveOptions)).toThrow('Invalid move, cell out of bounds');
    });

    it('Check if vertical win for the left row for player X', () => {
        const ticTacToe = new TicTacToe();

        ticTacToe.makeMove(MoveOptions.TOP_LEFT);
        ticTacToe.makeMove(MoveOptions.MIDDLE_RIGHT);
        ticTacToe.makeMove(MoveOptions.MIDDLE_LEFT);
        ticTacToe.makeMove(MoveOptions.BOTTOM_RIGHT);
        ticTacToe.makeMove(MoveOptions.BOTTOM_LEFT);

        expect(ticTacToe.checkWinner()).toBeTruthy();
        expect(ticTacToe.currentPlayer).toBe(Player.X);
    });

    it('Check if vertical win for the middle row for player O', () => {
        const ticTacToe = new TicTacToe();

        ticTacToe.makeMove(MoveOptions.TOP_LEFT);
        ticTacToe.makeMove(MoveOptions.TOP_MIDDLE);
        ticTacToe.makeMove(MoveOptions.MIDDLE_LEFT);
        ticTacToe.makeMove(MoveOptions.MIDDLE);
        ticTacToe.makeMove(MoveOptions.BOTTOM_RIGHT);
        ticTacToe.makeMove(MoveOptions.BOTTOM_MIDDLE);

        expect(ticTacToe.checkWinner()).toBeTruthy();
        expect(ticTacToe.currentPlayer).toBe(Player.O);
    });
});
