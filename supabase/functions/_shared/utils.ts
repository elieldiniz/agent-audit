// supabase/functions/_shared/logger.ts
export const logger = {
  info: (msg: string, data?: any) => console.log(JSON.stringify({ level: 'info', msg, data, ts: new Date() })),
  error: (msg: string, error?: any) => console.error(JSON.stringify({ level: 'error', msg, error: error?.message, ts: new Date() })),
};

// supabase/functions/_shared/supabase-client.ts
import { createClient } from '@supabase/supabase-js';

export const getAdminClient = () => createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);
