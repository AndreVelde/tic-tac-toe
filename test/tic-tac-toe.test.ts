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

        ticTacToe.makeMove(0, 0);

        expect(ticTacToe.currentPlayer).toBe(Player.O);
    });

    it('When player O wants to place their move on the same location as X throw an error', () => {
        const ticTacToe = new TicTacToe();

        ticTacToe.makeMove(0, 0);

        expect(() => ticTacToe.makeMove(0, 0)).toThrow('Invalid move, already occupied cell');
    });
});
