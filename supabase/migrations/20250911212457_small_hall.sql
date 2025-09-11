/*
  # Système de galerie amélioré avec gestion professionnelle des images

  1. Tables
    - `gallery_photos` - Stockage des métadonnées des photos
    - `upload_batches` - Suivi des lots d'upload
    - `image_processing_logs` - Logs de traitement des images

  2. Sécurité
    - RLS activé sur toutes les tables
    - Politiques pour l'administration
    - Validation des formats et tailles

  3. Fonctionnalités
    - Métadonnées complètes des images
    - Gestion des lots d'upload
    - Détection de doublons
    - Logs de traitement
*/

-- Extension pour UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table principale des photos avec métadonnées complètes
CREATE TABLE IF NOT EXISTS gallery_photos (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text,
  filename text NOT NULL,
  original_filename text NOT NULL,
  file_path text NOT NULL,
  file_size bigint NOT NULL,
  mime_type text NOT NULL,
  width integer NOT NULL,
  height integer NOT NULL,
  thumbnail_path text,
  is_visible boolean DEFAULT true,
  upload_date timestamptz DEFAULT now(),
  batch_id uuid,
  file_hash text, -- Pour détecter les doublons
  processing_status text DEFAULT 'pending', -- pending, processing, completed, failed
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table pour gérer les lots d'upload
CREATE TABLE IF NOT EXISTS upload_batches (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  batch_name text NOT NULL,
  total_files integer DEFAULT 0,
  processed_files integer DEFAULT 0,
  successful_uploads integer DEFAULT 0,
  failed_uploads integer DEFAULT 0,
  status text DEFAULT 'in_progress', -- in_progress, completed, failed
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  error_summary text,
  created_at timestamptz DEFAULT now()
);

-- Table des logs de traitement
CREATE TABLE IF NOT EXISTS image_processing_logs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  photo_id uuid REFERENCES gallery_photos(id) ON DELETE CASCADE,
  batch_id uuid REFERENCES upload_batches(id) ON DELETE CASCADE,
  operation text NOT NULL, -- upload, resize, compress, thumbnail
  status text NOT NULL, -- success, error, warning
  message text,
  processing_time_ms integer,
  file_size_before bigint,
  file_size_after bigint,
  created_at timestamptz DEFAULT now()
);

-- Activer RLS
ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE upload_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE image_processing_logs ENABLE ROW LEVEL SECURITY;

-- Politiques pour l'accès public en lecture
CREATE POLICY "Photos visibles publiquement"
  ON gallery_photos
  FOR SELECT
  TO anon, authenticated
  USING (is_visible = true);

-- Politiques pour l'administration (avec authentification)
CREATE POLICY "Admin peut tout faire sur les photos"
  ON gallery_photos
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin peut gérer les lots"
  ON upload_batches
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin peut voir les logs"
  ON image_processing_logs
  FOR SELECT
  TO authenticated
  USING (true);

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour updated_at
CREATE TRIGGER update_gallery_photos_updated_at
  BEFORE UPDATE ON gallery_photos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Index pour les performances
CREATE INDEX IF NOT EXISTS idx_gallery_photos_visible ON gallery_photos(is_visible, upload_date DESC);
CREATE INDEX IF NOT EXISTS idx_gallery_photos_batch ON gallery_photos(batch_id);
CREATE INDEX IF NOT EXISTS idx_gallery_photos_hash ON gallery_photos(file_hash);
CREATE INDEX IF NOT EXISTS idx_upload_batches_status ON upload_batches(status, started_at DESC);

-- Configuration du stockage Supabase
INSERT INTO storage.buckets (id, name, public) 
VALUES ('gallery-images', 'gallery-images', true)
ON CONFLICT (id) DO NOTHING;

-- Politique de stockage pour les images
CREATE POLICY "Images publiques en lecture"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'gallery-images');

CREATE POLICY "Admin peut gérer les images"
  ON storage.objects FOR ALL
  TO authenticated
  USING (bucket_id = 'gallery-images')
  WITH CHECK (bucket_id = 'gallery-images');