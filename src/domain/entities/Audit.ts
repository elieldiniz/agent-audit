// src/domain/entities/Audit.ts
export type AuditStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface Audit {
  readonly id: string;
  readonly profileId: string;
  readonly projectName: string;
  readonly status: AuditStatus;
  readonly reportJson?: Record<string, any>;
  readonly errorMessage?: string;
  readonly createdAt: Date;
}

export class AuditEntity implements Audit {
  constructor(
    public readonly id: string,
    public readonly profileId: string,
    public readonly projectName: string,
    public readonly status: AuditStatus,
    public readonly createdAt: Date,
    public readonly reportJson?: Record<string, any>,
    public readonly errorMessage?: string,
  ) {
    Object.freeze(this); // Ensure immutability
  }
}
