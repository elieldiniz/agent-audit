-- Add user preferences to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS notifications_enabled BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS preferred_theme TEXT DEFAULT 'dark',
ADD COLUMN IF NOT EXISTS preferred_language TEXT DEFAULT 'pt-BR';
