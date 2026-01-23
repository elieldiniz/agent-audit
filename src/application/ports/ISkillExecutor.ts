// src/application/ports/ISkillExecutor.ts
import { SkillType } from "../../domain/entities/Skill";

export interface SkillExecutionContext {
  agentId: string;
  payload: any;
  configuration: Record<string, any>;
}

export interface ISkillExecutor {
  execute(type: SkillType, context: SkillExecutionContext): Promise<any>;
}
