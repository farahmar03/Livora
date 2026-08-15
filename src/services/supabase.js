// src/services/supabase.js
import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = "https://sfjwqpobhelmyimurlyi.supabase.co"
const SUPABASE_ANON_KEY = "sb_publishable_ycnRz2mEYgCkcP8ZmPSqLQ_CQymV0th"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)