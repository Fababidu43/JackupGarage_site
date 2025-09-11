import React, { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Wrench, Car, Settings, Droplets } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Photos d'exemple - vous pourrez les remplacer par vos vraies photos
  const galleryImages = [
    {
      id: 1,
      src: 'https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Vidange moteur en cours',
      category: 'entretien',
      title: 'Vidange moteur',
      description: 'Intervention à domicile - Remplacement huile et filtre'
    },
    {
      id: 2,
      src: '/embrayage_photos.jpg',
      alt: 'Kit embrayage remplacé',
      category: 'embrayage',
      title: 'Embrayage complet',
      description: 'Remplacement kit embrayage et volant moteur'
    },
    {
      id: 3,
      src: '/distri_photos.jpg',
      alt: 'Kit distribution installé',
      category: 'distribution',
      title: 'Kit distribution',
      description: 'Courroie, galets et pompe à eau remplacés'
    },
    {
      id: 4,
      src: '/amortie_photos.jpg',
      alt: 'Amortisseurs neufs',
      category: 'suspension',
      title: 'Suspensions',
      description: 'Remplacement amortisseurs avant'
    },
    {
      id: 5,
      src: 'https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Freins remplacés',
      category: 'freinage',
      title: 'Système de freinage',
      description: 'Disques et plaquettes neufs'
    },
    {
      id: 6,
      src: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Diagnostic électronique',
      category: 'autres',
      title: 'Diagnostic',
      description: 'Contrôle électronique du véhicule'
    },
    {
      id: 7,
      src: 'https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Intervention à domicile',
      category: 'entretien',
      title: 'Intervention mobile',
      description: 'Service à domicile avec matériel professionnel'
    },
    {
      id: 8,
      src: 'https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Réparation terminée',
      category: 'autres',
      title: 'Réparation complète',
      description: 'Véhicule prêt après intervention'
    }
  ];

  const categories = [
    { id: 'all', name: 'Toutes', icon: <Camera className="w-4 h-4" /> },
    { id: 'entretien', name: 'Entretien', icon: <Droplets className="w-4 h-4" /> },
    { id: 'freinage', name: 'Freinage', icon: <Car className="w-4 h-4" /> },
    { id: 'embrayage', name: 'Embrayage', icon: <Wrench className="w-4 h-4" /> },
    { id: 'distribution', name: 'Distribution', icon: <Settings className="w-4 h-4" /> },
    { id: 'suspension', name: 'Suspension', icon: <Car className="w-4 h-4" /> },
    { id: 'autres', name: 'Autres', icon: <Wrench className="w-4 h-4" /> }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openModal = (imageId: number) => {
    setSelectedImage(imageId);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(filteredImages[newIndex].id);
  };

  const selectedImageData = selectedImage 
    ? galleryImages.find(img => img.id === selectedImage)
    : null;

  return (
    <section id="gallery" className="section py-8 lg:py-12 reveal-on-scroll diagonal-cut-top-slash diagonal-cut-bottom-backslash bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl">
            <Camera className="w-8 h-8" />
          </div>
          <h2 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4 sm:mb-6 tracking-tight uppercase font-futuristic">
            Galerie
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 font-medium font-tech mb-4">
            Nos interventions et réalisations
          </p>
          <p className="text-sm sm:text-base text-gray-600 font-tech">
            Découvrez notre travail professionnel à domicile
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Filtres par catégorie */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-xl font-medium text-sm sm:text-base transition-all duration-300 font-tech ${
                selectedCategory === category.id
                  ? 'bg-orange-500 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
              }`}
            >
              {category.icon}
              <span className="hidden sm:inline">{category.name}</span>
              <span className="sm:hidden">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Grille d'images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:border-orange-500/50 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
              onClick={() => openModal(image.id)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              
              {/* Overlay avec informations */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <h3 className="text-white font-bold text-sm sm:text-base font-futuristic mb-1">
                    {image.title}
                  </h3>
                  <p className="text-white/80 text-xs sm:text-sm font-tech">
                    {image.description}
                  </p>
                </div>
              </div>

              {/* Icône zoom */}
              <div className="absolute top-2 right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Camera className="w-4 h-4 text-white" />
              </div>
            </div>
          ))}
        </div>

        {/* Message si aucune image */}
        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 font-tech">Aucune image dans cette catégorie</p>
          </div>
        )}
      </div>

      {/* Modal lightbox */}
      {selectedImage && selectedImageData && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Bouton fermer */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation précédent */}
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Navigation suivant */}
            <button
              onClick={() => navigateImage('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <img
              src={selectedImageData.src}
              alt={selectedImageData.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />

            {/* Informations */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
              <h3 className="text-white font-bold text-xl font-futuristic mb-2">
                {selectedImageData.title}
              </h3>
              <p className="text-white/80 font-tech">
                {selectedImageData.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;