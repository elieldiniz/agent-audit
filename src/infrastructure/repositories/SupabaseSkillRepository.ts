// src/infrastructure/repositories/SupabaseSkillRepository.ts
import { SupabaseClient } from "@supabase/supabase-js";
import { ISkillRepository } from "../../application/ports/IAgentSkillRepositories";
import { Skill, SkillEntity } from "../../domain/entities/Skill";

export class SupabaseSkillRepository implements ISkillRepository {
  constructor(private supabase: SupabaseClient) {}

  async create(skill: Partial<Skill>): Promise<Skill> {
    const { data, error } = await this.supabase
      .from('skills')
      .insert({
        agent_id: skill.agentId,
        name: skill.name,
        type: skill.type,
        configuration: skill.configuration || {},
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    return new SkillEntity(
      data.id,
      data.agent_id,
      data.name,
      data.type,
      data.configuration,
      new Date(data.created_at)
    );
  }

  async listByAgentId(agentId: string): Promise<Skill[]> {
    const { data, error } = await this.supabase
      .from('skills')
      .select()
      .eq('agent_id', agentId)
      .order('created_at', { ascending: true });

    if (error) throw new Error(error.message);

    return data.map(d => new SkillEntity(
      d.id,
      d.agent_id,
      d.name,
      d.type,
      d.configuration,
      new Date(d.created_at)
    ));
  }
}
