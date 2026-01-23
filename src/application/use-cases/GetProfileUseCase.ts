import { IProfileRepository } from "../ports/IProfileRepository";
import { Profile } from "@/domain/entities/Profile";

export class GetProfileUseCase {
  constructor(private profileRepository: IProfileRepository) {}

  async execute(userId: string): Promise<Profile | null> {
    return this.profileRepository.getById(userId);
  }
}
