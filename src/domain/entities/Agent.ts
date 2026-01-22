// src/domain/entities/Agent.ts
export type AgentStatus = 'active' | 'inactive' | 'training';

export interface Agent {
  readonly id: string;
  readonly ownerId: string;
  readonly name: string;
  readonly description: string;
  readonly status: AgentStatus;
  readonly createdAt: Date;
}

export class AgentEntity implements Agent {
  constructor(
    public readonly id: string,
    public readonly ownerId: string,
    public readonly name: string,
    public readonly description: string,
    public readonly status: AgentStatus,
    public readonly createdAt: Date,
  ) {
    Object.freeze(this);
  }
}
