import { getProfile } from '@/interface-adapters/actions/profileActions';
import ProfileForm from '@/components/dashboard/ProfileForm';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const profile = await getProfile();

  if (!profile) {
    redirect('/auth/login');
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>
          <p className="text-muted-foreground">
            Gerencie suas configurações de conta e preferências.
          </p>
        </div>

        <ProfileForm profile={profile} />
      </div>
    </div>
  );
}
