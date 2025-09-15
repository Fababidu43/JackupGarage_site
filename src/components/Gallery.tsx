import React, { useState } from 'react';
import { useEffect, useCallback } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Upload, Plus, Eye, EyeOff, Trash2, AlertCircle, CheckCircle, Clock, BarChart3, Car, Calendar, MapPin, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { GalleryService, Photo } from '../lib/galleryService';
import { ImageProcessor, ProcessingProgress } from '../lib/imageProcessor';

interface WorkProject {
  id: string;
  title: string;
  description?: string;
  car_info?: string;
  location?: string;
  work_date: string;
  photos: Photo[];
  is_visible: boolean;
  created_at: string;
}

const Gallery = () => {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
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
  const [workProjects, setWorkProjects] = useState<WorkProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState<ProcessingProgress | null>(null);
  const [batchUploadProgress, setBatchUploadProgress] = useState<ProcessingProgress | null>(null);
  const [selectedProject, setSelectedProject] = useState<WorkProject | null>(null);
  const [stats, setStats] = useState({
    totalPhotos: 0,
    visiblePhotos: 0,
    totalSize: 0,
    recentUploads: 0
  });
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    car_info: '',
    location: '',
    work_date: new Date().toISOString().split('T')[0],
    photos: [] as File[]
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

  // Charger les projets depuis Supabase
  useEffect(() => {
    loadWorkProjects();
    loadStats();
  }, []);

  const loadWorkProjects = useCallback(async () => {
    try {
      setLoading(true);
      const photosData = isAdmin 
        ? await GalleryService.getAllPhotos()
        : await GalleryService.getVisiblePhotos();
      
      // Grouper les photos par batch_id pour créer les projets
      const projectsMap = new Map<string, WorkProject>();
      
      photosData.forEach(photo => {
        const batchId = photo.batch_id || 'single_' + photo.id;
        
        if (!projectsMap.has(batchId)) {
          projectsMap.set(batchId, {
            id: batchId,
            title: photo.title,
            description: photo.description || '',
            car_info: '', // À implémenter dans la DB
            location: '', // À implémenter dans la DB
            work_date: photo.upload_date,
            photos: [],
            is_visible: photo.is_visible,
            created_at: photo.upload_date
          });
        }
        
        const project = projectsMap.get(batchId)!;
        project.photos.push(photo);
        
        // Garder la visibilité la plus restrictive
        if (!photo.is_visible) {
          project.is_visible = false;
        }
      });
      
      // Convertir en array et trier par date
      const projects = Array.from(projectsMap.values()).sort((a, b) => 
        new Date(b.work_date).getTime() - new Date(a.work_date).getTime()
      );
      
      setWorkProjects(projects);
    } catch (error) {
      console.error('Erreur chargement projets:', error);
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  const loadStats = useCallback(async () => {
    try {
      const statsData = await GalleryService.getGalleryStats();
      setStats(statsData);
    } catch (error) {
      console.error('Erreur chargement stats:', error);
    }
  }, []);

  // Recharger les projets quand le mode admin change
  useEffect(() => {
    if (isAdmin) {
      loadWorkProjects();
    }
  }, [isAdmin, loadWorkProjects]);

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

  const toggleProjectDetails = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
  };

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
    setNewProject({
      ...newProject,
      photos: files
    });
  };

  const handleAddProject = async () => {
    // Validation des champs requis
    if (!newProject.title || newProject.photos.length === 0) {
      alert('Veuillez remplir le titre et sélectionner au moins une image');
      return;
    }

    try {
      setUploadProgress({
        current: 0,
        total: newProject.photos.length,
        status: 'processing',
        message: 'Préparation de l\'upload...'
      });

      // Créer les titres pour chaque photo (même titre pour toutes)
      const titles = newProject.photos.map(() => newProject.title);
      const descriptions = newProject.photos.map(() => newProject.description);
      
      const result = await GalleryService.uploadMultipleImages(
        newProject.photos,
        titles,
        descriptions,
        (overall, individual) => {
          setBatchUploadProgress(overall);
          if (individual) {
            setUploadProgress(individual);
          }
        }
      );

      alert(`Projet ajouté avec succès: ${result.summary.successful} photos uploadées`);
      await loadWorkProjects();
      await loadStats();
      
      // Réinitialiser le formulaire
      setNewProject({
        title: '',
        description: '',
        car_info: '',
        location: '',
        work_date: new Date().toISOString().split('T')[0],
        photos: []
      });
      setShowAddForm(false);
    } catch (error) {
      console.error('Erreur upload projet:', error);
      alert(`Erreur upload: ${error}`);
    } finally {
      setUploadProgress(null);
      setBatchUploadProgress(null);
    }
  };

  const handleDeleteProject = async (project: WorkProject) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer le projet "${project.title}" avec toutes ses photos ?`)) {
      return;
    }

    try {
      // Supprimer toutes les photos du projet
      for (const photo of project.photos) {
        await GalleryService.deletePhoto(photo.id);
      }
      
      alert('Projet supprimé avec succès !');
      await loadWorkProjects();
      await loadStats();
    } catch (error) {
      alert(`Erreur: ${error}`);
    }
  };

  const handleToggleProjectVisibility = async (project: WorkProject) => {
    try {
      const newVisibility = !project.is_visible;
      
      // Mettre à jour la visibilité de toutes les photos du projet
      for (const photo of project.photos) {
        await GalleryService.togglePhotoVisibility(photo.id, newVisibility);
      }
      
      await loadWorkProjects();
      await loadStats();
    } catch (error) {
      alert(`Erreur: ${error}`);
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
          
          <h2 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4 sm:mb-6 tracking-tight uppercase font-futuristic">
            Nos Travaux
          </h2>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 font-medium font-tech mb-4">
            Découvrez nos interventions récentes
          </p>
          <p className="text-sm sm:text-base text-gray-600 font-tech">
            Chaque projet avec photos et détails complets
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Statistiques admin */}
        {isAdmin && (
          <div className="mb-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 font-futuristic flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-orange-500" />
                Statistiques
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
                <div className="text-2xl font-bold text-orange-600">{workProjects.length}</div>
                <div className="text-sm text-gray-600">Projets</div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-2xl font-bold text-green-600">{stats.totalPhotos}</div>
                <div className="text-sm text-gray-600">Photos</div>
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

        {/* Bouton d'ajout admin */}
        {isAdmin && (
          <div className="mb-8 text-center">
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-tech font-bold uppercase tracking-wide hover-scale shadow-lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Ajouter un projet
            </button>
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
              <span className="font-medium text-green-900">Projet en cours d'ajout...</span>
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

        {/* Chargement */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-500 font-tech">Chargement des projets...</p>
          </div>
        ) : (
          /* Grille des projets */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {workProjects.map((project) => (
              <div
                key={project.id}
                className={`group bg-white rounded-xl shadow-lg overflow-hidden border transition-all duration-300 hover:shadow-xl hover-scale cursor-pointer relative ${
                  showDeleteMode 
                    ? 'border-red-300 hover:border-red-500' 
                    : `border-gray-200 hover:border-orange-500/50 ${!project.is_visible && isAdmin ? 'opacity-50' : ''}`
                }`}
                onClick={() => toggleProjectDetails(project.id)}
              >
                {/* Contrôles admin */}
                {isAdmin && (
                  <div className="absolute top-2 right-2 z-10 flex gap-1">
                    {/* Visibilité */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleProjectVisibility(project);
                      }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg ${
                        project.is_visible 
                          ? 'bg-green-500 hover:bg-green-600 text-white' 
                          : 'bg-gray-500 hover:bg-gray-600 text-white'
                      }`}
                      title={project.is_visible ? 'Masquer' : 'Afficher'}
                    >
                      {project.is_visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    
                    {/* Suppression */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProject(project);
                      }}
                      className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg"
                      title="Supprimer le projet"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
                
                {/* Image miniature (première photo) */}
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={GalleryService.getImageUrl(project.photos[0]?.thumbnail_path || project.photos[0]?.file_path)}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Badge nombre de photos */}
                  {project.photos.length > 1 && (
                    <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                      {project.photos.length} photos
                    </div>
                  )}
                  
                  {/* Overlay avec icône */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Camera className="w-6 h-6 text-gray-700" />
                    </div>
                  </div>
                  
                  {/* Indicateur de statut pour admin */}
                  {isAdmin && !project.is_visible && (
                    <div className="absolute bottom-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Masqué
                    </div>
                  )}
                </div>
                
                {/* Informations du projet */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 font-futuristic mb-2 line-clamp-2">
                    {project.title}
                  </h3>
                  
                  <div className="flex items-center text-sm text-gray-500 font-tech mb-2">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(project.work_date).toLocaleDateString('fr-FR')}
                  </div>
                  
                  {project.description && (
                    <p className="text-sm text-gray-600 font-tech line-clamp-2 mb-2">
                      {project.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{project.photos.length} photo{project.photos.length > 1 ? 's' : ''}</span>
                    {isAdmin && (
                      <span>{ImageProcessor.formatFileSize(project.photos.reduce((sum, p) => sum + p.file_size, 0))}</span>
                    )}
                  </div>
                </div>

                {/* Détails du projet (affichés en dessous quand expanded) */}
                {expandedProject === project.id && (
                  <div className="mt-4 bg-gray-50 rounded-xl p-6 border-l-4 border-orange-500 shadow-inner">
                    {/* Header du projet étendu */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-gray-900 font-futuristic">
                          {project.title}
                        </h3>
                        <button
                          onClick={() => setExpandedProject(null)}
                          className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(project.work_date).toLocaleDateString('fr-FR')}
                        </div>
                        
                        {project.car_info && (
                          <div className="flex items-center gap-1">
                            <Car className="w-4 h-4" />
                            {project.car_info}
                          </div>
                        )}
                        
                        {project.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {project.location}
                          </div>
                        )}
                        
                        <div className="flex items-center gap-1">
                          <Camera className="w-4 h-4" />
                          {project.photos.length} photo{project.photos.length > 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Message si aucun projet */}
        {workProjects.length === 0 && !loading && (
          <div className="text-center py-12">
            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 font-tech">Aucun projet dans la galerie</p>
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

      {/* Modal d'ajout de projet */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 font-futuristic">Ajouter un projet</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Titre du projet *</label>
                <input
                  type="text"
                  value={newProject.title}
                  onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                  placeholder="Ex: Vidange complète Peugeot 308"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description du travail</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  placeholder="Décrivez les travaux effectués, les pièces changées, etc."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Véhicule</label>
                  <input
                    type="text"
                    value={newProject.car_info}
                    onChange={(e) => setNewProject({...newProject, car_info: e.target.value})}
                    placeholder="Ex: Peugeot 308 HDI 2015"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lieu</label>
                  <input
                    type="text"
                    value={newProject.location}
                    onChange={(e) => setNewProject({...newProject, location: e.target.value})}
                    placeholder="Ex: Le Puy-en-Velay"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date du travail</label>
                <input
                  type="date"
                  value={newProject.work_date}
                  onChange={(e) => setNewProject({...newProject, work_date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Photos *</label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  multiple
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Sélectionnez une ou plusieurs photos. La première sera utilisée comme miniature.
                </p>
                {newProject.photos.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-green-600 font-medium">
                      {newProject.photos.length} photo{newProject.photos.length > 1 ? 's' : ''} sélectionnée{newProject.photos.length > 1 ? 's' : ''}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {newProject.photos.slice(0, 3).map((file, index) => (
                        <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {file.name}
                        </span>
                      ))}
                      {newProject.photos.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{newProject.photos.length - 3} autres...
                        </span>
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
                onClick={handleAddProject}
                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
                disabled={uploadProgress !== null || batchUploadProgress !== null}
              >
                {uploadProgress || batchUploadProgress ? 'Upload en cours...' : 'Ajouter le projet'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal détails du projet */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl max-h-full w-full bg-white rounded-2xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <button
                  onClick={closeProjectDetails}
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="font-medium">Retour</span>
                </button>
                
                <button
                  onClick={closeProjectDetails}
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mt-4">
                <h2 className="text-2xl sm:text-3xl font-bold font-futuristic mb-2">
                  {selectedProject.title}
                </h2>
                
                <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(selectedProject.work_date).toLocaleDateString('fr-FR')}
                  </div>
                  
                  {selectedProject.car_info && (
                    <div className="flex items-center gap-1">
                      <Car className="w-4 h-4" />
                      {selectedProject.car_info}
                    </div>
                  )}
                  
                  {selectedProject.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {selectedProject.location}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-1">
                    <Camera className="w-4 h-4" />
                    {selectedProject.photos.length} photo{selectedProject.photos.length > 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;