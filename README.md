# Intelligent Dependency Audit SaaS

An enterprise-grade platform for AI-powered dependency risk assessment, built with Next.js App Router, Supabase, and Deno Edge Functions.

## 🚀 Overview

This SaaS platform provides automated security analysis for software dependencies. By leveraging AI (via Edge Functions) and a robust enterprise architecture, it offers real-time risk scoring, changelog audits, and actionable security insights.

**Key Features:**
- **AI-Powered Analysis**: Intelligent risk assessment using LLMs via Supabase Edge Functions.
- **Enterprise Reporting**: Detailed JSON/PDF reports with verifiable sources.
- **Secure by Design**: Server-side authentication, RLS (Row Level Security), and secure middleware.
- **Scalable Architecture**: Clean Architecture principles separating Domain, Application, and Infrastructure layers.

## 🛠️ Tech Stack (Fixed 2026)

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 16+ (App Router) |
| **Language** | TypeScript |
| **UI** | shadcn/ui + Tailwind CSS |
| **Auth & DB** | Supabase (Auth, Postgres, Realtime) |
| **Backend** | Supabase Edge Functions (Deno) |
| **State** | Server Components (Default) + React Query (Client) |

## 🏗️ Project Structure

The project follows a **Supabase-aware Clean Architecture**:

```
src/
├── app/                  # Next.js App Router
│   ├── (marketing)/      # Public pages
│   ├── (auth)/           # Auth pages (Login/Register)
│   └── (app)/            # Protected SaaS app
├── core/                 # Pure Domain Logic
│   ├── use-cases/        # Application business rules
│   └── ports/            # Interfaces for external services
├── infrastructure/       # Adapters & Implementations
│   ├── supabase/         # Supabase repositories
│   └── ai/               # AI Service implementations
├── lib/
│   └── supabase/         # Official Supabase Helpers (SSR)
└── components/           # shadcn/ui & Feature components
```

## ⚡ Getting Started

### Prerequisites
- Node.js 20+
- [Supabase CLI](https://supabase.com/docs/guides/cli)
- [Deno](https://deno.com/) (for Edge Functions development)

### Environment Setup

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd agent-audit
   ```

2. Copy the environment variables:
   ```bash
   cp .env.example .env.local
   ```

3. Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

### Local Development

Run the development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🧠 Core Principles

- **Server-First**: We prioritize Server Components for data fetching and initial rendering.
- **Edge-Ready**: Heavy computation and AI orchestration happen in Supabase Edge Functions (Deno).
- **Security**: Row Level Security (RLS) is enabled and enforced for all tables.
- **Type Safety**: End-to-end type safety from Database to UI.

## 🤝 Contributing

Please see [`skills/`](./skills) for detailed architectural guidelines:
- [Next.js Architect Guide](./skills/nextjs_enterprise_architect.md)
- [Edge Functions Architect Guide](./skills/supabase_edge_functions_architect.md)
