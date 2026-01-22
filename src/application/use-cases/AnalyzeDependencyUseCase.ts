// src/application/use-cases/AnalyzeDependencyUseCase.ts
import { AnalyzeDependencyInputDTO, AuditOutputDTO } from "../dtos/AuditDTOs";
import { IAuditRepository } from "../ports/IAuditRepository";
import { IAIService } from "../ports/IAIService";
import { ILogRepository } from "../ports/ILogRepository";

export class AnalyzeDependencyUseCase {
  constructor(
    private auditRepository: IAuditRepository,
    private aiService: IAIService,
    private logRepository: ILogRepository
  ) {}

  async execute(input: AnalyzeDependencyInputDTO): Promise<AuditOutputDTO> {
    // 1. Create audit record (pending)
    const audit = await this.auditRepository.create({
      projectName: input.projectName,
      profileId: input.profileId,
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
