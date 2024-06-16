const fs = require('fs');
const { execSync } = require('child_process');
const { ensureRepoCloned } = require('../../commands/gitCommands'); 

jest.mock('fs');
jest.mock('child_process');

describe('ensureRepoCloned', () => {
    beforeEach(() => {
        fs.existsSync.mockReset();
        execSync.mockReset();
    });

    test('should clone the repository if it does not exist', () => {
        fs.existsSync.mockReturnValue(false);

        ensureRepoCloned();

        expect(fs.existsSync).toHaveBeenCalledWith(TARGET_REPO_PATH);
        expect(execSync).toHaveBeenCalledWith(`git clone ${REPO_URL} ${TARGET_REPO_PATH}`, { stdio: 'inherit' });
    });

    test('should not clone the repository if it already exists', () => {
        fs.existsSync.mockReturnValue(true);

        ensureRepoCloned();

        expect(fs.existsSync).toHaveBeenCalledWith(TARGET_REPO_PATH);
        expect(execSync).not.toHaveBeenCalled();
    });
});
