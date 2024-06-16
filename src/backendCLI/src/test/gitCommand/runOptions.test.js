const { run } = require('../../commands/gitCommands'); 
const Logger = require('../../utils/logger'); 

jest.mock('../../utils/logger', () => {
    return jest.fn().mockImplementation(() => {
        return {
            log: jest.fn(),
            debug: jest.fn(),
        };
    });
});

describe('run', () => {
    let mockLogger;

    beforeEach(() => {
        mockLogger = new Logger();
        Logger.mockClear();
    });

    test('should ensure repo is cloned and create feature branch', () => {
        const options = {
            verbose: true,
            createFeature: 'new-feature',
            description: 'Adding a new feature',
        };

        run(options);

        expect(mockLogger.debug).toHaveBeenCalledWith('Creating branch: feat/new-feature');
    });

    test('should ensure repo is cloned and create hotfix branch', () => {
        const options = {
            verbose: false,
            createHotfix: 'bug-fix',
            description: 'Fixing a bug',
        };

        run(options);

        expect(mockLogger.debug).toHaveBeenCalledWith('Creating branch: fix/bug-fix');
    });

    test('should ensure repo is cloned and list branches', () => {
        const options = {
            verbose: true,
            listBranches: true,
        };

        run(options);

        expect(mockLogger.debug).toHaveBeenCalledWith('Listing branches...');
    });

});
