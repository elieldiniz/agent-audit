// src/application/ports/IQuotaRepository.ts
export interface Quota {
  profileId: string;
  maxAudits: number;
  usedAudits: number;
  tier: 'free' | 'pro' | 'enterprise';
}

export interface IQuotaRepository {
  getByProfileId(profileId: string): Promise<Quota | null>;
  incrementUsed(profileId: string): Promise<void>;
}
