// src/application/use-cases/AnalyzeDependencyUseCase.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AnalyzeDependencyUseCase } from './AnalyzeDependencyUseCase';
import { IAuditRepository } from '../ports/IAuditRepository';
import { IAIService } from '../ports/IAIService';
import { ILogRepository } from '../ports/ILogRepository';
import { IQuotaRepository } from '../ports/IQuotaRepository';
import { CheckQuotaUseCase } from './CheckQuotaUseCase';

describe('AnalyzeDependencyUseCase', () => {
  let useCase: AnalyzeDependencyUseCase;
  let mockRepo: IAuditRepository;
  let mockAI: IAIService;
  let mockLog: ILogRepository;
  let mockQuota: IQuotaRepository;

  beforeEach(() => {
    mockRepo = {
      create: vi.fn().mockResolvedValue({ id: '123', projectName: 'test', profileId: 'user1', status: 'pending', createdAt: new Date() }),
      findById: vi.fn(),
      updateStatus: vi.fn().mockResolvedValue(undefined),
      listByProfileId: vi.fn(),
    };
    mockAI = {
      analyzeDependencies: vi.fn().mockResolvedValue({ score: 100 }),
    };
    mockLog = {
      log: vi.fn().mockResolvedValue(undefined),
    };
    mockQuota = {
      getByProfileId: vi.fn().mockResolvedValue({ maxAudits: 5, usedAudits: 0 }),
      incrementUsed: vi.fn().mockResolvedValue(undefined),
    };
    const checkQuotaUseCase = new CheckQuotaUseCase(mockQuota);
    useCase = new AnalyzeDependencyUseCase(mockRepo, mockAI, mockLog, mockQuota, checkQuotaUseCase);
  });

  it('should successfully analyze dependencies', async () => {
    const input = {
      projectName: 'test',
      dependencies: { react: '18.0.0' },
      profileId: 'user1',
    };

    const result = await useCase.execute(input);

    expect(mockRepo.create).toHaveBeenCalled();
    expect(mockAI.analyzeDependencies).toHaveBeenCalledWith(input.dependencies);
    expect(mockRepo.updateStatus).toHaveBeenCalledWith('123', 'completed', { score: 100 });
    expect(result.status).toBe('completed');
  });

  it('should handle AI failure', async () => {
    (mockAI.analyzeDependencies as any).mockRejectedValue(new Error('AI Failed'));

    const input = {
      projectName: 'test',
      dependencies: { react: '18.0.0' },
      profileId: 'user1',
    };

    const result = await useCase.execute(input);

    expect(mockRepo.updateStatus).toHaveBeenCalledWith('123', 'failed', null, 'AI Failed');
    expect(result.status).toBe('failed');
  });
});
