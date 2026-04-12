# ⚠️ IMPORTANT: Delete All Users from Supabase

## Manual Action Required

Please follow these steps to delete all existing users from Supabase:

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Users**
3. Select all users (Ctrl+A or Cmd+A)
4. Click the trash icon to delete all users
5. Confirm the deletion

## Why This Is Needed

The new auth system has been completely rewritten with:
- Different profile structure
- New RLS policies
- Demo user accounts
- Updated registration flow

Old users may have incompatible data structures that could cause issues with the new system.

## After Deleting Users

After deleting all users:
1. Run the new migrations (006_create_profiles.sql and 007_update_profiles_policies.sql)
2. Test the new registration flow
3. Test the demo login buttons

## Demo Accounts

The new system will automatically create demo accounts when you click:
- "Entrar como Universidad (demo)" → demo-university@ovofy.com
- "Entrar como Profesor (demo)" → demo-professor@ovofy.com  
- "Entrar como Admin (demo)" → demo-admin@ovofy.com

Password for all demo accounts: `demo123456`

## New Features

- ✅ Complete auth rewrite from scratch
- ✅ New registration form with all required fields
- ✅ Demo login buttons for testing
- ✅ Fixed protected routes
- ✅ Simple university comparator (no Framer Motion)
- ✅ Updated profiles table with proper RLS policies
