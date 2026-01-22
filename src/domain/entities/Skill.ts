// src/domain/entities/Skill.ts
export interface Skill {
  readonly id: string;
  readonly agentId: string;
  readonly name: string;
  readonly type: string;
  readonly configuration: Record<string, any>;
  readonly createdAt: Date;
}

export class SkillEntity implements Skill {
  constructor(
    public readonly id: string,
    public readonly agentId: string,
    public readonly name: string,
    public readonly type: string,
    public readonly configuration: Record<string, any>,
    public readonly createdAt: Date,
  ) {
    Object.freeze(this);
  }
}
