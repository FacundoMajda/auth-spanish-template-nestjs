// import { ExecutionContext } from '@nestjs/common';
// import { Client } from 'src/schematics/auth/services/interface/client.interface';

// export const getClient = <T = Client>(ctx: ExecutionContext): T => {
//   switch (ctx.getType()) {
//     case 'ws':
//       return ctx.switchToWs().getClient().handshake;
//     case 'http':
//       return ctx.switchToHttp().getRequest();
//     default:
//       return undefined;
//   }
// };
