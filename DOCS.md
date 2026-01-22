# Enterprise SaaS Architecture Documentation

## Architecture: Clean Architecture
This project follows Clean Architecture principles to ensure scalability, testability, and independence from external frameworks.

### Layers:
1. **Domain**: Pure business logic (Entities, Value Objects). No dependencies on external libraries.
2. **Application**: Use Cases that orchestrate the flow of data. Depends on Domain and Ports (interfaces).
3. **Infrastructure**: Concrete implementations of Ports (Adapters). Supabase repositories, Stripe, OpenAI, etc.
4. **Interface Adapters**: Server Actions, Middleware, and UI Components (Next.js).

## Execution Flow: Analyze Dependency
1. **User triggers Action**: `analyzeProjectDependenciesAction` (Server Action).
2. **Auth Check**: Retrieves user from `supabase.auth.getUser()`.
3. **Dependency Injection**: Instantiates request-scoped repositories and use cases.
4. **UseCase.execute()**:
    - `AuditRepository.create()`: Persists a 'pending' audit.
    - `LogRepository.log()`: Records the audit creation for observability.
    - `AIService.analyze()`: Calls OpenAI to analyze dependencies.
    - `AuditRepository.updateStatus()`: Updates the audit with results or error.
5. **Revalidation**: `revalidatePath` updates the UI with new data.

## Suggested Improvements & Fallbacks
- **Quota Exceeded**: Implement a `CheckQuotaUseCase` before starting the audit. Fallback: Show "Upgrade to Pro" UI.
- **IA Unavailable**: Implement a fallback mechanism (e.g., using a lighter model or a cached common report).
- **Stripe Webhook**: Use a queue (like Supabase Edge Functions or an external queue) for processing webhooks if volume is high.
- **Circuit Breaker**: Add a circuit breaker for the OpenAI API to avoid cascading failures.

## Anti-Patterns to Avoid
1. **Direct DB access from UI**: Always go through Server Actions and Use Cases.
2. **Trusting Client Input**: Never trust `profileId` or `amount` from the client; always verify on the server.
3. **Fat Server Actions**: Keep actions thin; they should only handle request parsing and call use cases.
4. **Singleton Supabase Client on Server**: Always use request-scoped clients (`@supabase/ssr`) to maintain RLS context.
5. **Lack of Observability**: Every business-critical mutation should be logged in `audit_logs`.

## Observability
- **Logs**: Every audit creation/completion is logged.
- **Metrics**: SQL views can be created over `audits` and `audit_logs` to monitor performance and error rates.
- **Failures**: Audit status 'failed' includes `error_message` for debugging.
