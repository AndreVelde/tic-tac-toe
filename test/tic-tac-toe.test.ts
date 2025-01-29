import { jest } from '@jest/globals';
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

        expect(() => ticTacToe.makeMove({ row: 30, column: 0 } as unknown as MoveOptions)).toThrow('Invalid move, cell out of bounds');
    });

    it('Check if vertical win for the left column for player X', () => {
        const ticTacToe = new TicTacToe();

        ticTacToe.makeMove(MoveOptions.TOP_LEFT);
        ticTacToe.makeMove(MoveOptions.MIDDLE_RIGHT);
        ticTacToe.makeMove(MoveOptions.MIDDLE_LEFT);
        ticTacToe.makeMove(MoveOptions.BOTTOM_RIGHT);
        ticTacToe.makeMove(MoveOptions.BOTTOM_LEFT);

        expect(ticTacToe.checkWinner()).toBeTruthy();
        expect(ticTacToe.currentPlayer).toBe(Player.X);
    });

    it('Check if vertical win for the middle column for player O', () => {
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

    it('Check if horizontal win for the top row for player O', () => {
        const ticTacToe = new TicTacToe();

        ticTacToe.makeMove(MoveOptions.MIDDLE);
        ticTacToe.makeMove(MoveOptions.TOP_MIDDLE);
        ticTacToe.makeMove(MoveOptions.MIDDLE_LEFT);
        ticTacToe.makeMove(MoveOptions.TOP_LEFT);
        ticTacToe.makeMove(MoveOptions.BOTTOM_RIGHT);
        ticTacToe.makeMove(MoveOptions.TOP_RIGHT);

        expect(ticTacToe.checkWinner()).toBeTruthy();
        expect(ticTacToe.currentPlayer).toBe(Player.O);
    });

    it('Check if horizontal win for the bottom row for player X', () => {
        const ticTacToe = new TicTacToe();

        ticTacToe.makeMove(MoveOptions.BOTTOM_MIDDLE);
        ticTacToe.makeMove(MoveOptions.TOP_MIDDLE);
        ticTacToe.makeMove(MoveOptions.BOTTOM_RIGHT);
        ticTacToe.makeMove(MoveOptions.TOP_LEFT);
        ticTacToe.makeMove(MoveOptions.BOTTOM_LEFT);

        expect(ticTacToe.checkWinner()).toBeTruthy();
        expect(ticTacToe.currentPlayer).toBe(Player.X);
    });

    it('Check if diagonal win for top left to bottom right for player X', () => {
        const ticTacToe = new TicTacToe();

        ticTacToe.makeMove(MoveOptions.TOP_LEFT);
        ticTacToe.makeMove(MoveOptions.TOP_MIDDLE);
        ticTacToe.makeMove(MoveOptions.MIDDLE);
        ticTacToe.makeMove(MoveOptions.TOP_RIGHT);
        ticTacToe.makeMove(MoveOptions.BOTTOM_RIGHT);

        expect(ticTacToe.checkWinner()).toBeTruthy();
        expect(ticTacToe.currentPlayer).toBe(Player.X);
    });

    it('Check if diagonal win for top right to bottom left for player O', () => {
        const ticTacToe = new TicTacToe();

        ticTacToe.makeMove(MoveOptions.TOP_LEFT);
        ticTacToe.makeMove(MoveOptions.TOP_RIGHT);
        ticTacToe.makeMove(MoveOptions.MIDDLE_RIGHT);
        ticTacToe.makeMove(MoveOptions.MIDDLE);
        ticTacToe.makeMove(MoveOptions.BOTTOM_RIGHT);
        ticTacToe.makeMove(MoveOptions.BOTTOM_LEFT);

        expect(ticTacToe.checkWinner()).toBeTruthy();
        expect(ticTacToe.currentPlayer).toBe(Player.O);
    });

    it('Check if draw when no options are available anymore', () => {
        const ticTacToe = new TicTacToe();

        ticTacToe.makeMove(MoveOptions.TOP_LEFT);
        ticTacToe.makeMove(MoveOptions.TOP_MIDDLE);
        ticTacToe.makeMove(MoveOptions.TOP_RIGHT);
        ticTacToe.makeMove(MoveOptions.MIDDLE);
        ticTacToe.makeMove(MoveOptions.MIDDLE_RIGHT);
        ticTacToe.makeMove(MoveOptions.MIDDLE_LEFT);
        ticTacToe.makeMove(MoveOptions.BOTTOM_MIDDLE);
        ticTacToe.makeMove(MoveOptions.BOTTOM_RIGHT);
        ticTacToe.makeMove(MoveOptions.BOTTOM_LEFT);

        expect(ticTacToe.checkWinner()).toBeFalsy();
        expect(ticTacToe.isDraw()).toBeTruthy();
        expect(ticTacToe.currentPlayer).toBe(Player.X);
    });

    it('Bot plays game until draw or there is a winner', () => {
        const ticTacToe = new TicTacToe();

        ticTacToe.playGame();

        expect(ticTacToe.isDraw() || ticTacToe.checkWinner()).toBeTruthy();
    });

    it('Draw board when only the first move was set', () => {
        const logSpy = jest.spyOn(console, 'log');

        const ticTacToe = new TicTacToe();

        ticTacToe.makeMove(MoveOptions.TOP_LEFT);

        expect(logSpy.mock.calls[0][0]).toBe('X| | \n-----\n | | \n-----\n | | ');
    });

    it('Draw board with draw situation', () => {
        const logSpy = jest.spyOn(console, 'log');

        const ticTacToe = new TicTacToe();

        ticTacToe.makeMove(MoveOptions.TOP_LEFT);
        ticTacToe.makeMove(MoveOptions.TOP_MIDDLE);
        ticTacToe.makeMove(MoveOptions.TOP_RIGHT);
        ticTacToe.makeMove(MoveOptions.MIDDLE);
        ticTacToe.makeMove(MoveOptions.MIDDLE_RIGHT);
        ticTacToe.makeMove(MoveOptions.MIDDLE_LEFT);
        ticTacToe.makeMove(MoveOptions.BOTTOM_MIDDLE);
        ticTacToe.makeMove(MoveOptions.BOTTOM_RIGHT);
        ticTacToe.makeMove(MoveOptions.BOTTOM_LEFT);

        expect(logSpy.mock.calls.at(-1)![0]).toBe('X|O|X\n-----\nO|O|X\n-----\nX|X|O');
    });

    it('Bot chooses winning move if possible', () => {
        const ticTacToe = new TicTacToe();

        ticTacToe.makeMove(MoveOptions.TOP_LEFT);
        ticTacToe.makeMove(MoveOptions.TOP_MIDDLE);
        ticTacToe.makeMove(MoveOptions.MIDDLE);
        ticTacToe.makeMove(MoveOptions.TOP_RIGHT);
        ticTacToe.makeMove(ticTacToe['getRandomMove'](true));

        expect(ticTacToe.checkWinner()).toBeTruthy();
    });

    it('Bot blocks winning move if possible', () => {
        const ticTacToe = new TicTacToe();

        ticTacToe.makeMove(MoveOptions.TOP_LEFT);
        ticTacToe.makeMove(MoveOptions.TOP_MIDDLE);
        ticTacToe.makeMove(MoveOptions.MIDDLE);
        ticTacToe.makeMove(ticTacToe['getRandomMove'](true));
        ticTacToe.makeMove(ticTacToe['getRandomMove'](true));

        expect(ticTacToe.checkWinner()).toBeFalsy();
    });

    it('Bot always chooses middle of the board option if possible', () => {
        const ticTacToe = new TicTacToe();

        ticTacToe.makeMove(ticTacToe['getRandomMove'](true));

        expect(ticTacToe.board).toStrictEqual([
            ['', '', ''],
            ['', 'X', ''],
            ['', '', ''],
        ]);
    });

    it('Bot chooses random move if it cant win', () => {
        const ticTacToe = new TicTacToe();

        ticTacToe.makeMove(MoveOptions.MIDDLE);

        expect(ticTacToe['getSmartMove']()).toBeUndefined();
    });

    it('Bot plays game in a smart way until draw or there is a winner', () => {
        const ticTacToe = new TicTacToe();

        ticTacToe.playGame(true);

        expect(ticTacToe.isDraw() || ticTacToe.checkWinner()).toBeTruthy();
    });
});
