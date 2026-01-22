// src/application/use-cases/ExecuteAgentSkillUseCase.ts
import { ISkillExecutor } from "../ports/ISkillExecutor";
import { IAgentRepository, ISkillRepository } from "../ports/IAgentSkillRepositories";
import { ILogRepository } from "../ports/ILogRepository";
import { CheckQuotaUseCase } from "./CheckQuotaUseCase";
import { IQuotaRepository } from "../ports/IQuotaRepository";

export interface ExecuteSkillInputDTO {
  profileId: string;
  agentId: string;
  skillId: string;
  payload: any;
}

export class ExecuteAgentSkillUseCase {
  constructor(
    private agentRepository: IAgentRepository,
    private skillRepository: ISkillRepository,
    private skillExecutor: ISkillExecutor,
    private logRepository: ILogRepository,
    private quotaRepository: IQuotaRepository
  ) {}

  async execute(input: ExecuteSkillInputDTO): Promise<any> {
    // 1. Quota Check
    const checkQuota = new CheckQuotaUseCase(this.quotaRepository);
    const { allowed } = await checkQuota.execute(input.profileId);

    if (!allowed) {
      throw new Error("Insufficient quota to execute skill.");
    }

    // 2. Validate Agent Ownership
    const agent = await this.agentRepository.findById(input.agentId);
    if (!agent || agent.ownerId !== input.profileId) {
      throw new Error("Agent not found or unauthorized.");
    }

    // 3. Retrieve Skill
    const skills = await this.skillRepository.listByAgentId(input.agentId);
    const skill = skills.find(s => s.id === input.skillId);

    if (!skill) {
      throw new Error("Skill not found for this agent.");
    }

    // 4. Log Execution Start
    await this.logRepository.log({
      profileId: input.profileId,
      action: 'EXECUTE_SKILL_START',
      entityType: 'skill',
      entityId: skill.id,
      metadata: { agentId: agent.id, skillType: skill.type }
    });

    try {
      // 5. Execute Skill
      const result = await this.skillExecutor.execute(skill.type, {
        agentId: agent.id,
        payload: input.payload,
        configuration: skill.configuration
      });

      // 6. Consume Quota
      await this.quotaRepository.incrementUsed(input.profileId);

      // 7. Log Success
      await this.logRepository.log({
        profileId: input.profileId,
        action: 'EXECUTE_SKILL_SUCCESS',
        entityType: 'skill',
        entityId: skill.id,
        metadata: { agentId: agent.id, skillType: skill.type }
      });

      return result;
    } catch (error: any) {
      // 8. Log Failure
      await this.logRepository.log({
        profileId: input.profileId,
        action: 'EXECUTE_SKILL_FAILURE',
        entityType: 'skill',
        entityId: skill.id,
        metadata: { agentId: agent.id, skillType: skill.type, error: error.message }
      });
      throw error;
    }
  }
}
