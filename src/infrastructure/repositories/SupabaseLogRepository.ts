// src/infrastructure/repositories/SupabaseLogRepository.ts
import { SupabaseClient } from "@supabase/supabase-js";
import { ILogRepository } from "../../application/ports/ILogRepository";

export class SupabaseLogRepository implements ILogRepository {
  constructor(private supabase: SupabaseClient) {}

  async log(data: {
    profileId: string;
    action: string;
    entityType: string;
    entityId?: string;
    metadata?: any;
  }): Promise<void> {
    const { error } = await this.supabase
      .from('audit_logs')
      .insert({
        profile_id: data.profileId,
        action: data.action,
        entity_type: data.entityType,
        entity_id: data.entityId,
        metadata: data.metadata,
      });

    if (error) {
      console.error("Failed to write audit log:", error);
    }
  }
}
