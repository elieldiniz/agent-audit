export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  notifications_enabled: boolean;
  preferred_theme: 'light' | 'dark' | 'system';
  preferred_language: string;
  updated_at: string;
}

export class ProfileEntity implements Profile {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly notifications_enabled: boolean,
    public readonly preferred_theme: 'light' | 'dark' | 'system',
    public readonly preferred_language: string,
    public readonly updated_at: string,
    public readonly full_name?: string,
    public readonly avatar_url?: string
  ) {
    Object.freeze(this);
  }

  static create(props: Profile): ProfileEntity {
    return new ProfileEntity(
      props.id,
      props.email,
      props.notifications_enabled,
      props.preferred_theme,
      props.preferred_language,
      props.updated_at,
      props.full_name,
      props.avatar_url
    );
  }
}
