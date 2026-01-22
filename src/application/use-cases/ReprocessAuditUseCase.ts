// src/application/use-cases/ReprocessAuditUseCase.ts
import { IAuditRepository } from "../ports/IAuditRepository";
import { AnalyzeDependencyUseCase } from "./AnalyzeDependencyUseCase";
import { AnalyzeDependencyInputDTO } from "../dtos/AuditDTOs";

export class ReprocessAuditUseCase {
  constructor(
    private auditRepository: IAuditRepository,
    private analyzeUseCase: AnalyzeDependencyUseCase
  ) {}

  async execute(auditId: string): Promise<any> {
    const originalAudit = await this.auditRepository.findById(auditId);

    if (!originalAudit) {
      throw new Error("Original audit not found");
    }

    if (!originalAudit.payloadJson) {
      throw new Error("Original audit has no input data to reprocess");
    }

    const input: AnalyzeDependencyInputDTO = {
      projectName: originalAudit.projectName,
      dependencies: originalAudit.payloadJson as Record<string, string>,
      profileId: originalAudit.profileId
    };

    return this.analyzeUseCase.execute(input);
  }
}
