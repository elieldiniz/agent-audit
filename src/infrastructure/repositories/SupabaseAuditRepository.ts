// src/infrastructure/repositories/SupabaseAuditRepository.ts
import { SupabaseClient } from "@supabase/supabase-js";
import { IAuditRepository } from "../../application/ports/IAuditRepository";
import { Audit, AuditEntity } from "../../domain/entities/Audit";

export class SupabaseAuditRepository implements IAuditRepository {
  constructor(private supabase: SupabaseClient) {}

  async create(audit: Partial<Audit>): Promise<Audit> {
    const { data, error } = await this.supabase
      .from('audits')
      .insert({
        project_name: audit.projectName,
        profile_id: audit.profileId,
        status: 'pending'
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    return new AuditEntity(
      data.id,
      data.profile_id,
      data.project_name,
      data.status,
      new Date(data.created_at)
    );
  }

  async findById(id: string): Promise<Audit | null> {
    const { data, error } = await this.supabase
      .from('audits')
      .select()
      .eq('id', id)
      .single();

    if (error || !data) return null;

    return new AuditEntity(
      data.id,
      data.profile_id,
      data.project_name,
      data.status,
      new Date(data.created_at),
      data.report_json,
      data.error_message
    );
  }

  async updateStatus(id: string, status: Audit['status'], report?: any, error_msg?: string): Promise<void> {
    const { error } = await this.supabase
      .from('audits')
      .update({
        status,
        report_json: report,
        error_message: error_msg,
      })
      .eq('id', id);

    if (error) throw new Error(error.message);
  }

  async listByProfileId(profileId: string): Promise<Audit[]> {
    const { data, error } = await this.supabase
      .from('audits')
      .select()
      .eq('profile_id', profileId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);

    return data.map(d => new AuditEntity(
      d.id,
      d.profile_id,
      d.project_name,
      d.status,
      new Date(d.created_at),
      d.report_json,
      d.error_message
    ));
  }
}
