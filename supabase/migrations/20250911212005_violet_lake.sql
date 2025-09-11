/*
  # Système de galerie autonome Jack Up Garage

  1. New Tables
    - `gallery_photos`
      - `id` (uuid, primary key)
      - `title` (text, titre de l'intervention)
      - `image_url` (text, URL de l'image stockée)
      - `date_intervention` (text, date affichée)
      - `created_at` (timestamp)
      - `display_order` (integer, ordre d'affichage)
      - `is_visible` (boolean, photo visible ou cachée)

  2. Storage
    - Bucket `gallery-photos` pour stocker les images
    - Politique publique pour la lecture
    - Politique authentifiée pour l'upload

  3. Security
    - RLS activé sur la table
    - Politique publique pour la lecture des photos visibles
    - Politique authentifiée pour la gestion complète
*/

-- Créer la table des photos de galerie
CREATE TABLE IF NOT EXISTS gallery_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  image_url text NOT NULL,
  date_intervention text NOT NULL,
  created_at timestamptz DEFAULT now(),
  display_order integer DEFAULT 0,
  is_visible boolean DEFAULT true
);

-- Activer RLS
ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;

-- Politique pour lecture publique des photos visibles
CREATE POLICY "Photos visibles publiquement"
  ON gallery_photos
  FOR SELECT
  TO anon, authenticated
  USING (is_visible = true);

-- Politique pour gestion complète par utilisateurs authentifiés
CREATE POLICY "Gestion complète pour authentifiés"
  ON gallery_photos
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Créer le bucket de stockage pour les photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery-photos', 'gallery-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Politique de lecture publique pour le bucket
CREATE POLICY "Photos publiques en lecture"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'gallery-photos');

-- Politique d'upload pour utilisateurs authentifiés
CREATE POLICY "Upload pour authentifiés"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'gallery-photos');

-- Politique de suppression pour utilisateurs authentifiés
CREATE POLICY "Suppression pour authentifiés"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'gallery-photos');

-- Insérer quelques photos par défaut
INSERT INTO gallery_photos (title, image_url, date_intervention, display_order) VALUES
('Vidange moteur', 'https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=800', '15 Mars 2024', 1),
('Remplacement embrayage', '/embrayage_photos.jpg', '12 Mars 2024', 2),
('Kit distribution', '/distri_photos.jpg', '10 Mars 2024', 3),
('Changement amortisseurs', '/amortie_photos.jpg', '8 Mars 2024', 4),
('Système de freinage', '/freins_photos.jpg', '5 Mars 2024', 5),
('Diagnostic électronique', 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=800', '3 Mars 2024', 6);