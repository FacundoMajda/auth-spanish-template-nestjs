// import { Injectable } from '@nestjs/common';
// import { plainToClass } from 'class-transformer';
// import { CreateLogDTO } from '../dtos/create-log.dto';
// import { AuditLogs } from 'src/model/sysAuditLogs.entity';
// import { AuditLogsDTO } from '../dtos/audit-logs.dto';

// @Injectable()
// export class AuditLogsMapper {
//   async entityDTO(entity: AuditLogs): Promise<AuditLogsDTO> {
//     return plainToClass(AuditLogsDTO, entity, {
//       excludeExtraneousValues: true,
//     });
//   }
//   async createDTOEntity(dto: Partial<CreateLogDTO>): Promise<AuditLogs> {
//     return plainToClass(AuditLogs, dto);
//   }
// }
