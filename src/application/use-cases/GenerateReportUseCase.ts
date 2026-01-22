// src/application/use-cases/GenerateReportUseCase.ts
import { Audit } from "../../domain/entities/Audit";
import { FormattedReportDTO } from "../dtos/ReportDTOs";
import { IAuditRepository } from "../ports/IAuditRepository";

export class GenerateReportUseCase {
  constructor(private auditRepository: IAuditRepository) {}

  async execute(auditId: string): Promise<FormattedReportDTO> {
    const audit = await this.auditRepository.findById(auditId);

    if (!audit) {
      throw new Error("Audit not found");
    }

    if (audit.status !== 'completed' || !audit.reportJson) {
      throw new Error("Audit is not in a completed state or has no data");
    }

    const reportData = audit.reportJson;

    // Logic to transform raw AI data into a structured report
    return {
      auditId: audit.id,
      projectName: audit.projectName,
      summary: {
        score: reportData.score || 0,
        totalDependencies: Object.keys(reportData.dependencies || {}).length,
        criticalVulnerabilities: (reportData.vulnerabilities || []).filter((v: any) => v.severity === 'critical').length,
      },
      details: (reportData.vulnerabilities || []).map((v: any) => ({
        dependency: v.name,
        version: v.version,
        status: v.severity === 'critical' ? 'critical' : 'warning',
        recommendation: v.fix,
      })),
      generatedAt: new Date().toISOString(),
    };
  }
}
