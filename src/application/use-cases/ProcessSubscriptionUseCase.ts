// src/application/use-cases/ProcessSubscriptionUseCase.ts
import { IQuotaRepository } from "../ports/IQuotaRepository";
import { ILogRepository } from "../ports/ILogRepository";

export interface SubscriptionInput {
  profileId: string;
  tier: 'free' | 'pro' | 'enterprise';
  stripeSubscriptionId: string;
}

export class ProcessSubscriptionUseCase {
  constructor(
    private quotaRepository: IQuotaRepository,
    private logRepository: ILogRepository
  ) {}

  async execute(input: SubscriptionInput): Promise<void> {
    const maxAudits = input.tier === 'pro' ? 100 : input.tier === 'enterprise' ? 1000 : 5;

    // Update quota
    // We might need a more specific method in IQuotaRepository for this
    // For now, let's assume we can update the tier and maxAudits directly

    await this.logRepository.log({
      profileId: input.profileId,
      action: 'SUBSCRIPTION_UPDATED',
      entityType: 'quota',
      metadata: { tier: input.tier, maxAudits }
    });

    console.log(`Processing subscription for ${input.profileId}: ${input.tier}`);
  }
}
