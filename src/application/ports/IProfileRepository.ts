import { Profile } from "@/domain/entities/Profile";

export interface IProfileRepository {
  getById(id: string): Promise<Profile | null>;
  update(profile: Partial<Profile> & { id: string }): Promise<Profile>;
}
