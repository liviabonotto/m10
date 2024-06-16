const { execSync } = require('child_process');
const { mergeBranch } = require('../../commands/gitCommands');
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

  describe('mergeBranch', () => {
    test('deve fazer merge da branch na develop', () => {
      mergeBranch('feature-branch', 'develop', logger);
      expect(execSync).toHaveBeenCalledWith(getGitCommand('checkout develop'), { stdio: 'inherit' });
      expect(execSync).toHaveBeenCalledWith(getGitCommand('merge feature-branch'), { stdio: 'inherit' });
      expect(logger.log).toHaveBeenCalledWith('Branch feature-branch merged into develop');
    });

    test('deve registrar um erro se o comando git falha durante o merge', () => {
      execSync.mockImplementationOnce(() => { throw new Error('git error'); });

      mergeBranch('feature-branch', 'develop', logger);

      expect(logger.log).toHaveBeenCalledWith('Error merging branch: git error');
    });

    test('deve registrar um erro se o comando git falha durante o checkout', () => {
      execSync.mockImplementationOnce(() => { throw new Error('checkout error'); });

      mergeBranch('feature-branch', 'develop', logger);

      expect(logger.log).toHaveBeenCalledWith('Error merging branch: checkout error');
    });

    test('deve registrar um erro ao tentar mesclar uma branch inexistente', () => {
      execSync.mockImplementationOnce(() => { throw new Error('branch not found'); });

      mergeBranch('nonexistent-branch', 'develop', logger);

      expect(logger.log).toHaveBeenCalledWith('Error merging branch: branch not found');
    });
  });
});
