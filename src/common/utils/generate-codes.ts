import 'dotenv/config';
import moment from 'moment';

export const generateVerificationCode = (): string => {
  const codeLength = Number(process.env.CODE_LENGTH) || 6; // Predeterminado a 6 si no está definido
  const codeChars =
    process.env.CODE_CHARS || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Predeterminado a caracteres alfanuméricos si no está definido
  let code = '';

  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * codeChars.length);
    code += codeChars[randomIndex];
  }
  return code;
};

export const generateExpirationCode = (): Date => {
  const exp = Number(process.env.CODE_TOKEN_EXPIRATION) || 3600; // Predeterminado a 3600 segundos (1 hora) si no está definido
  const localTimePlusHour = moment().local().add(exp, 'seconds');
  const expiration = localTimePlusHour.toDate();
  return expiration;
};
