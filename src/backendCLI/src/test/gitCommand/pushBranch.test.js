const { execSync } = require('child_process');
const { pushBranch } = require('../../commands/gitCommands');
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

  describe('pushBranch', () => {
    test('deve fazer push da branch remote', () => {
      execSync.mockImplementation(() => {}); // Mock bem-sucedido
      pushBranch('feature-branch', logger);

      expect(execSync).toHaveBeenCalledWith(getGitCommand('push origin feature-branch'), { stdio: 'inherit' });
      expect(logger.log).toHaveBeenCalledWith('Branch pushed to remote: feature-branch');
    });

    test('deve registrar um erro se o comando git falha', () => {
      execSync.mockImplementation(() => {
        throw new Error('git error');
      });

      pushBranch('feature-branch', logger);

      expect(logger.log).toHaveBeenCalledWith('Error pushing branch: git error');
    });

    test('deve fazer push de uma branch com caracteres especiais', () => {
      execSync.mockImplementation(() => {}); 
      pushBranch('feature-branch@123!', logger);

      expect(execSync).toHaveBeenCalledWith(getGitCommand('push origin feature-branch@123!'), { stdio: 'inherit' });
      expect(logger.log).toHaveBeenCalledWith('Branch pushed to remote: feature-branch@123!');
    });

    test('deve fazer push de uma branch com nome muito longo', () => {
      execSync.mockImplementation(() => {}); 
      const longBranchName = 'feature-branch-with-a-very-very-long-name-that-seems-to-never-end';
      pushBranch(longBranchName, logger);

      expect(execSync).toHaveBeenCalledWith(getGitCommand(`push origin ${longBranchName}`), { stdio: 'inherit' });
      expect(logger.log).toHaveBeenCalledWith(`Branch pushed to remote: ${longBranchName}`);
    });
  });
});
