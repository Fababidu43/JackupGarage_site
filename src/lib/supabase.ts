import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Configuration par défaut pour éviter les erreurs de connexion
const defaultUrl = 'https://placeholder.supabase.co'
const defaultKey = 'placeholder-key'

// Utiliser les valeurs par défaut si les variables d'environnement ne sont pas définies
// Avertir en développement si les vraies clés ne sont pas configurées
if (import.meta.env.DEV && (!supabaseUrl || !supabaseAnonKey)) {
  console.warn('⚠️ Variables d\'environnement Supabase non configurées. Fonctionnalités limitées.')
  console.warn('Ajoutez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans votre fichier .env')
}
const finalUrl = supabaseUrl || defaultUrl
const finalKey = supabaseAnonKey || defaultKey