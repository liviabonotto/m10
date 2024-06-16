const fs = require('fs');
const { execSync } = require('child_process');
const { listBranches } = require('../../commands/gitCommands');
const path = require('path');

jest.mock('child_process');
jest.mock('fs');

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

  describe('listBranches', () => {
    test('deve listar todas as branches', () => {
      execSync.mockReturnValue('branch1\nbranch2\nbranch3');
      listBranches(logger);

      expect(execSync).toHaveBeenCalledWith(getGitCommand('branch -a'), { stdio: 'inherit' });
      expect(logger.log).toHaveBeenCalledWith('Branches:\nbranch1\nbranch2\nbranch3');
    });

    test('deve registrar um erro se o comando git falha', () => {
      execSync.mockImplementation(() => {
        throw new Error('git error');
      });

      listBranches(logger);

      expect(logger.log).toHaveBeenCalledWith('Error listing branches: git error');
    });

    test('deve registrar um erro se o repositório não existe', () => {
      const originalExistsSync = fs.existsSync;
      fs.existsSync = jest.fn().mockReturnValue(false);

      listBranches(logger);

      expect(logger.log).toHaveBeenCalledWith(expect.stringContaining('Error listing branches'));
      fs.existsSync = originalExistsSync; 
    });

    test('deve registrar um erro com caminho de repositório inválido', () => {
      execSync.mockImplementation(() => {
        throw new Error('invalid path');
      });

      listBranches(logger);

      expect(logger.log).toHaveBeenCalledWith('Error listing branches: invalid path');
    });
  });
});
