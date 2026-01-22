// src/infrastructure/skills/AISkillExecutor.ts
import { ISkillExecutor, SkillExecutionContext } from "../../application/ports/ISkillExecutor";
import { SkillType } from "../../domain/entities/Skill";
import { IAIService } from "../../application/ports/IAIService";

export class AISkillExecutor implements ISkillExecutor {
  constructor(private aiService: IAIService) {}

  async execute(type: SkillType, context: SkillExecutionContext): Promise<any> {
    try {
      switch (type) {
        case SkillType.SECURITY_AUDIT:
          return await this.aiService.analyzeDependencies(context.payload);
        case SkillType.LICENSE_AUDIT:
          return await this.aiService.analyzeDependencies(context.payload);
        default:
          throw new Error(`Execution for skill type ${type} not implemented.`);
      }
    } catch (error) {
      console.error(`AI Skill Execution failed for ${type}, attempting fallback...`, error);
      return this.handleFallback(type, context);
    }
  }

  private handleFallback(type: SkillType, context: SkillExecutionContext): any {
    // Fallback logic: return cached data or a simplified response
    return {
      status: 'warning',
      message: 'AI analysis currently unavailable. Please try again later.',
      fallback_active: true,
      data: []
    };
  }
}
