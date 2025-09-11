import React, { useState } from 'react';
import { useEffect } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Upload, Plus } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    date: '',
    image: '',
    file: null as File | null
  });
  const [keySequence, setKeySequence] = useState<string[]>([]);

  // Galerie simple avec photos d'interventions
  const [photos, setPhotos] = useState(() => {
    // Charger les photos depuis localStorage au démarrage
    const savedPhotos = localStorage.getItem('gallery-photos');
    if (savedPhotos) {
      try {
        return JSON.parse(savedPhotos);
      } catch (error) {
        console.error('Erreur lors du chargement des photos:', error);
      }
    }
    // Photos par défaut si rien en localStorage
    return [
    {
      id: 1,
      title: 'Vidange moteur',
      image: 'https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '15 Mars 2024'
    },
    {
      id: 2,
      title: 'Remplacement embrayage',
      image: '/embrayage_photos.jpg',
      date: '12 Mars 2024'
    },
    {
      id: 3,
      title: 'Kit distribution',
      image: '/distri_photos.jpg',
      date: '10 Mars 2024'
    },
    {
      id: 4,
      title: 'Changement amortisseurs',
      image: '/amortie_photos.jpg',
      date: '8 Mars 2024'
    },
    {
      id: 5,
      title: 'Système de freinage',
      image: '/freins_photos.jpg',
      date: '5 Mars 2024'
    },
    {
      id: 6,
      title: 'Diagnostic électronique',
      image: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '3 Mars 2024'
    },
    {
      id: 7,
      title: 'Entretien complet',
      image: 'https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '1er Mars 2024'
    },
    {
      id: 8,
      title: 'Réparation échappement',
      image: 'https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '28 Février 2024'
    },
    {
      id: 9,
      title: 'Changement batterie',
      image: 'https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '25 Février 2024'
    },
    {
      id: 10,
      title: 'Révision complète',
      image: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '22 Février 2024'
    },
    {
      id: 11,
      title: 'Réparation suspension',
      image: 'https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '20 Février 2024'
    },
    {
      id: 12,
      title: 'Changement courroie',
      image: 'https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '18 Février 2024'
    }
    ];
  });

  // Sauvegarder automatiquement les photos dans localStorage
  useEffect(() => {
    localStorage.setItem('gallery-photos', JSON.stringify(photos));
  }, [photos]);

  // Raccourci clavier complexe : Ctrl+Shift+Alt+G+A+L
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Séquence requise : Ctrl+Shift+Alt puis G, A, L
      if (e.ctrlKey && e.shiftKey && e.altKey) {
        const newSequence = [...keySequence, e.key.toLowerCase()];
        setKeySequence(newSequence);
        
        // Vérifier si la séquence complète est tapée : g, a, l
        if (newSequence.length >= 3) {
          const lastThree = newSequence.slice(-3);
          if (lastThree.join('') === 'gal') {
            setShowAdminLogin(true);
            setKeySequence([]); // Reset
          }
        }
        
        // Reset si trop long
        if (newSequence.length > 5) {
          setKeySequence([]);
        }
      } else {
        // Reset si les touches modificatrices ne sont pas pressées
        setKeySequence([]);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      // Reset après 2 secondes d'inactivité
      setTimeout(() => {
        setKeySequence([]);
      }, 2000);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [keySequence]);

  const openModal = (imageId: number) => {
    setSelectedImage(imageId);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const currentIndex = photos.findIndex(photo => photo.id === selectedImage);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
    } else {
      newIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(photos[newIndex].id);
  };

  const selectedPhoto = selectedImage 
    ? photos.find(photo => photo.id === selectedImage)
    : null;

  const handleAdminLogin = () => {
    if (adminCode === '43BENJI43') {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setShowAddForm(true);
      setAdminCode('');
    } else {
      alert('Code incorrect');
      setAdminCode('');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewPhoto({
          ...newPhoto,
          file: file,
          image: e.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPhoto = () => {
    if (newPhoto.title && newPhoto.date && (newPhoto.image || newPhoto.file)) {
      const newId = Math.max(...photos.map(p => p.id)) + 1;
      const updatedPhotos = [{
        id: newId,
        title: newPhoto.title,
        date: newPhoto.date,
        image: newPhoto.image
      }, ...photos];
      
      setPhotos(updatedPhotos);
      setNewPhoto({ title: '', date: '', image: '', file: null });
      setShowAddForm(false);
      setIsAdmin(false);
      
      // Confirmation de sauvegarde
      alert('Photo ajoutée et sauvegardée automatiquement !');
    }
  };
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
        </div>

        {/* Zone d'ajout pour le collègue */}

        {/* Grille de photos simple */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="group bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:border-orange-500/50 transition-all duration-300 hover:shadow-xl hover-scale cursor-pointer"
              onClick={() => openModal(photo.id)}
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Overlay avec icône zoom */}
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
                  {photo.date}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message si aucune photo */}
        {photos.length === 0 && (
          <div className="text-center py-12">
            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 font-tech">Aucune photo dans la galerie</p>
          </div>
        )}
      </div>

      {/* Indicateur de raccourci (optionnel, pour debug) */}
      {keySequence.length > 0 && (
        <div className="fixed top-4 right-4 bg-black/80 text-white px-3 py-1 rounded text-xs z-50">
          Séquence: {keySequence.join('')}
        </div>
      )}

      {/* Modal de connexion admin */}
      {showAdminLogin && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 font-futuristic">Code Admin</h3>
              <button
                onClick={() => {
                  setShowAdminLogin(false);
                  setAdminCode('');
                  setKeySequence([]);
                }}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <input
                type="password"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
                placeholder="Entrez le code admin"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
              />
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAdminLogin(false);
                  setAdminCode('');
                  setKeySequence([]);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleAdminLogin}
                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Valider
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal d'ajout de photo */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="text"
                  value={newPhoto.date}
                  onChange={(e) => setNewPhoto({...newPhoto, date: e.target.value})}
                  placeholder="Ex: 15 Mars 2024"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                {newPhoto.image && (
                  <div className="mt-2">
                    <img src={newPhoto.image} alt="Aperçu" className="w-20 h-20 object-cover rounded-lg" />
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
                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Ajouter
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
                  src={selectedPhoto.image}
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
                  {selectedPhoto.date}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;