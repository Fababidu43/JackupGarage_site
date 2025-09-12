import { supabase } from './supabase';
import { ImageProcessor, ProcessingProgress } from './imageProcessor';

export interface Photo {
  id: string;
  title: string;
  description?: string;
  filename: string;
  original_filename: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  width: number;
  height: number;
  thumbnail_path?: string;
  is_visible: boolean;
  upload_date: string;
  batch_id?: string;
  file_hash: string;
  processing_status: 'pending' | 'processing' | 'completed' | 'failed';
  relatedPhotos?: Photo[]; // Pour grouper les photos d'un même travail
}

export interface UploadBatch {
  id: string;
  batch_name: string;
  total_files: number;
  processed_files: number;
  successful_uploads: number;
  failed_uploads: number;
  status: 'in_progress' | 'completed' | 'failed';
  started_at: string;
  completed_at?: string;
  error_summary?: string;
}

export interface UploadResult {
  success: boolean;
  photo?: Photo;
  error?: string;
  processingTime?: number;
}

export class GalleryService {
  /**
   * Récupère toutes les photos visibles
   */
  static async getVisiblePhotos(): Promise<Photo[]> {
    const { data, error } = await supabase
      .from('gallery_photos')
      .select('*')
      .eq('is_visible', true)
      .eq('processing_status', 'completed')
      .order('upload_date', { ascending: false });

    if (error) {
      console.error('Erreur lors de la récupération des photos:', error);
      return [];
    }

    return data || [];
  }

  /**
   * Récupère toutes les photos (admin)
   */
  static async getAllPhotos(): Promise<Photo[]> {
    const { data, error } = await supabase
      .from('gallery_photos')
      .select('*')
      .order('upload_date', { ascending: false });

    if (error) {
      console.error('Erreur lors de la récupération des photos:', error);
      return [];
    }

    return data || [];
  }

  /**
   * Crée un nouveau lot d'upload
   */
  static async createUploadBatch(batchName: string, totalFiles: number): Promise<string> {
    const { data, error } = await supabase
      .from('upload_batches')
      .insert({
        batch_name: batchName,
        total_files: totalFiles,
        status: 'in_progress'
      })
      .select('id')
      .single();

    if (error) {
      throw new Error(`Erreur lors de la création du lot: ${error.message}`);
    }

    return data.id;
  }

  /**
   * Met à jour le statut d'un lot
   */
  static async updateBatchStatus(
    batchId: string, 
    updates: Partial<UploadBatch>
  ): Promise<void> {
    const { error } = await supabase
      .from('upload_batches')
      .update(updates)
      .eq('id', batchId);

    if (error) {
      console.error('Erreur lors de la mise à jour du lot:', error);
    }
  }

