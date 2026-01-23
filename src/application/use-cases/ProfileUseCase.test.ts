import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetProfileUseCase } from './GetProfileUseCase';
import { UpdateProfileUseCase } from './UpdateProfileUseCase';
import { IProfileRepository } from '../ports/IProfileRepository';
import { ProfileEntity } from '../../domain/entities/Profile';

describe('Profile Use Cases', () => {
  let mockRepository: IProfileRepository;
  let getProfileUseCase: GetProfileUseCase;
  let updateProfileUseCase: UpdateProfileUseCase;

  const mockProfile = ProfileEntity.create({
    id: 'user-123',
    email: 'test@example.com',
    full_name: 'Test User',
    notifications_enabled: true,
    preferred_theme: 'dark',
    preferred_language: 'pt-BR',
    updated_at: new Date().toISOString()
  });

  beforeEach(() => {
    mockRepository = {
      getById: vi.fn(),
      update: vi.fn()
    } as any;
    getProfileUseCase = new GetProfileUseCase(mockRepository);
    updateProfileUseCase = new UpdateProfileUseCase(mockRepository);
  });

  describe('GetProfileUseCase', () => {
    it('should return profile DTO when user exists', async () => {
      vi.mocked(mockRepository.getById).mockResolvedValue(mockProfile);

      const result = await getProfileUseCase.execute('user-123');

      expect(result).toEqual({
        id: mockProfile.id,
        email: mockProfile.email,
        full_name: mockProfile.full_name,
        avatar_url: mockProfile.avatar_url,
        notifications_enabled: mockProfile.notifications_enabled,
        preferred_theme: mockProfile.preferred_theme,
        preferred_language: mockProfile.preferred_language,
        updated_at: mockProfile.updated_at
      });
      expect(mockRepository.getById).toHaveBeenCalledWith('user-123');
    });

    it('should return null when user does not exist', async () => {
      vi.mocked(mockRepository.getById).mockResolvedValue(null);

      const result = await getProfileUseCase.execute('non-existent');

      expect(result).toBeNull();
    });
  });

  describe('UpdateProfileUseCase', () => {
    it('should return updated profile DTO', async () => {
      const updateData = { id: 'user-123', full_name: 'New Name' };
      const updatedProfile = ProfileEntity.create({ ...mockProfile, full_name: 'New Name' });
      vi.mocked(mockRepository.update).mockResolvedValue(updatedProfile);

      const result = await updateProfileUseCase.execute(updateData);

      expect(result.full_name).toBe('New Name');
      expect(mockRepository.update).toHaveBeenCalledWith(updateData);
    });
  });
});
