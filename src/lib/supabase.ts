import { createClient } from '@supabase/supabase-js'

// Récupération sécurisée des variables d'environnement
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || (typeof window !== 'undefined' ? window.SUPABASE_URL : '') || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || (typeof window !== 'undefined' ? window.SUPABASE_ANON_KEY : '') || ''

// Configuration par défaut pour éviter les erreurs de connexion
const defaultUrl = 'https://placeholder.supabase.co'
const defaultKey = 'placeholder-key'

// Utiliser les valeurs par défaut si les variables d'environnement ne sont pas définies
// Avertir en développement si les vraies clés ne sont pas configurées
if (import.meta.env.DEV && (!supabaseUrl || !supabaseAnonKey)) {
  console.warn('⚠️ Variables d\'environnement Supabase non configurées. Fonctionnalités limitées.')
  console.warn('Configurez les variables d\'environnement nécessaires')
}
const finalUrl = supabaseUrl || defaultUrl
const finalKey = supabaseAnonKey || defaultKey

export const supabase = createClient(finalUrl, finalKey)