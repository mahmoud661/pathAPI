import { config } from '../src/config';
import { execSync } from 'child_process';

jest.mock('../src/config', () => ({
  config: {
    port: 3000,
  },
}));

describe('Index file', () => {
  it('should log the correct message when the app is running', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation();

    require('../src/index');

    expect(logSpy).toHaveBeenCalledWith('hello world! app is running on 3000');

    logSpy.mockRestore();
  });
});
