// src/application/use-cases/RegisterAgentUseCase.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RegisterAgentUseCase } from './RegisterAgentUseCase';
import { IAgentRepository, ISkillRepository } from '../ports/IAgentSkillRepositories';
import { ILogRepository } from '../ports/ILogRepository';
import { SkillType } from '../../domain/entities/Skill';

describe('RegisterAgentUseCase', () => {
  let useCase: RegisterAgentUseCase;
  let mockAgentRepo: IAgentRepository;
  let mockSkillRepo: ISkillRepository;
  let mockLogRepo: ILogRepository;

  beforeEach(() => {
    mockAgentRepo = {
      create: vi.fn().mockResolvedValue({ id: 'agent-1', ownerId: 'user-1', name: 'Agent X', description: 'Desc', status: 'active', createdAt: new Date() }),
      findById: vi.fn(),
      listByOwnerId: vi.fn(),
    };
    mockSkillRepo = {
      create: vi.fn().mockResolvedValue({ id: 'skill-1', agentId: 'agent-1', name: 'Skill 1', type: 'type1', configuration: {}, createdAt: new Date() }),
      listByAgentId: vi.fn(),
    };
    mockLogRepo = {
      log: vi.fn().mockResolvedValue(undefined),
    };
    useCase = new RegisterAgentUseCase(mockAgentRepo, mockSkillRepo, mockLogRepo);
  });

  it('should register an agent and its skills', async () => {
    const input = {
      ownerId: 'user-1',
      name: 'Agent X',
      description: 'Desc',
      skills: [{ name: 'Skill 1', type: SkillType.SECURITY_AUDIT, configuration: {} }]
    };

    const result = await useCase.execute(input);

    expect(mockAgentRepo.create).toHaveBeenCalledWith(expect.objectContaining({ name: 'Agent X' }));
    expect(mockSkillRepo.create).toHaveBeenCalledTimes(1);
    expect(mockLogRepo.log).toHaveBeenCalled();
    expect(result.id).toBe('agent-1');
  });
});
