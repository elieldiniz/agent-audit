# Security & Architecture Guide - AuditAI

## Architecture Overview

AuditAI is built using **Next.js 15 (App Router)** and follows **Clean Architecture** principles.

- **Domain**: Pure business logic and entities (`src/domain`).
- **Application**: Business rules and use cases (`src/application`).
- **Infrastructure**: External integrations and adapters (`src/infrastructure`).
- **Interface Adapters**: Controllers, Server Actions, and Middleware (`src/interface-adapters`).

## Route Protection

The project uses a **centralized middleware strategy** to manage access.

### 1. Global Middleware
The root `middleware.ts` file acts as the entry point and executes on every request. It delegates the session logic to `updateSession` in `src/interface-adapters/middleware/authMiddleware.ts`.

### 2. Protection Boundaries
We have two main security boundaries defined in `authMiddleware.ts`:

- **Private Area (`/dashboard/*`)**:
  - **Rule**: Any page created inside `app/dashboard` is **strictly protected**.
  - **Behavior**: If a user is not logged in, they are automatically redirected to `/auth/login`.
- **Auth Area (`/auth/*`)**:
  - **Rule**: Authentication pages (login, sign-up, etc.) are restricted.
  - **Behavior**: If a user is already logged in, they are redirected to `/dashboard` to avoid redundant login screens.

## How to Add New Pages

### Adding a Protected Page
To add a new protected page (e.g., "Settings"):
1. Create a new folder `app/dashboard/settings`.
2. Add a `page.tsx` file inside that folder.
3. **That's it.** The middleware already covers all sub-paths of `/dashboard`.

### Adding a Public Page
To add a new public page (e.g., "Privacy Policy"):
1. Create a new folder at the root of `app/` (e.g., `app/privacy`).
2. Add a `page.tsx`.
3. The page will be public by default because the middleware only redirects for specific prefixes.

## Best Practices
- **Server-Side Checks**: For critical actions, always call `supabase.auth.getUser()` inside Server Actions or Server Components to re-verify the user's identity server-side.
- **Environment Variables**: Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are always present in your `.env`.
