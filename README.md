# ExportOS — ERP untuk eksportir Indonesia

Next.js 15 (App Router) + Supabase. Ten screens: dashboard, export-readiness scoring,
product catalogue with HS codes, buyer CRM, quotations, international payments,
shipping & document bundles, a D3 commodity map, the export journey, and a
four-step export simulation that generates a commercial invoice.

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

**Without Supabase configured the app runs in demo mode:** seed data is served from
memory and any email/password logs you in. That is the fastest way to look around.

## Connecting Supabase

1. Create a project at [supabase.com](https://supabase.com/dashboard).
2. **SQL Editor → New query** → paste all of [`supabase/schema.sql`](supabase/schema.sql) → **Run**.
   This creates every table, enables RLS, and inserts the seed rows.
3. **Settings → API** → copy the Project URL and the `anon` public key.
4. Create `.env.local`:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
   ```

5. Restart `npm run dev`.

With those two variables set, demo mode switches off: login goes through Supabase
Auth (email + password), and every screen reads from Postgres. The readiness
checklist is stored per user in `readiness_state`.

### Creating the first user

Either click **Buat akun** on the login screen, or add a user under
**Authentication → Users → Add user** in the Supabase dashboard. To skip the
confirmation email during setup, turn off **Confirm email** under
**Authentication → Providers → Email**.

## Deploying to Vercel

1. Push this directory to a Git repository.
2. In Vercel, **Add New → Project** and import the repo. The framework is detected
   as Next.js — no build settings to change.
3. Under **Environment Variables**, add `NEXT_PUBLIC_SUPABASE_URL` and
   `NEXT_PUBLIC_SUPABASE_ANON_KEY` for Production, Preview, and Development.
4. Deploy.
5. Back in Supabase, go to **Authentication → URL Configuration** and set the Site
   URL to your Vercel domain, adding `https://your-app.vercel.app/**` to the
   redirect allow-list.

Deploying without the environment variables also works — the app just stays in
demo mode, which is useful for sharing a preview.

## Layout

```
app/
  (app)/              signed-in shell (topbar, sidebar, screen header)
    dashboard  readiness  katalog  crm  quotation
    pembayaran  shipping  peta  journey  simulasi
  login/              login + signup form
components/           Sidebar, ScreenHeader, ShipmentCard, StatusChip, CommodityMap
lib/
  actions.ts          server actions: login, logout, toggleCheck
  data.ts             readers — Supabase with a demo-data fallback
  demo-data.ts        seed rows, mirrored by supabase/schema.sql
  content.ts          static reference content (regions, checklist, copy)
  ui.ts               colour tokens + status→chip maps
  supabase/           browser/server clients + config
middleware.ts         route protection (Supabase session, or demo cookie)
supabase/schema.sql   tables, RLS policies, seed data
```

### Notes

- `lib/data.ts` falls back to demo data whenever a query errors or returns nothing,
  so a partially-seeded database degrades gracefully rather than throwing.
- RLS currently grants any authenticated user full access to the business tables —
  a single-tenant starter. Add an `org_id` column and scope the policies before
  putting more than one company on the same instance.
- The commodity map bundles `world-atlas` locally, so it renders without any
  external CDN request.
# exportOS
