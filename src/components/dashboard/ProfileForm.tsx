"use client";

import { useState } from 'react';
import { Profile } from '@/domain/entities/Profile';
import { updateProfile } from '@/interface-adapters/actions/profileActions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

interface ProfileFormProps {
  profile: Profile;
}

export default function ProfileForm({ profile: initialProfile }: ProfileFormProps) {
  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const updated = await updateProfile(profile);
      setProfile(updated as Profile);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/40 bg-card/60 backdrop-blur-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                Informações do Perfil
              </CardTitle>
              <CardDescription>Gerencie suas informações pessoais e preferências.</CardDescription>
            </div>
            <Button
              variant={isEditing ? "ghost" : "outline"}
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="border-primary/20 hover:bg-primary/10"
            >
              {isEditing ? 'Cancelar' : 'Editar Perfil'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/20 overflow-hidden">
                  {profile.avatar_url ? (
                    <img src={profile.avatar_url} alt={profile.full_name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-primary">
                      {profile.full_name?.[0] || profile.email[0].toUpperCase()}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 w-full space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Nome Completo</Label>
                    <Input
                      id="full_name"
                      value={profile.full_name || ''}
                      disabled={!isEditing}
                      onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                      className="bg-background/50 border-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={profile.email}
                      disabled
                      className="bg-background/50 border-white/10 opacity-60"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Tema Preferido</Label>
                    <select
                      id="theme"
                      disabled={!isEditing}
                      value={profile.preferred_theme}
                      onChange={(e) => setProfile({ ...profile, preferred_theme: e.target.value as any })}
                      className="flex h-10 w-full rounded-md border border-white/10 bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="light">Claro</option>
                      <option value="dark">Escuro</option>
                      <option value="system">Sistema</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Idioma</Label>
                    <select
                      id="language"
                      disabled={!isEditing}
                      value={profile.preferred_language}
                      onChange={(e) => setProfile({ ...profile, preferred_language: e.target.value })}
                      className="flex h-10 w-full rounded-md border border-white/10 bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="pt-BR">Português (Brasil)</option>
                      <option value="en-US">English (US)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center space-x-2 p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <Checkbox
                    id="notifications"
                    disabled={!isEditing}
                    checked={profile.notifications_enabled}
                    onCheckedChange={(checked) => setProfile({ ...profile, notifications_enabled: checked === true })}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="notifications"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Notificações por Email
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receba atualizações sobre seus agentes e auditorias.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90">
                  {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
