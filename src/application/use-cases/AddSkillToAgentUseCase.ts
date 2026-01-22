// src/application/use-cases/AddSkillToAgentUseCase.ts
import { ISkillRepository, IAgentRepository } from "../ports/IAgentSkillRepositories";
import { Skill, SkillType } from "../../domain/entities/Skill";
import { ILogRepository } from "../ports/ILogRepository";

export interface AddSkillInputDTO {
  profileId: string;
  agentId: string;
  name: string;
  type: SkillType;
  configuration: Record<string, any>;
}

export class AddSkillToAgentUseCase {
  constructor(
    private agentRepository: IAgentRepository,
    private skillRepository: ISkillRepository,
    private logRepository: ILogRepository
  ) {}

  async execute(input: AddSkillInputDTO): Promise<Skill> {
    const agent = await this.agentRepository.findById(input.agentId);
    if (!agent || agent.ownerId !== input.profileId) {
      throw new Error("Agent not found or unauthorized.");
    }

    const skill = await this.skillRepository.create({
      agentId: input.agentId,
      name: input.name,
      type: input.type,
      configuration: input.configuration
    });

    await this.logRepository.log({
      profileId: input.profileId,
      action: 'ADD_SKILL_TO_AGENT',
      entityType: 'agent',
      entityId: agent.id,
      metadata: { skillId: skill.id, skillType: skill.type }
    });

    return skill;
  }
}
