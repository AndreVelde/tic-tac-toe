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
});
