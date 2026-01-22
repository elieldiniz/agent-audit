// src/domain/entities/Skill.ts
export enum SkillType {
  SECURITY_AUDIT = 'security_audit',
  LICENSE_AUDIT = 'license_audit',
  PERFORMANCE_ANALYSIS = 'performance_analysis',
  DEPENDENCY_OPTIMIZATION = 'dependency_optimization'
}

export interface Skill {
  readonly id: string;
  readonly agentId: string;
  readonly name: string;
  readonly type: SkillType;
  readonly configuration: Record<string, any>;
  readonly createdAt: Date;
}

export class SkillEntity implements Skill {
  constructor(
    public readonly id: string,
    public readonly agentId: string,
    public readonly name: string,
    public readonly type: SkillType,
    public readonly configuration: Record<string, any>,
    public readonly createdAt: Date,
  ) {
    Object.freeze(this);
  }
}
