// src/application/use-cases/CheckQuotaUseCase.ts
import { IQuotaRepository } from "../ports/IQuotaRepository";

export class CheckQuotaUseCase {
  constructor(private quotaRepository: IQuotaRepository) {}

  async execute(profileId: string): Promise<{ allowed: boolean; remaining: number }> {
    const quota = await this.quotaRepository.getByProfileId(profileId);

    if (!quota) {
      // Default to free tier if record missing (should not happen due to trigger)
      return { allowed: false, remaining: 0 };
    }

    const allowed = quota.usedAudits < quota.maxAudits;
    const remaining = Math.max(0, quota.maxAudits - quota.usedAudits);

    return { allowed, remaining };
  }
}
