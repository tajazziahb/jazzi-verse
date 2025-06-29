import { createClient } from '@supabase/supabase-js'

// Replace these with your own Supabase project credentials
const supabaseUrl ='https://ephnkcxkpfxahgnszflc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwaG5rY3hrcGZ4YWhnbnN6ZmxjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTA5NzcyMSwiZXhwIjoyMDY0NjczNzIxfQ.GfaaEchXvkjNjqyn4EMmqjicopXSfMGzP1hVfgcK3Gw'

export const supabase = createClient(supabaseUrl, supabaseKey)
