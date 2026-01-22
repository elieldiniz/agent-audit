-- Migration: Create Agents and Skills tables

-- 1. Agents Table
CREATE TABLE public.agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'training')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Skills Table
CREATE TABLE public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES public.agents(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  configuration JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ENABLE RLS
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

-- POLICIES
-- Agents: Users can only see/manage their own agents
CREATE POLICY "Users can view own agents" ON public.agents FOR SELECT USING (auth.uid() = owner_id);
CREATE POLICY "Users can create own agents" ON public.agents FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Users can update own agents" ON public.agents FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Users can delete own agents" ON public.agents FOR DELETE USING (auth.uid() = owner_id);

-- Skills: Users can see/manage skills of their own agents
CREATE POLICY "Users can view own agents' skills" ON public.skills FOR SELECT
USING (EXISTS (SELECT 1 FROM public.agents WHERE id = skills.agent_id AND owner_id = auth.uid()));

CREATE POLICY "Users can create skills for own agents" ON public.skills FOR INSERT
WITH CHECK (EXISTS (SELECT 1 FROM public.agents WHERE id = skills.agent_id AND owner_id = auth.uid()));

CREATE POLICY "Users can update own agents' skills" ON public.skills FOR UPDATE
USING (EXISTS (SELECT 1 FROM public.agents WHERE id = skills.agent_id AND owner_id = auth.uid()));

CREATE POLICY "Users can delete own agents' skills" ON public.skills FOR DELETE
USING (EXISTS (SELECT 1 FROM public.agents WHERE id = skills.agent_id AND owner_id = auth.uid()));
