// src/infrastructure/repositories/SupabaseAgentRepository.ts
import { SupabaseClient } from "@supabase/supabase-js";
import { IAgentRepository } from "../../application/ports/IAgentSkillRepositories";
import { Agent, AgentEntity } from "../../domain/entities/Agent";

export class SupabaseAgentRepository implements IAgentRepository {
  constructor(private supabase: SupabaseClient) {}

  async create(agent: Partial<Agent>): Promise<Agent> {
    const { data, error } = await this.supabase
      .from('agents')
      .insert({
        owner_id: agent.ownerId,
        name: agent.name,
        description: agent.description,
        status: agent.status || 'active',
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    return new AgentEntity(
      data.id,
      data.owner_id,
      data.name,
      data.description,
      data.status,
      new Date(data.created_at)
    );
  }

  async findById(id: string): Promise<Agent | null> {
    const { data, error } = await this.supabase
      .from('agents')
      .select()
      .eq('id', id)
      .single();

    if (error || !data) return null;

    return new AgentEntity(
      data.id,
      data.owner_id,
      data.name,
      data.description,
      data.status,
      new Date(data.created_at)
    );
  }

  async listByOwnerId(ownerId: string): Promise<Agent[]> {
    const { data, error } = await this.supabase
      .from('agents')
      .select()
      .eq('owner_id', ownerId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);

    return data.map(d => new AgentEntity(
      d.id,
      d.owner_id,
      d.name,
      d.description,
      d.status,
      new Date(d.created_at)
    ));
  }
}
