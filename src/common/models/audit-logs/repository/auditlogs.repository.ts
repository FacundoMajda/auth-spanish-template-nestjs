// import { Injectable } from '@nestjs/common';
// import { AuditLogs } from 'src/model/sysAuditLogs.entity';
// import { Repository, DataSource } from 'typeorm';

// @Injectable()
// export class AuditLogsRepository extends Repository<AuditLogs> {
//   constructor(private dataSource: DataSource) {
//     super(AuditLogs, dataSource.createEntityManager());
//   }
//   async findById(auditId: number): Promise<AuditLogs> {
//     return this.createQueryBuilder('audit')
//       .where('audit.id = :auditId')
//       .setParameter('auditId', auditId)
//       .getOne();
//   }
// }
