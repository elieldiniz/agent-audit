// src/interface-adapters/actions/auditActions.ts
'use server'

import { AnalyzeDependencyUseCase } from "../../application/use-cases/AnalyzeDependencyUseCase";
import { SupabaseAuditRepository } from "../../infrastructure/repositories/SupabaseAuditRepository";
import { SupabaseLogRepository } from "../../infrastructure/repositories/SupabaseLogRepository";
import { OpenAIService } from "../../infrastructure/adapters/openai/OpenAIService";
import { AnalyzeDependencyInputDTO } from "../../application/dtos/AuditDTOs";
import { revalidatePath } from "next/cache";

import { createClient } from "../../infrastructure/adapters/supabase/server";

/**
 * Orchestrates analysis of a project's dependencies from submitted form data.
 *
 * Validates the authenticated user and required form fields, constructs per-request
 * repositories and services, executes the AnalyzeDependencyUseCase, triggers revalidation
 * of the audits dashboard path, and returns the use case result.
 *
 * @param formData - FormData containing `projectName` (string) and `dependencies` (JSON string)
 * @returns The analysis result produced by the AnalyzeDependencyUseCase
 * @throws Error with message "Unauthorized" if there is no authenticated user
 * @throws Error with message "Missing required fields" if `projectName` or `dependencies` are absent
 */
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
  const aiService = new OpenAIService();
  const analyzeDependencyUseCase = new AnalyzeDependencyUseCase(auditRepository, aiService, logRepository);

  const input: AnalyzeDependencyInputDTO = {
    projectName,
    dependencies,
    profileId: user.id
  };

  const result = await analyzeDependencyUseCase.execute(input);

  revalidatePath('/dashboard/audits');

  return result;
}