// src/application/ports/IAgentRepository.ts
import { Agent } from "../../domain/entities/Agent";

export interface IAgentRepository {
  create(agent: Partial<Agent>): Promise<Agent>;
  findById(id: string): Promise<Agent | null>;
  listByOwnerId(ownerId: string): Promise<Agent[]>;
}

// src/application/ports/ISkillRepository.ts
import { Skill } from "../../domain/entities/Skill";

export interface ISkillRepository {
  create(skill: Partial<Skill>): Promise<Skill>;
  listByAgentId(agentId: string): Promise<Skill[]>;
}
