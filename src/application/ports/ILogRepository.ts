// src/application/ports/ILogRepository.ts
export interface ILogRepository {
  log(data: {
    profileId: string;
    action: string;
    entityType: string;
    entityId?: string;
    metadata?: any;
  }): Promise<void>;
}
