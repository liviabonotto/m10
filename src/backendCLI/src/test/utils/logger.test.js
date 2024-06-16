const Logger = require('../../utils/logger'); 
describe('Logger', () => {
    let consoleSpy;

    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    test('log() deve chamar console.log com a mensagem fornecida', () => {
        const logger = new Logger();
        const message = 'Hello, World!';
        
        logger.log(message);

        expect(consoleSpy).toHaveBeenCalledWith(message);
    });

    test('debug() não deve chamar console.log quando verbose é false', () => {
        const logger = new Logger(false);
        const message = 'Debug Message';

        logger.debug(message);

        expect(consoleSpy).not.toHaveBeenCalled();
    });

    test('debug() deve chamar console.log com a mensagem formatada quando verbose é true', () => {
        const logger = new Logger(true);
        const message = 'Debug Message';
        const expectedMessage = `DEBUG: ${message}`;

        logger.debug(message);

        expect(consoleSpy).toHaveBeenCalledWith(expectedMessage);
    });

    test('debug() deve chamar console.log com a mensagem formatada quando verbose é true e mensagem é vazia', () => {
        const logger = new Logger(true);
        const message = '';
        const expectedMessage = `DEBUG: ${message}`;

        logger.debug(message);

        expect(consoleSpy).toHaveBeenCalledWith(expectedMessage);
    });
});
