// src/application/dtos/AuditDTOs.ts
import { AuditStatus } from "../../domain/entities/Audit";

export interface AnalyzeDependencyInputDTO {
  readonly projectName: string;
  readonly dependencies: Record<string, string>;
  readonly profileId: string;
}

export interface AuditOutputDTO {
  readonly id: string;
  readonly status: AuditStatus;
  readonly projectName: string;
  readonly createdAt: string;
  readonly report?: any;
}

export interface UserQuotaDTO {
  readonly maxAudits: number;
  readonly usedAudits: number;
  readonly canPerformAudit: boolean;
}
