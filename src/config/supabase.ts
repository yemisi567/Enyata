export const SUPABASE_CONFIG = {
  url: process.env.REACT_APP_SUPABASE_URL || '',
  anonKey: process.env.REACT_APP_SUPABASE_ANON_KEY || ''
}

// Debug logging for environment variables
if (process.env.NODE_ENV === 'development') {
  console.log('Environment check:', {
    hasUrl: !!process.env.REACT_APP_SUPABASE_URL,
    hasAnonKey: !!process.env.REACT_APP_SUPABASE_ANON_KEY,
    url: process.env.REACT_APP_SUPABASE_URL ? 'Set' : 'Missing',
    anonKey: process.env.REACT_APP_SUPABASE_ANON_KEY ? 'Set' : 'Missing'
  })
}
