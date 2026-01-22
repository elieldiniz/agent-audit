// src/application/ports/IAuditRepository.ts
import { Audit } from "../../domain/entities/Audit";

export interface IAuditRepository {
  create(audit: Partial<Audit>): Promise<Audit>;
  findById(id: string): Promise<Audit | null>;
  updateStatus(id: string, status: Audit['status'], report?: any, error?: string): Promise<void>;
  listByProfileId(profileId: string): Promise<Audit[]>;
}
