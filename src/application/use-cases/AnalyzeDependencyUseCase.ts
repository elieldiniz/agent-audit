// src/application/use-cases/AnalyzeDependencyUseCase.ts
import { AnalyzeDependencyInputDTO, AuditOutputDTO } from "../dtos/AuditDTOs";
import { IAuditRepository } from "../ports/IAuditRepository";
import { IAIService } from "../ports/IAIService";
import { ILogRepository } from "../ports/ILogRepository";
import { CheckQuotaUseCase } from "./CheckQuotaUseCase";
import { IQuotaRepository } from "../ports/IQuotaRepository";

export class AnalyzeDependencyUseCase {
  constructor(
    private auditRepository: IAuditRepository,
    private aiService: IAIService,
    private logRepository: ILogRepository,
    private quotaRepository: IQuotaRepository,
    private checkQuotaUseCase: CheckQuotaUseCase
  ) {}

  async execute(input: AnalyzeDependencyInputDTO): Promise<AuditOutputDTO> {
    // 0. Check Quota
    const { allowed } = await this.checkQuotaUseCase.execute(input.profileId);

    if (!allowed) {
      throw new Error("Quota exceeded. Please upgrade your plan.");
    }

    // 1. Create audit record (pending)
    const audit = await this.auditRepository.create({
      projectName: input.projectName,
      profileId: input.profileId,
      payloadJson: input.dependencies
    });

    await this.logRepository.log({
      profileId: input.profileId,
      action: 'CREATE_AUDIT',
      entityType: 'audit',
      entityId: audit.id,
      metadata: { projectName: input.projectName }
    });

    try {
      // 2. Perform AI analysis
      const analysisResult = await this.aiService.analyzeDependencies(input.dependencies);

      // 3. Update audit record (completed)
      await this.auditRepository.updateStatus(audit.id, 'completed', analysisResult);

      // 4. Consume Quota
      await this.quotaRepository.incrementUsed(input.profileId);

      return {
        id: audit.id,
        status: 'completed',
        projectName: audit.projectName,
        createdAt: audit.createdAt.toISOString(),
        report: analysisResult
      };
    } catch (error: any) {
      // 4. Handle failure
      await this.auditRepository.updateStatus(audit.id, 'failed', null, error.message);

      return {
        id: audit.id,
        status: 'failed',
        projectName: audit.projectName,
        createdAt: audit.createdAt.toISOString(),
      };
    }
  }
}
