// src/infrastructure/repositories/SupabaseQuotaRepository.ts
import { SupabaseClient } from "@supabase/supabase-js";
import { IQuotaRepository, Quota } from "../../application/ports/IQuotaRepository";

export class SupabaseQuotaRepository implements IQuotaRepository {
  constructor(private supabase: SupabaseClient) {}

  async getByProfileId(profileId: string): Promise<Quota | null> {
    const { data, error } = await this.supabase
      .from('quotas')
      .select('profile_id, max_audits, used_audits, tier')
      .eq('profile_id', profileId)
      .single();

    if (error || !data) return null;

    return {
      profileId: data.profile_id,
      maxAudits: data.max_audits,
      usedAudits: data.used_audits,
      tier: data.tier
    };
  }

  async incrementUsed(profileId: string): Promise<void> {
    // We use a RPC or a direct update. For simplicity, direct update.
    // In production, use an atomic increment RPC.
    const { data: current } = await this.supabase
      .from('quotas')
      .select('used_audits')
      .eq('profile_id', profileId)
      .single();

    if (current) {
      await this.supabase
        .from('quotas')
        .update({ used_audits: current.used_audits + 1 })
        .eq('profile_id', profileId);
    }
  }
}
