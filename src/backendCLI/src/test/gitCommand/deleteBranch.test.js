const { execSync } = require('child_process');
const { deleteBranch } = require('../../commands/gitCommands');
const path = require('path');

jest.mock('child_process');

const TARGET_REPO_PATH = path.join(__dirname, '../../commands/target-repo');
const getGitCommand = (command) => `git -C ${TARGET_REPO_PATH} ${command}`;

describe('Git Commands', () => {
  let logger;

  beforeEach(() => {
    logger = {
      log: jest.fn(),
    };
    execSync.mockClear();
    logger.log.mockClear();
  });

  describe('deleteBranch', () => {
    test('deveria deletar o branch', () => {
      deleteBranch('feature-branch', logger);

      expect(execSync).toHaveBeenCalledWith(getGitCommand('branch -d feature-branch'), { stdio: 'inherit' });
      expect(logger.log).toHaveBeenCalledWith('Branch deleted: feature-branch');
    });

    test('deve registrar um erro se o comando git falhar', () => {
      execSync.mockImplementation(() => {
        throw new Error('git error');
      });

      deleteBranch('feature-branch', logger);

      expect(logger.log).toHaveBeenCalledWith('Error deleting branch: git error');
    });

    test('deve registrar um erro ao tentar deletar um branch inexistente', () => {
      execSync.mockImplementation(() => {
        throw new Error('branch not found');
      });

      deleteBranch('nonexistent-branch', logger);

      expect(execSync).toHaveBeenCalledWith(getGitCommand('branch -d nonexistent-branch'), { stdio: 'inherit' });
      expect(logger.log).toHaveBeenCalledWith('Error deleting branch: branch not found');
    });

    test('deve registrar um erro ao tentar deletar um branch com permissões restritas', () => {
      execSync.mockImplementation(() => {
        throw new Error('permission denied');
      });

      deleteBranch('restricted-branch', logger);

      expect(execSync).toHaveBeenCalledWith(getGitCommand('branch -d restricted-branch'), { stdio: 'inherit' });
      expect(logger.log).toHaveBeenCalledWith('Error deleting branch: permission denied');
    });
  });
});
