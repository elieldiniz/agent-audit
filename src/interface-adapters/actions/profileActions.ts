"use server";

import { createClient } from "@/infrastructure/adapters/supabase/server";
import { SupabaseProfileRepository } from "@/infrastructure/repositories/SupabaseProfileRepository";
import { GetProfileUseCase } from "@/application/use-cases/GetProfileUseCase";
import { UpdateProfileUseCase } from "@/application/use-cases/UpdateProfileUseCase";
import { Profile } from "@/domain/entities/Profile";
import { revalidatePath } from "next/cache";

async function getProfileUseCase() {
  const supabase = await createClient();
  const repository = new SupabaseProfileRepository(supabase);
  return new GetProfileUseCase(repository);
}

async function updateProfileUseCase() {
  const supabase = await createClient();
  const repository = new SupabaseProfileRepository(supabase);
  return new UpdateProfileUseCase(repository);
}

// Helper to convert Domain Entity (frozen) to plain object for Next.js serialization
function toPlainObject(profile: Profile) {
  return {
    id: profile.id,
    email: profile.email,
    full_name: profile.full_name,
    avatar_url: profile.avatar_url,
    notifications_enabled: profile.notifications_enabled,
    preferred_theme: profile.preferred_theme,
    preferred_language: profile.preferred_language,
    updated_at: profile.updated_at,
  };
}

export async function getProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const useCase = await getProfileUseCase();
  const profile = await useCase.execute(user.id);

  return profile ? toPlainObject(profile) : null;
}

export async function updateProfile(data: Partial<Profile>): Promise<Profile> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const useCase = await updateProfileUseCase();
  const profile = await useCase.execute({ ...data, id: user.id });

  revalidatePath("/dashboard/profile");
  return toPlainObject(profile);
}
