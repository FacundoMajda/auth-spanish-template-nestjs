// import { Injectable } from '@nestjs/common';
// import { AuditLogsDTO } from './dtos/audit-logs.dto';
// import { CreateLogDTO } from './dtos/create-log.dto';
// import { AuditLogsMapper } from './mappers/auditlogs.mapper';
// import { AuditLogsRepository } from './repository/auditlogs.repository';

// @Injectable()
// export class AuditLogsService {
//   constructor(
//     private auditLogRepository: AuditLogsRepository,
//     private auditLogMapper: AuditLogsMapper,
//   ) {}

//   async logEvent(audit: Partial<CreateLogDTO>): Promise<AuditLogsDTO> {
//     const auditLog = await this.auditLogMapper.createDTOEntity(audit);
//     const saveLog = await this.auditLogRepository.save(auditLog);
//     return await this.auditLogMapper.entityDTO(saveLog);
//   }
// }
