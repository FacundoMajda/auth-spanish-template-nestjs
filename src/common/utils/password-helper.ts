import * as bcrypt from 'bcrypt';

export class PasswordHelper {
  async hashPassword(password: string, sr?: number): Promise<string> {
    const rounds = sr ?? 10;
    const salt = await bcrypt.genSalt(rounds);
    return await bcrypt.hash(password, salt);
  }

  async validate(
    inputPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(inputPassword, hashedPassword);
  }
}
