import { IProfileRepository } from "../ports/IProfileRepository";
import { Profile } from "@/domain/entities/Profile";

export class UpdateProfileUseCase {
  constructor(private profileRepository: IProfileRepository) {}

  async execute(data: Partial<Profile> & { id: string }): Promise<Profile> {
    return this.profileRepository.update(data);
  }
}
