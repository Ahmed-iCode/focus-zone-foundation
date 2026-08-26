# Admin seed (belongs to Step 2 — Authentication)

Step 1 intentionally does **not** create any auth user.

Why:

- Passwords must never live in migrations or in source control.
- Account creation is the responsibility of the Authentication step (Step 2),
  which will own sign-up, the `profiles` row creation and the session handling.

## How the admin will be created in Step 2

1. Read credentials from environment variables (never hard-coded):

   ```
   ADMIN_EMAIL=...
   ADMIN_PASSWORD=...
   ADMIN_USERNAME=...
   ```

   Keep these in the local `.env` (already git-ignored) or in the backend
   secrets store. Use throwaway values for development only.

2. Create the auth user with the admin API (server-side only, Step 2), then
   insert/update the matching `public.profiles` row:

   ```sql
   -- run only after the auth user exists; :user_id is that user's UUID
   insert into public.profiles (id, username, role)
   values (:user_id, :username, 'admin')
   on conflict (id) do update set role = 'admin';
   ```

3. Production admins are promoted manually by running the `role = 'admin'`
   update above against an existing account. No default admin ships with the app.
