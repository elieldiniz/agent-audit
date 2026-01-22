// src/application/dtos/ReportDTOs.ts
export interface FormattedReportDTO {
  readonly auditId: string;
  readonly projectName: string;
  readonly summary: {
    readonly score: number;
    readonly totalDependencies: number;
    readonly criticalVulnerabilities: number;
  };
  readonly details: Array<{
    readonly dependency: string;
    readonly version: string;
    readonly status: 'safe' | 'warning' | 'critical';
    readonly recommendation?: string;
  }>;
  readonly generatedAt: string;
}
