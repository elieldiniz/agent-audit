// src/interface-adapters/actions/agentActions.ts
'use server'

import { RegisterAgentUseCase, RegisterAgentInputDTO } from "../../application/use-cases/RegisterAgentUseCase";
import { SupabaseAgentRepository } from "../../infrastructure/repositories/SupabaseAgentRepository";
import { SupabaseSkillRepository } from "../../infrastructure/repositories/SupabaseSkillRepository";
import { SupabaseLogRepository } from "../../infrastructure/repositories/SupabaseLogRepository";
import { createClient } from "../../infrastructure/adapters/supabase/server";
import { revalidatePath } from "next/cache";

export async function registerAgentAction(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const skillsRaw = formData.get('skills') as string;

  if (!name) {
    throw new Error("Agent name is required");
  }

  const agentRepository = new SupabaseAgentRepository(supabase);
  const skillRepository = new SupabaseSkillRepository(supabase);
  const logRepository = new SupabaseLogRepository(supabase);

  const useCase = new RegisterAgentUseCase(agentRepository, skillRepository, logRepository);

  const skills = skillsRaw ? JSON.parse(skillsRaw) : [];

  const input: RegisterAgentInputDTO = {
    ownerId: user.id,
    name,
    description,
    skills
  };

  const agent = await useCase.execute(input);

  revalidatePath('/dashboard/agents');

  return { success: true, agentId: agent.id };
}
