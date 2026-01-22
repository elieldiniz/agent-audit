// src/application/use-cases/ExecuteAgentSkillUseCase.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ExecuteAgentSkillUseCase } from './ExecuteAgentSkillUseCase';
import { IAgentRepository, ISkillRepository } from '../ports/IAgentSkillRepositories';
import { ISkillExecutor } from '../ports/ISkillExecutor';
import { ILogRepository } from '../ports/ILogRepository';
import { IQuotaRepository } from '../ports/IQuotaRepository';
import { SkillType } from '../../domain/entities/Skill';

describe('ExecuteAgentSkillUseCase', () => {
  let useCase: ExecuteAgentSkillUseCase;
  let mockAgentRepo: IAgentRepository;
  let mockSkillRepo: ISkillRepository;
  let mockExecutor: ISkillExecutor;
  let mockLogRepo: ILogRepository;
  let mockQuotaRepo: IQuotaRepository;

  beforeEach(() => {
    mockAgentRepo = {
      create: vi.fn(),
      findById: vi.fn().mockResolvedValue({ id: 'agent-1', ownerId: 'user-1', name: 'Agent X' }),
      listByOwnerId: vi.fn(),
    };
    mockSkillRepo = {
      create: vi.fn(),
      listByAgentId: vi.fn().mockResolvedValue([{ id: 'skill-1', agentId: 'agent-1', type: SkillType.SECURITY_AUDIT, configuration: {} }]),
    };
    mockExecutor = {
      execute: vi.fn().mockResolvedValue({ status: 'safe' }),
    };
    mockLogRepo = {
      log: vi.fn().mockResolvedValue(undefined),
    };
    mockQuotaRepo = {
      getByProfileId: vi.fn().mockResolvedValue({ maxAudits: 5, usedAudits: 0 }),
      incrementUsed: vi.fn().mockResolvedValue(undefined),
    };
    useCase = new ExecuteAgentSkillUseCase(mockAgentRepo, mockSkillRepo, mockExecutor, mockLogRepo, mockQuotaRepo);
  });

  it('should successfully execute a skill', async () => {
    const input = {
      profileId: 'user-1',
      agentId: 'agent-1',
      skillId: 'skill-1',
      payload: { deps: {} }
    };

    const result = await useCase.execute(input);

    expect(mockExecutor.execute).toHaveBeenCalled();
    expect(mockQuotaRepo.incrementUsed).toHaveBeenCalled();
    expect(result.status).toBe('safe');
  });

  it('should throw if quota exceeded', async () => {
    mockQuotaRepo.getByProfileId = vi.fn().mockResolvedValue({ maxAudits: 5, usedAudits: 5 });

    const input = {
      profileId: 'user-1',
      agentId: 'agent-1',
      skillId: 'skill-1',
      payload: {}
    };

    await expect(useCase.execute(input)).rejects.toThrow("Insufficient quota");
  });
});
