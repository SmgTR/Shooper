import { compare, hash, genSalt } from 'bcrypt';

export class AuthHelper {
  static validate(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
  }
  static async hash(password: string): Promise<string> {
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
  }
}
