interface ISender {
  confirmEmail(...args: any[]): Promise<any>;
  resetPassword(...args: any[]): Promise<any>;
  announce(...args: any[]): Promise<any>;
}

export default ISender;