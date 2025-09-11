// Utilitaires pour le traitement et la validation des images

export interface ImageValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  metadata?: {
    width: number;
    height: number;
    size: number;
    type: string;
  };
}

export interface ProcessingProgress {
  current: number;
  total: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  message: string;
  fileName?: string;
}

export class ImageProcessor {
  private static readonly ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  private static readonly MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  private static readonly MIN_RESOLUTION = 300; // 300x300px minimum
  private static readonly MAX_RESOLUTION = 4096; // 4K maximum
  private static readonly THUMBNAIL_SIZE = 300;

  /**
   * Valide un fichier image selon les critères définis
   */
  static async validateImage(file: File): Promise<ImageValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Vérification du type MIME
    if (!this.ALLOWED_TYPES.includes(file.type)) {
      errors.push(`Format non supporté: ${file.type}. Formats acceptés: JPG, PNG, WebP, GIF`);
    }

    // Vérification de la taille
    if (file.size > this.MAX_FILE_SIZE) {
      errors.push(`Fichier trop volumineux: ${this.formatFileSize(file.size)}. Maximum: ${this.formatFileSize(this.MAX_FILE_SIZE)}`);
    }

    if (file.size < 1024) {
      warnings.push('Fichier très petit, vérifiez la qualité');
    }

    // Vérification des dimensions
    try {
      const dimensions = await this.getImageDimensions(file);
      
      if (dimensions.width < this.MIN_RESOLUTION || dimensions.height < this.MIN_RESOLUTION) {
        errors.push(`Résolution trop faible: ${dimensions.width}x${dimensions.height}px. Minimum: ${this.MIN_RESOLUTION}x${this.MIN_RESOLUTION}px`);
      }

      if (dimensions.width > this.MAX_RESOLUTION || dimensions.height > this.MAX_RESOLUTION) {
        warnings.push(`Résolution très élevée: ${dimensions.width}x${dimensions.height}px. Sera optimisée automatiquement.`);
      }

      return {
        isValid: errors.length === 0,
        errors,
        warnings,
        metadata: {
          width: dimensions.width,
          height: dimensions.height,
          size: file.size,
          type: file.type
        }
      };
    } catch (error) {
      errors.push('Impossible de lire les dimensions de l\'image');
      return { isValid: false, errors, warnings };
    }
  }

  /**
   * Obtient les dimensions d'une image
   */
  private static getImageDimensions(file: File): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Impossible de charger l\'image'));
      };

      img.src = url;
    });
  }

  /**
   * Optimise une image pour le web
   */
  static async optimizeImage(file: File, maxWidth = 1920, quality = 0.85): Promise<File> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      const url = URL.createObjectURL(file);

      img.onload = () => {
        // Calculer les nouvelles dimensions
        let { width, height } = img;
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        // Dessiner l'image redimensionnée
        ctx?.drawImage(img, 0, 0, width, height);

        // Convertir en blob optimisé
        canvas.toBlob(
          (blob) => {
            URL.revokeObjectURL(url);
            if (blob) {
              const optimizedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now()
              });
              resolve(optimizedFile);
            } else {
              reject(new Error('Échec de l\'optimisation'));
            }
          },
          'image/jpeg',
          quality
        );
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Impossible de charger l\'image pour optimisation'));
      };

      img.src = url;
    });
  }

  /**
   * Crée une miniature
   */
  static async createThumbnail(file: File, size = this.THUMBNAIL_SIZE): Promise<File> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      const url = URL.createObjectURL(file);

      img.onload = () => {
        // Calculer les dimensions pour un carré centré
        const { width, height } = img;
        const minDimension = Math.min(width, height);
        const scale = size / minDimension;

        canvas.width = size;
        canvas.height = size;

        // Centrer l'image dans le carré
        const scaledWidth = width * scale;
        const scaledHeight = height * scale;
        const offsetX = (size - scaledWidth) / 2;
        const offsetY = (size - scaledHeight) / 2;

        ctx?.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);

        canvas.toBlob(
          (blob) => {
            URL.revokeObjectURL(url);
            if (blob) {
              const thumbnailFile = new File([blob], `thumb_${file.name}`, {
                type: 'image/jpeg',
                lastModified: Date.now()
              });
              resolve(thumbnailFile);
            } else {
              reject(new Error('Échec de la création de miniature'));
            }
          },
          'image/jpeg',
          0.8
        );
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Impossible de charger l\'image pour miniature'));
      };

      img.src = url;
    });
  }

  /**
   * Génère un hash pour détecter les doublons
   */
  static async generateFileHash(file: File): Promise<string> {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Génère un nom de fichier unique
   */
  static generateUniqueFileName(originalName: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const extension = originalName.split('.').pop()?.toLowerCase() || 'jpg';
    const baseName = originalName.split('.')[0].replace(/[^a-zA-Z0-9]/g, '_');
    
    return `${baseName}_${timestamp}_${random}.${extension}`;
  }

  /**
   * Formate la taille de fichier
   */
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Valide un lot de fichiers
   */
  static async validateBatch(files: File[]): Promise<{
    valid: File[];
    invalid: { file: File; errors: string[] }[];
    warnings: { file: File; warnings: string[] }[];
    totalSize: number;
  }> {
    const valid: File[] = [];
    const invalid: { file: File; errors: string[] }[] = [];
    const warnings: { file: File; warnings: string[] }[] = [];
    let totalSize = 0;

    for (const file of files) {
      const validation = await this.validateImage(file);
      
      if (validation.isValid) {
        valid.push(file);
        totalSize += file.size;
      } else {
        invalid.push({ file, errors: validation.errors });
      }

      if (validation.warnings.length > 0) {
        warnings.push({ file, warnings: validation.warnings });
      }
    }

    return { valid, invalid, warnings, totalSize };
  }
}