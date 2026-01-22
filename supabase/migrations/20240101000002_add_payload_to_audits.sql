-- Migration: Add payload_json to audits
ALTER TABLE public.audits ADD COLUMN payload_json JSONB;
