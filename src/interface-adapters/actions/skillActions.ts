// src/interface-adapters/actions/skillActions.ts
'use server'

import { ExecuteAgentSkillUseCase, ExecuteSkillInputDTO } from "../../application/use-cases/ExecuteAgentSkillUseCase";
import { SupabaseAgentRepository } from "../../infrastructure/repositories/SupabaseAgentRepository";
import { SupabaseSkillRepository } from "../../infrastructure/repositories/SupabaseSkillRepository";
import { SupabaseLogRepository } from "../../infrastructure/repositories/SupabaseLogRepository";
import { SupabaseQuotaRepository } from "../../infrastructure/repositories/SupabaseQuotaRepository";
import { AISkillExecutor } from "../../infrastructure/skills/AISkillExecutor";
import { OpenAIService } from "../../infrastructure/adapters/openai/OpenAIService";
import { createClient } from "../../infrastructure/adapters/supabase/server";
import { AddSkillToAgentUseCase, AddSkillInputDTO } from "../../application/use-cases/AddSkillToAgentUseCase";
import { SkillType } from "../../domain/entities/Skill";
import { revalidatePath } from "next/cache";

export async function addSkillAction(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const agentId = formData.get('agentId') as string;
  const name = formData.get('name') as string;
  const type = formData.get('type') as SkillType;
  const configRaw = formData.get('configuration') as string;

  if (!agentId || !name || !type) throw new Error("Missing required fields");

  const configuration = configRaw ? JSON.parse(configRaw) : {};

  const agentRepo = new SupabaseAgentRepository(supabase);
  const skillRepo = new SupabaseSkillRepository(supabase);
  const logRepo = new SupabaseLogRepository(supabase);

  const useCase = new AddSkillToAgentUseCase(agentRepo, skillRepo, logRepo);

  const result = await useCase.execute({
    profileId: user.id,
    agentId,
    name,
    type,
    configuration
  });

  revalidatePath(`/dashboard/agents/${agentId}`);
  return { success: true, skillId: result.id };
}

export async function executeSkillAction(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const agentId = formData.get('agentId') as string;
  const skillId = formData.get('skillId') as string;
  const payloadRaw = formData.get('payload') as string;

  if (!agentId || !skillId) throw new Error("Missing required fields");

  const payload = payloadRaw ? JSON.parse(payloadRaw) : {};

  // Dependency Injection
  const agentRepo = new SupabaseAgentRepository(supabase);
  const skillRepo = new SupabaseSkillRepository(supabase);
  const logRepo = new SupabaseLogRepository(supabase);
  const quotaRepo = new SupabaseQuotaRepository(supabase);
  const aiService = new OpenAIService();
  const skillExecutor = new AISkillExecutor(aiService);

  const useCase = new ExecuteAgentSkillUseCase(
    agentRepo,
    skillRepo,
    skillExecutor,
    logRepo,
    quotaRepo
  );

  const input: ExecuteSkillInputDTO = {
    profileId: user.id,
    agentId,
    skillId,
    payload
  };

  const result = await useCase.execute(input);

  return { success: true, result };
}
