// src/interface-adapters/actions/auditActions.ts
'use server'

import { AnalyzeDependencyUseCase } from "../../application/use-cases/AnalyzeDependencyUseCase";
import { CheckQuotaUseCase } from "../../application/use-cases/CheckQuotaUseCase";
import { SupabaseAuditRepository } from "../../infrastructure/repositories/SupabaseAuditRepository";
import { SupabaseLogRepository } from "../../infrastructure/repositories/SupabaseLogRepository";
import { SupabaseQuotaRepository } from "../../infrastructure/repositories/SupabaseQuotaRepository";
import { OpenAIService } from "../../infrastructure/adapters/openai/OpenAIService";
import { AnalyzeDependencyInputDTO } from "../../application/dtos/AuditDTOs";
import { revalidatePath } from "next/cache";

import { createClient } from "../../infrastructure/adapters/supabase/server";

export async function analyzeProjectDependenciesAction(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const projectName = formData.get('projectName') as string;
  const dependenciesRaw = formData.get('dependencies') as string;

  if (!projectName || !dependenciesRaw) {
    throw new Error("Missing required fields");
  }

  const dependencies = JSON.parse(dependenciesRaw);

  // Dependency Injection per request
  const auditRepository = new SupabaseAuditRepository(supabase);
  const logRepository = new SupabaseLogRepository(supabase);
  const quotaRepository = new SupabaseQuotaRepository(supabase);
  const checkQuotaUseCase = new CheckQuotaUseCase(quotaRepository);
  const aiService = new OpenAIService();

  const analyzeDependencyUseCase = new AnalyzeDependencyUseCase(
    auditRepository,
    aiService,
    logRepository,
    quotaRepository,
    checkQuotaUseCase
  );

  const input: AnalyzeDependencyInputDTO = {
    projectName,
    dependencies,
    profileId: user.id
  };

  const result = await analyzeDependencyUseCase.execute(input);

  revalidatePath('/dashboard/audits');

  return result;
}