  /**
   * Upload une image avec traitement complet
   */
  static async uploadImage(
    file: File,
    title: string,
    description: string = '',
    batchId?: string,
    onProgress?: (progress: ProcessingProgress) => void
  ): Promise<UploadResult> {
    const startTime = Date.now();

    try {
      // 1. Validation
      onProgress?.({
        current: 1,
        total: 6,
        status: 'processing',
        message: 'Validation de l\'image...',
        fileName: file.name
      });

      const validation = await ImageProcessor.validateImage(file);
      if (!validation.isValid) {
        return {
          success: false,
          error: validation.errors.join(', ')
        };
      }

      // 2. Génération du hash pour détecter les doublons
      onProgress?.({
        current: 2,
        total: 6,
        status: 'processing',
        message: 'Vérification des doublons...',
        fileName: file.name
      });

      const fileHash = await ImageProcessor.generateFileHash(file);
      
      // Vérifier si l'image existe déjà
      const { data: existingPhoto } = await supabase
        .from('gallery_photos')
        .select('id, title')
        .eq('file_hash', fileHash)
        .single();

      if (existingPhoto) {
        return {
          success: false,
          error: `Image déjà présente: "${existingPhoto.title}"`
        };
      }

      // 3. Optimisation de l'image
      onProgress?.({
        current: 3,
        total: 6,
        status: 'processing',
        message: 'Optimisation de l\'image...',
        fileName: file.name
      });

      const optimizedFile = await ImageProcessor.optimizeImage(file);
      const uniqueFileName = ImageProcessor.generateUniqueFileName(file.name);

      // 4. Création de la miniature
      onProgress?.({
        current: 4,
        total: 6,
        status: 'processing',
        message: 'Création de la miniature...',
        fileName: file.name
      });

      const thumbnailFile = await ImageProcessor.createThumbnail(optimizedFile);
      const thumbnailFileName = `thumb_${uniqueFileName}`;

      // 5. Upload vers Supabase Storage
      onProgress?.({
        current: 5,
        total: 6,
        status: 'uploading',
        message: 'Upload en cours...',
        fileName: file.name
      });

      // Upload image principale
      const { error: uploadError } = await supabase.storage
        .from('gallery-images')
        .upload(`photos/${uniqueFileName}`, optimizedFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw new Error(`Erreur upload image: ${uploadError.message}`);
      }

      // Upload miniature
      const { error: thumbUploadError } = await supabase.storage
        .from('gallery-images')
        .upload(`thumbnails/${thumbnailFileName}`, thumbnailFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (thumbUploadError) {
        console.warn('Erreur upload miniature:', thumbUploadError.message);
      }

      // 6. Sauvegarde en base de données
      onProgress?.({
        current: 6,
        total: 6,
        status: 'processing',
        message: 'Sauvegarde des métadonnées...',
        fileName: file.name
      });

      const { data: photo, error: dbError } = await supabase
        .from('gallery_photos')
        .insert({
          title,
          description,
          filename: uniqueFileName,
          original_filename: file.name,
          file_path: `photos/${uniqueFileName}`,
          file_size: optimizedFile.size,
          mime_type: optimizedFile.type,
          width: validation.metadata!.width,
          height: validation.metadata!.height,
          thumbnail_path: thumbUploadError ? null : `thumbnails/${thumbnailFileName}`,
          batch_id: batchId,
          file_hash: fileHash,
          processing_status: 'completed'
        })
        .select()
        .single();

      if (dbError) {
        // Nettoyer les fichiers uploadés en cas d'erreur DB
        await supabase.storage.from('gallery-images').remove([`photos/${uniqueFileName}`]);
        if (!thumbUploadError) {
          await supabase.storage.from('gallery-images').remove([`thumbnails/${thumbnailFileName}`]);
        }
        throw new Error(`Erreur base de données: ${dbError.message}`);
      }

      // Log du traitement réussi
      await this.logProcessing(photo.id, batchId, 'upload', 'success', 
        'Upload et traitement réussis', Date.now() - startTime, file.size, optimizedFile.size);

      onProgress?.({
        current: 6,
        total: 6,
        status: 'completed',
        message: 'Upload terminé avec succès !',
        fileName: file.name
      });

      return {
        success: true,
        photo,
        processingTime: Date.now() - startTime
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      
      // Log de l'erreur
      if (batchId) {
        await this.logProcessing(null, batchId, 'upload', 'error', errorMessage, Date.now() - startTime);
      }

      onProgress?.({
        current: 0,
        total: 6,
        status: 'error',
        message: `Erreur: ${errorMessage}`,
        fileName: file.name
      });

      return {
        success: false,
        error: errorMessage,
        processingTime: Date.now() - startTime
      };
    }
  }

  /**
   * Upload multiple images avec gestion de lot
   */
  static async uploadMultipleImages(
    files: File[],
    titles: string[],
    descriptions: string[] = [],
    onProgress?: (overall: ProcessingProgress, individual?: ProcessingProgress) => void
  ): Promise<{
    batchId: string;
    results: UploadResult[];
    summary: {
      total: number;
      successful: number;
      failed: number;
      totalProcessingTime: number;
    };
  }> {
    const startTime = Date.now();
    
    // Validation du lot
    const batchValidation = await ImageProcessor.validateBatch(files);
    if (batchValidation.invalid.length > 0) {
      throw new Error(`${batchValidation.invalid.length} fichier(s) invalide(s)`);
    }

    // Créer le lot
    const batchName = `Upload_${new Date().toISOString().split('T')[0]}_${Date.now()}`;
    const batchId = await this.createUploadBatch(batchName, files.length);

    const results: UploadResult[] = [];
    let successful = 0;
    let failed = 0;

    // Traiter chaque fichier
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const title = titles[i] || `Photo ${i + 1}`;
      const description = descriptions[i] || '';

      onProgress?.({
        current: i + 1,
        total: files.length,
        status: 'processing',
        message: `Traitement de ${file.name} (${i + 1}/${files.length})`,
        fileName: file.name
      });

      const result = await this.uploadImage(
        file,
        title,
        description,
        batchId,
        (individualProgress) => onProgress?.(
          {
            current: i + 1,
            total: files.length,
            status: 'processing',
            message: `${file.name}: ${individualProgress.message}`,
            fileName: file.name
          },
          individualProgress
        )
      );

      results.push(result);
      
      if (result.success) {
        successful++;
      } else {
        failed++;
      }

      // Mettre à jour le lot
      await this.updateBatchStatus(batchId, {
        processed_files: i + 1,
        successful_uploads: successful,
        failed_uploads: failed
      });
    }

    // Finaliser le lot
    const totalProcessingTime = Date.now() - startTime;
    await this.updateBatchStatus(batchId, {
      status: failed === 0 ? 'completed' : (successful === 0 ? 'failed' : 'completed'),
      completed_at: new Date().toISOString(),
      error_summary: failed > 0 ? `${failed} échec(s) sur ${files.length}` : undefined
    });

    onProgress?.({
      current: files.length,
      total: files.length,
      status: 'completed',
      message: `Lot terminé: ${successful} réussis, ${failed} échecs`
    });

    return {
      batchId,
      results,
      summary: {
        total: files.length,
        successful,
        failed,
        totalProcessingTime
      }
    };
  }

  /**
   * Supprime une photo
   */
  static async deletePhoto(photoId: string): Promise<boolean> {
    try {
      // Récupérer les infos de la photo
      const { data: photo, error: fetchError } = await supabase
        .from('gallery_photos')
        .select('file_path, thumbnail_path')
        .eq('id', photoId)
        .single();

      if (fetchError || !photo) {
        throw new Error('Photo non trouvée');
      }

      // Supprimer les fichiers du storage
      const filesToDelete = [photo.file_path];
      if (photo.thumbnail_path) {
        filesToDelete.push(photo.thumbnail_path);
      }

      const { error: storageError } = await supabase.storage
        .from('gallery-images')
        .remove(filesToDelete);

      if (storageError) {
        console.warn('Erreur suppression fichiers:', storageError.message);
      }

      // Supprimer l'entrée de la base
      const { error: dbError } = await supabase
        .from('gallery_photos')
        .delete()
        .eq('id', photoId);

      if (dbError) {
        throw new Error(`Erreur suppression DB: ${dbError.message}`);
      }

      return true;
    } catch (error) {
      console.error('Erreur suppression photo:', error);
      return false;
    }
  }

  /**
   * Met à jour la visibilité d'une photo
   */
  static async togglePhotoVisibility(photoId: string, isVisible: boolean): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('gallery_photos')
        .update({ is_visible: isVisible })
        .eq('id', photoId);

      if (error) {
        throw new Error(`Erreur mise à jour visibilité: ${error.message}`);
      }

      return true;
    } catch (error) {
      console.error('Erreur toggle visibilité:', error);
      return false;
    }
  }

  /**
   * Obtient l'URL publique d'une image
   */
  static getImageUrl(filePath: string): string {
    const { data } = supabase.storage
      .from('gallery-images')
      .getPublicUrl(filePath);
    
    return data.publicUrl;
  }

  /**
   * Log une opération de traitement
   */
  private static async logProcessing(
    photoId: string | null,
    batchId: string | undefined,
    operation: string,
    status: 'success' | 'error' | 'warning',
    message: string,
    processingTime?: number,
    fileSizeBefore?: number,
    fileSizeAfter?: number
  ): Promise<void> {
    try {
      await supabase
        .from('image_processing_logs')
        .insert({
          photo_id: photoId,
          batch_id: batchId,
          operation,
          status,
          message,
          processing_time_ms: processingTime,
          file_size_before: fileSizeBefore,
          file_size_after: fileSizeAfter
        });
    } catch (error) {
      console.warn('Erreur log processing:', error);
    }
  }

  /**
   * Récupère les statistiques de la galerie
   */
  static async getGalleryStats(): Promise<{
    totalPhotos: number;
    visiblePhotos: number;
    totalSize: number;
    recentUploads: number;
  }> {
    try {
      const { data: stats, error } = await supabase
        .from('gallery_photos')
        .select('is_visible, file_size, upload_date');

      if (error || !stats) {
        return { totalPhotos: 0, visiblePhotos: 0, totalSize: 0, recentUploads: 0 };
      }

      const totalPhotos = stats.length;
      const visiblePhotos = stats.filter(p => p.is_visible).length;
      const totalSize = stats.reduce((sum, p) => sum + p.file_size, 0);
      
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const recentUploads = stats.filter(p => 
        new Date(p.upload_date) > oneWeekAgo
      ).length;

      return { totalPhotos, visiblePhotos, totalSize, recentUploads };
    } catch (error) {
      console.error('Erreur récupération stats:', error);
      return { totalPhotos: 0, visiblePhotos: 0, totalSize: 0, recentUploads: 0 };
    }
  }
}