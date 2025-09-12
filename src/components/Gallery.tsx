import React, { useState } from 'react';
import { useEffect, useCallback } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Upload, Plus, Eye, EyeOff, Trash2, AlertCircle, CheckCircle, Clock, BarChart3, Calendar, MapPin, Wrench } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { GalleryService, Photo } from '../lib/galleryService';
import { ImageProcessor, ProcessingProgress } from '../lib/imageProcessor';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showDeleteMode, setShowDeleteMode] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState<ProcessingProgress | null>(null);
  const [batchUploadProgress, setBatchUploadProgress] = useState<ProcessingProgress | null>(null);
  const [showStats, setShowStats] = useState(false);
  const [stats, setStats] = useState({
    totalPhotos: 0,
    visiblePhotos: 0,
    totalSize: 0,
    recentUploads: 0
  });
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    description: '',
    location: '',
    date: new Date().toISOString().split('T')[0], // Date par défaut aujourd'hui
    file: null as File | null,
    multipleFiles: [] as File[]
  });

  // Vérifier l'état d'authentification au chargement
  useEffect(() => {
    checkAuthStatus();
    
    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAdmin(!!session?.user);
      if (event === 'SIGNED_OUT') {
        setShowAddForm(false);
        setShowDeleteMode(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAdmin(!!session?.user);
    } catch (error) {
      console.error('Erreur vérification auth:', error);
      setIsAdmin(false);
    }
  };

  // Charger les photos depuis Supabase
  useEffect(() => {
    loadPhotos();
    loadStats();
  }, []);

  const loadPhotos = useCallback(async () => {
    try {
      setLoading(true);
      const photosData = isAdmin 
        ? await GalleryService.getAllPhotos()
        : await GalleryService.getVisiblePhotos();
      
      // Grouper les photos par batch_id ou par titre similaire pour créer des "travaux"
      const groupedPhotos = groupPhotosByWork(photosData);
      setPhotos(groupedPhotos);
    } catch (error) {
      console.error('Erreur chargement photos:', error);
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  // Grouper les photos par travaux (même batch_id ou titre similaire)
  const groupPhotosByWork = (photos: Photo[]) => {
    const grouped: { [key: string]: Photo[] } = {};
    
    photos.forEach(photo => {
      // Utiliser batch_id comme clé de groupement, ou le titre si pas de batch
      const groupKey = photo.batch_id || photo.title;
      
      if (!grouped[groupKey]) {
        grouped[groupKey] = [];
      }
      grouped[groupKey].push(photo);
    });
    
    // Convertir en array plate avec une photo "principale" par groupe
    const result: Photo[] = [];
    Object.values(grouped).forEach(group => {
      // Trier par date dans le groupe
      group.sort((a, b) => new Date(b.upload_date).getTime() - new Date(a.upload_date).getTime());
      
      // Ajouter la photo principale avec les autres photos du groupe
      const mainPhoto = { ...group[0], relatedPhotos: group };
      result.push(mainPhoto);
    });
    
    return result.sort((a, b) => new Date(b.upload_date).getTime() - new Date(a.upload_date).getTime());
  };

  const loadStats = useCallback(async () => {
    try {
      const statsData = await GalleryService.getGalleryStats();
      setStats(statsData);
    } catch (error) {
      console.error('Erreur chargement stats:', error);
    }
  }, []);

  // Recharger les photos quand le mode admin change
  useEffect(() => {
    if (isAdmin) {
      loadPhotos();
    }
  }, [isAdmin, loadPhotos]);

  // Gestion de l'accès admin via le footer
  useEffect(() => {
    // Nettoyer le hash au montage du composant
    if (window.location.hash === '#gallery-admin') {
      setShowAdminLogin(true);
      window.history.replaceState(null, '', window.location.pathname);
    }

    // Écouter l'événement personnalisé du footer
    const handleOpenAdminLogin = () => {
      setShowAdminLogin(true);
    };

    window.addEventListener('openAdminLogin', handleOpenAdminLogin);

    return () => {
      window.removeEventListener('openAdminLogin', handleOpenAdminLogin);
    };
  }, []);

  const openModal = (imageId: number) => {
    setSelectedImage(Number(imageId));
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const currentIndex = photos.findIndex(photo => Number(photo.id) === selectedImage);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
    } else {
      newIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(Number(photos[newIndex].id));
  };

  const selectedPhoto = selectedImage 
    ? photos.find(photo => Number(photo.id) === selectedImage)
    : null;

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginForm.email,
        password: loginForm.password
      });

      if (error) {
        setLoginError('Email ou mot de passe incorrect');
        return;
      }

      if (data.user) {
        setIsAdmin(true);
        setShowAdminLogin(false);
        setShowAddForm(true);
        setLoginForm({ email: '', password: '' });
      }
    } catch (error) {
      setLoginError('Erreur de connexion');
      console.error('Erreur login:', error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleAdminLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsAdmin(false);
      setShowAdminLogin(false);
      setShowAddForm(false);
      setShowDeleteMode(false);
    } catch (error) {
      console.error('Erreur déconnexion:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 1) {
      // Upload simple
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewPhoto({
          ...newPhoto,
          file: file,
          image: e.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    } else if (files.length > 1) {
      // Upload multiple
      // Stocker les fichiers multiples pour l'upload
      setNewPhoto({
        ...newPhoto,
        file: null,
        image: '',
        multipleFiles: files
      });
    }
  };

  const handleAddPhoto = async () => {
    // Validation des champs requis
    if (!newPhoto.title) {
      alert('Veuillez remplir le titre du travail');
      return;
    }

    if (!newPhoto.multipleFiles?.length && !newPhoto.file) {
      alert('Veuillez sélectionner au moins une image');
      return;
    }

    // Vérifier s'il y a des fichiers multiples
    if (newPhoto.multipleFiles && newPhoto.multipleFiles.length > 0) {
      // Upload multiple
      try {
        setUploadProgress({
          current: 0,
          total: newPhoto.multipleFiles.length,
          status: 'processing',
          message: 'Préparation de l\'upload multiple...'
        });

        const titles = newPhoto.multipleFiles.map((file, index) => 
          `${newPhoto.title} - Photo ${index + 1}`
        );
        
        const result = await GalleryService.uploadMultipleImages(
          newPhoto.multipleFiles,
          titles,
          Array(newPhoto.multipleFiles.length).fill(newPhoto.description),
          (overall, individual) => {
            setBatchUploadProgress(overall);
            if (individual) {
              setUploadProgress(individual);
            }
          }
        );

        alert(`Upload terminé: ${result.summary.successful} réussis, ${result.summary.failed} échecs`);
        await loadPhotos();
        await loadStats();
        
        // Réinitialiser les états
        setNewPhoto({ title: '', description: '', location: '', date: new Date().toISOString().split('T')[0], file: null, multipleFiles: [] });
        setShowAddForm(false);
      } catch (error) {
        console.error('Erreur upload multiple:', error);
        alert(`Erreur upload multiple: ${error}`);
      } finally {
        setUploadProgress(null);
        setBatchUploadProgress(null);
      }
      return;
    }

    // Upload simple

    try {
      const result = await GalleryService.uploadImage(
        newPhoto.file,
        newPhoto.title,
        newPhoto.description,
        undefined,
        setUploadProgress
      );

      if (result.success) {
        alert('Photo ajoutée avec succès !');
        await loadPhotos();
        await loadStats();
        
        // Réinitialiser les états
        setNewPhoto({ title: '', description: '', location: '', date: new Date().toISOString().split('T')[0], file: null, multipleFiles: [] });
        setShowAddForm(false);
      } else {
        console.error('Erreur upload:', result.error);
        alert(`Erreur: ${result.error}`);
      }
    } catch (error) {
      console.error('Erreur lors de l\'upload:', error);
      alert(`Erreur lors de l'upload: ${error}`);
    } finally {
      setUploadProgress(null);
    }
  };


  const handleDeletePhoto = async (photoId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette photo définitivement ?')) {
      return;
    }

    try {
      const success = await GalleryService.deletePhoto(photoId);
      if (success) {
        alert('Photo supprimée avec succès !');
        await loadPhotos();
        await loadStats();
      } else {
        alert('Erreur lors de la suppression');
      }
    } catch (error) {
      alert(`Erreur: ${error}`);
    }
  };

  const handleToggleVisibility = async (photoId: string, currentVisibility: boolean) => {
    try {
      const success = await GalleryService.togglePhotoVisibility(photoId, !currentVisibility);
      if (success) {
        await loadPhotos();
        await loadStats();
      } else {
        alert('Erreur lors de la modification');
      }
    } catch (error) {
      alert(`Erreur: ${error}`);
    }
  };

  const toggleDeleteMode = () => {
    setShowDeleteMode(!showDeleteMode);
    if (showAddForm) {
      setShowAddForm(false);
    }
  };

  return (
    <section className="section py-8 lg:py-12 min-h-screen bg-white" data-gallery-page>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 pt-16">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl">
            <Camera className="w-8 h-8" />
          </div>
          
          {/* Point d'accès admin discret */}
          <h2 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4 sm:mb-6 tracking-tight uppercase font-futuristic">
            Galerie
          </h2>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 font-medium font-tech mb-4">
            Nos interventions en images
          </p>
          <p className="text-sm sm:text-base text-gray-600 font-tech">
            Découvrez notre travail professionnel à travers nos réalisations
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Statistiques admin */}
        {isAdmin && (
          <div className="mb-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 font-futuristic flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-orange-500" />
                Statistiques de la galerie
              </h3>
              <button
                onClick={handleAdminLogout}
                className="px-3 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors text-sm font-medium"
              >
                Déconnexion
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-2xl font-bold text-orange-600">{stats.totalPhotos}</div>
                <div className="text-sm text-gray-600">Total photos</div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-2xl font-bold text-green-600">{stats.visiblePhotos}</div>
                <div className="text-sm text-gray-600">Visibles</div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-2xl font-bold text-blue-600">{ImageProcessor.formatFileSize(stats.totalSize)}</div>
                <div className="text-sm text-gray-600">Taille totale</div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-2xl font-bold text-purple-600">{stats.recentUploads}</div>
                <div className="text-sm text-gray-600">Cette semaine</div>
              </div>
            </div>
          </div>
        )}

        {/* Indicateurs de progression */}
        {uploadProgress && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-900">Upload en cours...</span>
            </div>
            <div className="text-sm text-blue-700 mb-2">{uploadProgress.message}</div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(uploadProgress.current / uploadProgress.total) * 100}%` }}
              />
            </div>
          </div>
        )}

        {batchUploadProgress && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Upload className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-900">Upload multiple en cours...</span>
            </div>
            <div className="text-sm text-green-700 mb-2">{batchUploadProgress.message}</div>
            <div className="w-full bg-green-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(batchUploadProgress.current / batchUploadProgress.total) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Zone d'ajout pour le collègue */}

        {/* Chargement */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-500 font-tech">Chargement des photos...</p>
          </div>
        ) : (
          /* Grille de photos */
          <div className="space-y-8 sm:space-y-12">
            {photos.map((photo) => (
              <article
                key={photo.id}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden border transition-all duration-300 hover:shadow-2xl ${
                  !photo.is_visible && isAdmin ? 'opacity-50' : ''
                } ${showDeleteMode ? 'border-red-300' : 'border-gray-200 hover:border-orange-500/30'}`}
              >
                {/* Header du travail */}
                <div className="p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 font-futuristic mb-2">
                        {photo.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-orange-500" />
                          <span>{new Date(photo.upload_date).toLocaleDateString('fr-FR')}</span>
                        </div>
                        {photo.relatedPhotos && (
                          <div className="flex items-center gap-1">
                            <Camera className="w-4 h-4 text-orange-500" />
                            <span>{photo.relatedPhotos.length} photo{photo.relatedPhotos.length > 1 ? 's' : ''}</span>
                          </div>
                        )}
                      </div>
                      {photo.description && (
                        <p className="text-gray-700 font-tech leading-relaxed">
                          {photo.description}
                        </p>
                      )}
                    </div>
                    
                    {/* Contrôles admin */}
                    {isAdmin && (
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleVisibility(photo.id, photo.is_visible);
                          }}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg ${
                            photo.is_visible 
                              ? 'bg-green-500 hover:bg-green-600 text-white' 
                              : 'bg-gray-500 hover:bg-gray-600 text-white'
                          }`}
                          title={photo.is_visible ? 'Masquer' : 'Afficher'}
                        >
                          {photo.is_visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (photo.relatedPhotos) {
                              // Supprimer toutes les photos du groupe
                              if (confirm(`Supprimer ce travail et ses ${photo.relatedPhotos.length} photos ?`)) {
                                photo.relatedPhotos.forEach(p => handleDeletePhoto(p.id));
                              }
                            } else {
                              handleDeletePhoto(photo.id);
                            }
                          }}
                          className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg"
                          title="Supprimer ce travail"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Galerie de photos du travail */}
                <div className="p-4 sm:p-6">
                  {photo.relatedPhotos && photo.relatedPhotos.length > 0 ? (
                    <div className={`grid gap-3 sm:gap-4 ${
                      photo.relatedPhotos.length === 1 ? 'grid-cols-1' :
                      photo.relatedPhotos.length === 2 ? 'grid-cols-2' :
                      photo.relatedPhotos.length === 3 ? 'grid-cols-3' :
                      photo.relatedPhotos.length === 4 ? 'grid-cols-2' :
                      'grid-cols-2 sm:grid-cols-3'
                    }`}>
                      {photo.relatedPhotos.map((relatedPhoto, index) => (
                        <div
                          key={relatedPhoto.id}
                          className={`group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover-scale ${
                            photo.relatedPhotos!.length === 1 ? 'aspect-video' :
                            photo.relatedPhotos!.length === 4 && index >= 2 ? 'col-span-1' :
                            'aspect-square'
                          }`}
                          onClick={() => openModal(Number(relatedPhoto.id))}
                        >
                          <img
                            src={GalleryService.getImageUrl(relatedPhoto.thumbnail_path || relatedPhoto.file_path)}
                            alt={`${photo.title} - Photo ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            loading="lazy"
                          />
                          
                          {/* Overlay avec numéro */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                            <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <span className="text-sm font-bold text-gray-700">{index + 1}</span>
                            </div>
                          </div>
                          
                          {/* Indicateur admin */}
                          {isAdmin && !relatedPhoto.is_visible && (
                            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                              Masquée
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Photo unique */
                    <div 
                      className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover-scale aspect-video"
                      onClick={() => openModal(Number(photo.id))}
                    >
                      <img
                        src={GalleryService.getImageUrl(photo.thumbnail_path || photo.file_path)}
                        alt={photo.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                      
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Camera className="w-6 h-6 text-gray-700" />
                        </div>
                      </div>
                      
                      {isAdmin && !photo.is_visible && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                          Masquée
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Message si aucune photo */}
        {photos.length === 0 && !loading && (
          <div className="text-center py-12">
            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 font-tech">Aucun travail dans la galerie</p>
          </div>
        )}
      </div>

      {/* Modal de connexion admin */}
      {showAdminLogin && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 font-futuristic">Connexion Admin</h3>
              <button
                onClick={() => {
                  setShowAdminLogin(false);
                  setLoginForm({ email: '', password: '' });
                  setLoginError('');
                }}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  placeholder="votre-email@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                  disabled={isLoggingIn}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  placeholder="Entrez votre mot de passe"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                  disabled={isLoggingIn}
                />
              </div>
              
              {loginError && (
                <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
                  {loginError}
                </div>
              )}
              
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowAdminLogin(false);
                    setLoginForm({ email: '', password: '' });
                    setLoginError('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={isLoggingIn}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? 'Connexion...' : 'Se connecter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal d'ajout de travail */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 font-futuristic">Ajouter un travail</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Titre du travail *</label>
                <input
                  type="text"
                  value={newPhoto.title}
                  onChange={(e) => setNewPhoto({...newPhoto, title: e.target.value})}
                  placeholder="Ex: Vidange complète Peugeot 308"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description du travail</label>
                <textarea
                  value={newPhoto.description}
                  onChange={(e) => setNewPhoto({...newPhoto, description: e.target.value})}
                  placeholder="Décrivez le travail effectué, les pièces changées, les problèmes rencontrés..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={newPhoto.date}
                    onChange={(e) => setNewPhoto({...newPhoto, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lieu</label>
                  <input
                    type="text"
                    value={newPhoto.location}
                    onChange={(e) => setNewPhoto({...newPhoto, location: e.target.value})}
                    placeholder="Ex: Le Puy-en-Velay"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Photos du travail *</label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  multiple
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Sélectionnez une ou plusieurs photos (JPG, PNG, WebP, GIF - 5MB max chacune)
                </p>
                
                {newPhoto.multipleFiles && newPhoto.multipleFiles.length > 0 && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-700 font-medium mb-2">
                      {newPhoto.multipleFiles.length} photo{newPhoto.multipleFiles.length > 1 ? 's' : ''} sélectionnée{newPhoto.multipleFiles.length > 1 ? 's' : ''}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {newPhoto.multipleFiles.slice(0, 4).map((file, index) => (
                        <div key={index} className="text-xs bg-white px-2 py-1 rounded border truncate">
                          {file.name}
                        </div>
                      ))}
                      {newPhoto.multipleFiles.length > 4 && (
                        <div className="text-xs text-gray-500 col-span-2">
                          +{newPhoto.multipleFiles.length - 4} autres photos...
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleAddPhoto}
                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
                disabled={uploadProgress !== null || batchUploadProgress !== null || !newPhoto.title}
              >
                {uploadProgress || batchUploadProgress ? 'Upload en cours...' : 
                 newPhoto.multipleFiles && newPhoto.multipleFiles.length > 0 ? 
                 `Ajouter le travail (${newPhoto.multipleFiles.length} photos)` : 'Ajouter le travail'}
              </button>
            </div>
            
            {/* Boutons admin supplémentaires */}
            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={toggleDeleteMode}
                className={`flex-1 px-3 py-2 rounded-lg transition-colors text-sm ${
                  showDeleteMode 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}
              >
                {showDeleteMode ? 'Arrêter suppression' : 'Mode suppression'}
              </button>
              
              <button
                onClick={() => setShowStats(!showStats)}
                className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg transition-colors text-sm"
              >
                {showStats ? 'Masquer stats' : 'Voir stats'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Indicateur mode suppression */}
      {showDeleteMode && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-40">
          <div className="flex items-center gap-2">
            <X className="w-4 h-4" />
            <span className="text-sm font-medium">Mode suppression activé - Cliquez sur les travaux à supprimer</span>
          </div>
        </div>
      )}

      {/* Modal lightbox */}
      {selectedImage && selectedPhoto && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full w-full">
            {/* Bouton fermer */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation précédent */}
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Navigation suivant */}
            <button
              onClick={() => navigateImage('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Contenu modal */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              {/* Image */}
              <div className="aspect-video">
                <img
                  src={GalleryService.getImageUrl(selectedPhoto.file_path)}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Informations */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 font-futuristic mb-2">
                  {selectedPhoto.title}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-gray-600 font-tech">
                    {new Date(selectedPhoto.upload_date).toLocaleDateString('fr-FR')}
                  </p>
                  {isAdmin && (
                    <div className="text-sm text-gray-500 font-tech">
                      {ImageProcessor.formatFileSize(selectedPhoto.file_size)} • {selectedPhoto.width}×{selectedPhoto.height}px
                    </div>
                  )}
                </div>
                {selectedPhoto.description && (
                  <p className="text-gray-600 font-tech mt-2">
                    {selectedPhoto.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;