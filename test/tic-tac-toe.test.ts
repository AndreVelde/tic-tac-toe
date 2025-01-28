import { TicTacToe } from '../app/tic-tac-toe';

describe('Tic tac toe Test', () => {
    it('should pass', () => {
        expect(new TicTacToe()).toBe('dojo');
    });
});
