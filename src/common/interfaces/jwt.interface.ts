import { UserDTO } from 'src/schematics/user/dto/user.dto';

export interface JwtPayload {
  sub: number;
  email: string;
  verificationCode?: string;
}

export interface JwtResponse {
  accessToken: string;
  refreshToken: string;
  user: UserDTO;
}
