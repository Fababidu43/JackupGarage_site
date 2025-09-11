import React, { useState, useEffect } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Upload, Plus, Trash2, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Photo {
  id: string;
  title: string;
  image_url: string;
  date_intervention: string;
  display_order: number;
  is_visible: boolean;
  created_at: string;
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    date_intervention: '',
    file: null as File | null
  });

  // Charger les photos depuis Supabase
  const loadPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_photos')
        .select('*')
        .eq('is_visible', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setPhotos(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des photos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Charger toutes les photos (admin)
  const loadAllPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_photos')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setPhotos(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des photos:', error);
    }
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  // Connexion admin simple
  const handleAdminLogin = () => {
    if (adminPassword === '43BENJI43') {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminPassword('');
      loadAllPhotos(); // Charger toutes les photos y compris cachées
    } else {
      alert('Mot de passe incorrect');
      setAdminPassword('');
    }
  };

  // Upload d'une nouvelle photo
  const handlePhotoUpload = async () => {
    if (!newPhoto.file || !newPhoto.title || !newPhoto.date_intervention) {
      alert('Veuillez remplir tous les champs et sélectionner une photo');
      return;
    }

    setUploading(true);

    try {
      // 1. Upload du fichier vers Supabase Storage
      const fileExt = newPhoto.file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('gallery-photos')
        .upload(fileName, newPhoto.file);

      if (uploadError) throw uploadError;

      // 2. Obtenir l'URL publique
      const { data: { publicUrl } } = supabase.storage
        .from('gallery-photos')
        .getPublicUrl(fileName);

      // 3. Ajouter l'entrée en base de données
      const { error: dbError } = await supabase
        .from('gallery_photos')
        .insert({
          title: newPhoto.title,
          image_url: publicUrl,
          date_intervention: newPhoto.date_intervention,
          display_order: photos.length + 1
        });

      if (dbError) throw dbError;

      // 4. Recharger les photos
      await loadAllPhotos();
      
      // 5. Reset du formulaire
      setNewPhoto({ title: '', date_intervention: '', file: null });
      setShowAddForm(false);
      
      alert('Photo ajoutée avec succès !');
    } catch (error) {
      console.error('Erreur lors de l\'upload:', error);
      alert('Erreur lors de l\'ajout de la photo');
    } finally {
      setUploading(false);
    }
  };

  // Supprimer une photo
  const handleDeletePhoto = async (photo: Photo) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${photo.title}" ?`)) return;

    try {
      // 1. Supprimer de la base de données
      const { error: dbError } = await supabase
        .from('gallery_photos')
        .delete()
        .eq('id', photo.id);

      if (dbError) throw dbError;

      // 2. Supprimer le fichier du storage (si c'est une URL Supabase)
      if (photo.image_url.includes('supabase')) {
        const fileName = photo.image_url.split('/').pop();
        if (fileName) {
          await supabase.storage
            .from('gallery-photos')
            .remove([fileName]);
        }
      }

      // 3. Recharger les photos
      await loadAllPhotos();
      alert('Photo supprimée avec succès !');
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Erreur lors de la suppression');
    }
  };

  // Basculer la visibilité d'une photo
  const togglePhotoVisibility = async (photo: Photo) => {
    try {
      const { error } = await supabase
        .from('gallery_photos')
        .update({ is_visible: !photo.is_visible })
        .eq('id', photo.id);

      if (error) throw error;
      await loadAllPhotos();
    } catch (error) {
      console.error('Erreur lors du changement de visibilité:', error);
    }
  };

  const openModal = (photoId: string) => {
    setSelectedImage(photoId);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    
    const visiblePhotos = photos.filter(p => p.is_visible || isAdmin);
    const currentIndex = visiblePhotos.findIndex(photo => photo.id === selectedImage);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : visiblePhotos.length - 1;
    } else {
      newIndex = currentIndex < visiblePhotos.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(visiblePhotos[newIndex].id);
  };

  const selectedPhoto = selectedImage 
    ? photos.find(photo => photo.id === selectedImage)
    : null;

  if (loading) {
    return (
      <section className="section py-8 lg:py-12 min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-tech">Chargement de la galerie...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section py-8 lg:py-12 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 pt-16">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl">
            <Camera className="w-8 h-8" />
          </div>
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
          
          {/* Bouton admin discret */}
          {!isAdmin && (
            <button
              onClick={() => setShowAdminLogin(true)}
              className="mt-4 text-xs text-gray-400 hover:text-orange-500 transition-colors"
            >
              •
            </button>
          )}
        </div>

        {/* Interface admin */}
        {isAdmin && (
          <div className="mb-8 p-4 bg-orange-50 border border-orange-200 rounded-xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm font-medium text-orange-800">Mode Administration</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Ajouter une photo
                </button>
                <button
                  onClick={() => {
                    setIsAdmin(false);
                    loadPhotos(); // Recharger seulement les photos visibles
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                >
                  Quitter admin
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Grille de photos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {photos.filter(photo => photo.is_visible || isAdmin).map((photo) => (
            <div
              key={photo.id}
              className={`group bg-white rounded-xl shadow-lg overflow-hidden border transition-all duration-300 hover:shadow-xl hover-scale cursor-pointer relative ${
                !photo.is_visible ? 'opacity-50 border-red-300' : 'border-gray-200 hover:border-orange-500/50'
              }`}
              onClick={() => openModal(photo.id)}
            >
              {/* Contrôles admin */}
              {isAdmin && (
                <div className="absolute top-2 right-2 z-10 flex gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePhotoVisibility(photo);
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
                      handleDeletePhoto(photo);
                    }}
                    className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
              
              {/* Image */}
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={photo.image_url}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Camera className="w-5 h-5 text-gray-700" />
                  </div>
                </div>
              </div>
              
              {/* Info */}
              <div className="p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 font-futuristic mb-1">
                  {photo.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 font-tech">
                  {photo.date_intervention}
                </p>
                {!photo.is_visible && isAdmin && (
                  <p className="text-xs text-red-500 font-tech mt-1">Masquée</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Message si aucune photo */}
        {photos.filter(photo => photo.is_visible || isAdmin).length === 0 && (
          <div className="text-center py-12">
            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 font-tech">Aucune photo dans la galerie</p>
          </div>
        )}
      </div>

      {/* Modal de connexion admin */}
      {showAdminLogin && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 font-futuristic">Administration</h3>
              <button
                onClick={() => {
                  setShowAdminLogin(false);
                  setAdminPassword('');
                }}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Mot de passe"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
              />
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAdminLogin(false);
                  setAdminPassword('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleAdminLogin}
                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Connexion
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal d'ajout de photo */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 font-futuristic">Ajouter une photo</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Titre de l'intervention</label>
                <input
                  type="text"
                  value={newPhoto.title}
                  onChange={(e) => setNewPhoto({...newPhoto, title: e.target.value})}
                  placeholder="Ex: Vidange moteur"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date d'intervention</label>
                <input
                  type="text"
                  value={newPhoto.date_intervention}
                  onChange={(e) => setNewPhoto({...newPhoto, date_intervention: e.target.value})}
                  placeholder="Ex: 15 Mars 2024"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewPhoto({...newPhoto, file: e.target.files?.[0] || null})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                {newPhoto.file && (
                  <div className="mt-2">
                    <img 
                      src={URL.createObjectURL(newPhoto.file)} 
                      alt="Aperçu" 
                      className="w-20 h-20 object-cover rounded-lg" 
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={uploading}
              >
                Annuler
              </button>
              <button
                onClick={handlePhotoUpload}
                disabled={uploading || !newPhoto.title || !newPhoto.date_intervention || !newPhoto.file}
                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Upload...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Ajouter
                  </>
                )}
              </button>
            </div>
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
                  src={selectedPhoto.image_url}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Informations */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 font-futuristic mb-2">
                  {selectedPhoto.title}
                </h3>
                <p className="text-gray-600 font-tech">
                  {selectedPhoto.date_intervention}
                </p>
                {!selectedPhoto.is_visible && isAdmin && (
                  <p className="text-red-500 font-tech text-sm mt-2">Photo masquée du public</p>
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