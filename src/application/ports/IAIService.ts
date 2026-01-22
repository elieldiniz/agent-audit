// src/application/ports/IAIService.ts
export interface IAIService {
  analyzeDependencies(dependencies: Record<string, string>): Promise<any>;
}
