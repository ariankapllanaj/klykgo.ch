import type { SupabaseClient } from '@supabase/supabase-js';

// This guards the UI. Supabase must independently authorize every API operation.
export async function readAuthAccess(client: SupabaseClient) {
  const { data: sessionData, error: sessionError } = await client.auth.getSession();
  if (sessionError) throw sessionError;
  if (!sessionData.session) return { user: null, mfaRequired: false };

  const { data, error } = await client.auth.mfa.getAuthenticatorAssuranceLevel();
  if (error) throw error;
  if (!data?.currentLevel || !data.nextLevel) throw new Error('Unable to verify session');
  return {
    user: sessionData.session.user,
    mfaRequired: data.nextLevel === 'aal2' && data.currentLevel !== 'aal2'
  };
}
