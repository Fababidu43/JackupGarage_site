import React, { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Upload, Plus } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Galerie simple avec photos d'interventions
  const photos = [
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
        <div className="mb-8 sm:mb-12">
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-dashed border-orange-300 rounded-2xl p-6 sm:p-8 text-center">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
              <Upload className="w-6 h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-orange-800 font-futuristic mb-2">
              Zone d'ajout de photos
            </h3>
            <p className="text-sm sm:text-base text-orange-700 font-tech mb-4">
              Pour ajouter des photos, contactez l'administrateur du site ou utilisez l'interface d'administration.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-tech text-sm">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter une photo
              </button>
              <button className="inline-flex items-center px-4 py-2 border-2 border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors font-tech text-sm">
                <Camera className="w-4 h-4 mr-2" />
                Interface admin
              </button>
            </div>
          </div>
        </div>

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
                <h3 className="text-sm sm:text-base font-bold text-gray-900 font-futuristic mb-1 group-hover:text-orange-600 transition-colors">
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