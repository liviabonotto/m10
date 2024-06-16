const { execSync } = require('child_process');
const { createBranch } = require('../../commands/gitCommands');
const path = require('path');

jest.mock('child_process', () => ({
  execSync: jest.fn(),
}));

const TARGET_REPO_PATH = path.join(__dirname, '../../commands/target-repo');
const getGitCommand = (command) => `git -C ${TARGET_REPO_PATH} ${command}`;

describe('createBranch', () => {
  let logger;

  beforeEach(() => {
    logger = {
      log: jest.fn(),
    };
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.clearAllMocks();
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  it('cria uma nova branch e retorna mensagem de sucesso sem descrição', () => {
    const branchName = 'feature/test-branch';

    createBranch(branchName, null, logger);

    expect(execSync).toHaveBeenCalledWith(getGitCommand('add .'), { stdio: 'inherit' });
    expect(execSync).toHaveBeenCalledWith(getGitCommand('commit -m "feat: save current changes" || true'), { stdio: 'inherit' });
    expect(execSync).toHaveBeenCalledWith(getGitCommand('stash'), { stdio: 'inherit' });
    expect(execSync).toHaveBeenCalledWith(getGitCommand('checkout develop'), { stdio: 'inherit' });
    expect(execSync).toHaveBeenCalledWith(getGitCommand(`checkout -b ${branchName}`), { stdio: 'inherit' });
    expect(logger.log).toHaveBeenCalledWith(`Branch ${branchName} created and pushed successfully.`);
  });

  it('cria uma nova branch e retorna sucesso com descrição', () => {
    const branchName = 'feature/test-branch';
    const description = 'Test description';

    createBranch(branchName, description, logger);

    expect(execSync).toHaveBeenCalledWith(getGitCommand('add .'), { stdio: 'inherit' });
    expect(execSync).toHaveBeenCalledWith(getGitCommand('commit -m "feat: save current changes" || true'), { stdio: 'inherit' });
    expect(execSync).toHaveBeenCalledWith(getGitCommand('stash'), { stdio: 'inherit' });
    expect(execSync).toHaveBeenCalledWith(getGitCommand('checkout develop'), { stdio: 'inherit' });
    expect(execSync).toHaveBeenCalledWith(getGitCommand(`checkout -b ${branchName}`), { stdio: 'inherit' });
    expect(execSync).toHaveBeenCalledWith(getGitCommand(`commit --allow-empty -m "Create ${branchName}: ${description}"`), { stdio: 'inherit' });
    expect(logger.log).toHaveBeenCalledWith(`Branch ${branchName} created and pushed successfully.`);
  });

  it('gera uma mensagem de erro se o execSync gerar erro', () => {
    const branchName = 'feature/test-branch';
    const errorMessage = 'Command failed';
    execSync.mockImplementationOnce(() => {
      throw new Error(errorMessage);
    });

    try {
      createBranch(branchName, null, logger);
    } catch (e) {
      expect(logger.log).toHaveBeenCalledWith(`Error creating branch: ${errorMessage}`);
    }
    expect(logger.log).toHaveBeenCalledWith(`Error creating branch: ${errorMessage}`);
  });
});
