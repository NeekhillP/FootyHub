# FootyHub Security Hardening

## Security Overview

FootyHub uses layered security controls:

- Route-level access control in proxy/middleware
- API-level server authorization checks
- Supabase RLS policies as the final data-access boundary
- Runtime environment validation at startup
- Redirect sanitization for authentication flows
- Authorization failure logging for audit trails

## Authentication Flow

- Supabase auth handles identity (email/password, OAuth, OTP).
- Auth callback and confirmation routes validate `next` redirect values before redirecting.
- Login flow only allows safe internal redirect paths.

## Authorization

- `getAdminUser()` in `lib/auth/get-user.ts` enforces runtime admin checks.
- All `/api/admin/*` route handlers perform explicit server-side authorization and return `403` for unauthorized access.
- Authorization failures are logged with context for audit visibility.

## Environment Security

- `lib/env.ts` validates required runtime variables with Zod:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `NEXT_PUBLIC_APP_URL`
- Validation runs during app startup in `app/layout.tsx`.
- Startup fails fast with clear missing/invalid variable errors.

## RLS Policies

Migration: `supabase/migrations/20250615_enhance_rls_policies.sql`

Key protections:

- Users can only read their own profile unless they are admin.
- Users can only update their own profile.
- Non-admin users cannot escalate their own role.
- Sensitive operations have explicit deny policies (direct user insert/delete, favorites updates).
- `FORCE ROW LEVEL SECURITY` is enabled on protected tables.

## Redirect Security

- `lib/auth/redirect.ts` enforces redirect safety.
- Only internal app-relative paths are allowed (must start with `/`).
- External URLs, protocol-relative URLs (`//...`), and malformed redirect values are rejected.
- Fallback safe routes are always used when validation fails.

### Secure Pattern Example

```ts
const safeNext = getSafeRedirectUrl(searchParams.get('next'), '/profile')
router.push(safeNext)
```

## Audit Trail

- Admin authorization denials log structured context:
  - Route/action context
  - User ID (if available)
  - Effective role (when available)

This provides traceability for security reviews and incident investigation.

## Testing Security Changes

1. **Admin API authorization**
   - Call `/api/admin/users`, `/api/admin/users/[id]`, `/api/admin/health` as:
     - unauthenticated user → expect `403`
     - authenticated non-admin user → expect `403`
     - authenticated admin user → expect success response
2. **Redirect hardening**
   - Test `next=/profile` (allowed)
   - Test `next=https://evil.example` (rejected to fallback)
   - Test `next=//evil.example` (rejected to fallback)
   - Test `next=javascript:alert(1)` (rejected to fallback)
3. **Environment validation**
   - Start app without one required variable and verify startup throws clear error.
4. **RLS**
   - As normal user, attempt read/update on another `users` row (blocked)
   - As normal user, attempt to set own role to `admin` (blocked)
   - As admin, verify admin read/update policies still work
