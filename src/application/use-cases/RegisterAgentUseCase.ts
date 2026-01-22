// src/application/use-cases/RegisterAgentUseCase.ts
import { IAgentRepository, ISkillRepository } from "../ports/IAgentSkillRepositories";
import { Agent } from "../../domain/entities/Agent";
import { ILogRepository } from "../ports/ILogRepository";

export interface RegisterAgentInputDTO {
  ownerId: string;
  name: string;
  description: string;
  skills?: Array<{
    name: string;
    type: string;
    configuration: Record<string, any>;
  }>;
}

export class RegisterAgentUseCase {
  constructor(
    private agentRepository: IAgentRepository,
    private skillRepository: ISkillRepository,
    private logRepository: ILogRepository
  ) {}

  async execute(input: RegisterAgentInputDTO): Promise<Agent> {
    // 1. Create Agent
    const agent = await this.agentRepository.create({
      ownerId: input.ownerId,
      name: input.name,
      description: input.description,
      status: 'active'
    });

    // 2. Create Skills if any
    if (input.skills && input.skills.length > 0) {
      for (const skillData of input.skills) {
        await this.skillRepository.create({
          agentId: agent.id,
          name: skillData.name,
          type: skillData.type,
          configuration: skillData.configuration
        });
      }
    }

    // 3. Log activity
    await this.logRepository.log({
      profileId: input.ownerId,
      action: 'REGISTER_AGENT',
      entityType: 'agent',
      entityId: agent.id,
      metadata: { name: agent.name, skillCount: input.skills?.length || 0 }
    });

    return agent;
  }
}
