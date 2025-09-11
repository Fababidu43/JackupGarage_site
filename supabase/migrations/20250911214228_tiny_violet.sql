/*
  # Configuration des utilisateurs administrateurs

  1. Politique de sécurité
    - Seuls les utilisateurs authentifiés peuvent gérer les photos
    - Accès complet (lecture, écriture, suppression) pour les admins

  2. Utilisateurs administrateurs
    - benjamin.froussard@outlook.fr
    - fabian.measson123@gmail.com
    - Mot de passe: 43benji43

  Note: Les utilisateurs doivent être créés manuellement dans le dashboard Supabase
*/

-- Vérifier que RLS est activé sur toutes les tables
ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE upload_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE image_processing_logs ENABLE ROW LEVEL SECURITY;

-- Politique pour les photos (déjà existante, on la recrée pour être sûr)
DROP POLICY IF EXISTS "Admin peut tout faire sur les photos" ON gallery_photos;
CREATE POLICY "Admin peut tout faire sur les photos"
  ON gallery_photos
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Politique pour les lots d'upload
DROP POLICY IF EXISTS "Admin peut gérer les lots" ON upload_batches;
CREATE POLICY "Admin peut gérer les lots"
  ON upload_batches
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Politique pour les logs (lecture seule pour les admins)
DROP POLICY IF EXISTS "Admin peut voir les logs" ON image_processing_logs;
CREATE POLICY "Admin peut voir les logs"
  ON image_processing_logs
  FOR SELECT
  TO authenticated
  USING (true);

-- Politique pour permettre l'insertion de logs par le système
DROP POLICY IF EXISTS "Système peut créer des logs" ON image_processing_logs;
CREATE POLICY "Système peut créer des logs"
  ON image_processing_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);