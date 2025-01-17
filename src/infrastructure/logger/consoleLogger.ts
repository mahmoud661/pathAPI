import colors from './colors';

class Logger {
  public static Error(data: any, path: string = ''): void {
    console.log(
      colors.redBg,
      'Error',
      colors.reset,
      colors.red,
      `${path && colors.red}`,
      (path ? ` occurred in ${path} ` : ''),
      colors.reset,
      data,
    );
  }

  public static Warn(data: any, path: string = ''): void {
    console.log(
      colors.yellowBg,
      'Warn',
      colors.yellow,
      `${path && colors.red}`,
      path ? ` related to ${path} ` : '',
      colors.reset,
      data,
    );
  }

  public static Info(data: any, path: string = ''): void {
    console.log(
      colors.blueBg,
      'Info',
      colors.reset + colors.blue,
      `${path && colors.blue}`,
      path ? ` related to ${path} ` : '',
      colors.reset,
      data,
    );
  }
}

export default Logger;
