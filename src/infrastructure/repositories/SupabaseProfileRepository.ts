import { SupabaseClient } from "@supabase/supabase-js";
import { IProfileRepository } from "@/application/ports/IProfileRepository";
import { Profile, ProfileEntity } from "@/domain/entities/Profile";

export class SupabaseProfileRepository implements IProfileRepository {
  constructor(private client: SupabaseClient) {}

  async getById(id: string): Promise<Profile | null> {
    const { data, error } = await this.client
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) return null;

    return ProfileEntity.create({
      id: data.id,
      email: data.email || "",
      full_name: data.full_name,
      avatar_url: data.avatar_url,
      notifications_enabled: data.notifications_enabled,
      preferred_theme: data.preferred_theme,
      preferred_language: data.preferred_language,
      updated_at: data.updated_at,
    });
  }

  async update(profile: Partial<Profile> & { id: string }): Promise<Profile> {
    const { data, error } = await this.client
      .from("profiles")
      .update({
        full_name: profile.full_name,
        avatar_url: profile.avatar_url,
        notifications_enabled: profile.notifications_enabled,
        preferred_theme: profile.preferred_theme,
        preferred_language: profile.preferred_language,
        updated_at: new Date().toISOString(),
      })
      .eq("id", profile.id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update profile: ${error.message}`);

    return ProfileEntity.create({
      id: data.id,
      email: data.email || "",
      full_name: data.full_name,
      avatar_url: data.avatar_url,
      notifications_enabled: data.notifications_enabled,
      preferred_theme: data.preferred_theme,
      preferred_language: data.preferred_language,
      updated_at: data.updated_at,
    });
  }
}
