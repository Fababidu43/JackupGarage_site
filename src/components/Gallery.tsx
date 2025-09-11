import React, { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Wrench, Car, Settings, Droplets, Calendar, MapPin, Clock } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Articles de blog avec photos
  const blogPosts = [
    {
      id: 1,
      title: 'Vidange complète sur Peugeot 308',
      description: 'Intervention à domicile pour une vidange moteur avec remplacement du filtre à huile et contrôle des niveaux.',
      image: 'https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'entretien',
      date: '15 Mars 2024',
      location: 'Monistrol-sur-Loire',
      duration: '45 min',
      tags: ['Vidange', 'Filtre', 'Peugeot']
    },
    {
      id: 2,
      title: 'Remplacement kit embrayage Renault Clio',
      description: 'Changement complet du kit embrayage et volant moteur sur une Renault Clio. Intervention technique réalisée avec succès.',
      image: '/embrayage_photos.jpg',
      category: 'embrayage',
      date: '12 Mars 2024',
      location: 'Saint-Étienne',
      duration: '4h30',
      tags: ['Embrayage', 'Volant moteur', 'Renault']
    },
    {
      id: 3,
      title: 'Kit distribution Citroën C3',
      description: 'Remplacement du kit de distribution complet : courroie, galets tendeurs et pompe à eau sur Citroën C3.',
      image: '/distri_photos.jpg',
      category: 'distribution',
      date: '10 Mars 2024',
      location: 'Le Puy-en-Velay',
      duration: '5h',
      tags: ['Distribution', 'Courroie', 'Citroën']
    },
    {
      id: 4,
      title: 'Changement amortisseurs avant',
      description: 'Remplacement des amortisseurs avant et contrôle de la géométrie sur véhicule utilitaire.',
      image: '/amortie_photos.jpg',
      category: 'suspension',
      date: '8 Mars 2024',
      location: 'Yssingeaux',
      duration: '2h30',
      tags: ['Amortisseurs', 'Suspension', 'Utilitaire']
    },
    {
      id: 5,
      title: 'Système de freinage complet',
      description: 'Remplacement des disques et plaquettes de frein avant et arrière avec purge du circuit.',
      image: '/freins_photos.jpg',
      category: 'freinage',
      date: '5 Mars 2024',
      location: 'Firminy',
      duration: '2h',
      tags: ['Freins', 'Disques', 'Plaquettes']
    },
    {
      id: 6,
      title: 'Diagnostic électronique avancé',
      description: 'Diagnostic complet du système électronique et résolution de pannes multiples sur véhicule récent.',
      image: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'diagnostic',
      date: '3 Mars 2024',
      location: 'Retournac',
      duration: '1h30',
      tags: ['Diagnostic', 'Électronique', 'Panne']
    },
    {
      id: 7,
      title: 'Entretien complet Ford Focus',
      description: 'Service d\'entretien complet : vidange, filtres, contrôles de sécurité et remise à zéro des témoins.',
      image: 'https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'entretien',
      date: '1er Mars 2024',
      location: 'Bas-en-Basset',
      duration: '1h15',
      tags: ['Entretien', 'Ford', 'Révision']
    },
    {
      id: 8,
      title: 'Réparation système d\'échappement',
      description: 'Remplacement du silencieux arrière et réparation de la ligne d\'échappement complète.',
      image: 'https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'echappement',
      date: '28 Février 2024',
      location: 'Saint-Just-Malmont',
      duration: '1h45',
      tags: ['Échappement', 'Silencieux', 'Réparation']
    }
  ];

  const categories = [
    { id: 'all', name: 'Toutes', icon: <Camera className="w-4 h-4" />, color: 'bg-orange-500' },
    { id: 'entretien', name: 'Entretien', icon: <Droplets className="w-4 h-4" />, color: 'bg-blue-500' },
    { id: 'freinage', name: 'Freinage', icon: <Car className="w-4 h-4" />, color: 'bg-red-500' },
    { id: 'embrayage', name: 'Embrayage', icon: <Wrench className="w-4 h-4" />, color: 'bg-yellow-500' },
    { id: 'distribution', name: 'Distribution', icon: <Settings className="w-4 h-4" />, color: 'bg-purple-500' },
    { id: 'suspension', name: 'Suspension', icon: <Car className="w-4 h-4" />, color: 'bg-green-500' },
    { id: 'diagnostic', name: 'Diagnostic', icon: <Wrench className="w-4 h-4" />, color: 'bg-indigo-500' },
    { id: 'echappement', name: 'Échappement', icon: <Car className="w-4 h-4" />, color: 'bg-gray-500' }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const openModal = (imageId: number) => {
    setSelectedImage(imageId);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const currentIndex = filteredPosts.findIndex(post => post.id === selectedImage);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredPosts.length - 1;
    } else {
      newIndex = currentIndex < filteredPosts.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(filteredPosts[newIndex].id);
  };

  const selectedPost = selectedImage 
    ? blogPosts.find(post => post.id === selectedImage)
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
            Nos dernières interventions
          </p>
          <p className="text-sm sm:text-base text-gray-600 font-tech">
            Découvrez notre travail professionnel à travers nos réalisations récentes
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Filtres par catégorie */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-xl font-medium text-sm sm:text-base transition-all duration-300 font-tech hover-scale ${
                selectedCategory === category.id
                  ? `${category.color} text-white shadow-lg transform scale-105`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.icon}
              <span className="hidden sm:inline">{category.name}</span>
              <span className="sm:hidden">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Grille d'articles blog */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:border-orange-500/50 transition-all duration-300 hover:shadow-xl hover-scale cursor-pointer"
              onClick={() => openModal(post.id)}
            >
              {/* Image */}
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Overlay avec catégorie */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wide ${
                    categories.find(cat => cat.id === post.category)?.color || 'bg-gray-500'
                  }`}>
                    {categories.find(cat => cat.id === post.category)?.name}
                  </span>
                </div>

                {/* Icône zoom */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Camera className="w-5 h-5 text-white" />
                </div>
              </div>
              
              {/* Contenu */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 font-futuristic mb-3 group-hover:text-orange-600 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 font-tech text-sm leading-relaxed mb-4">
                  {post.description}
                </p>

                {/* Métadonnées */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-xs text-gray-500 font-tech">
                    <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                    {post.date}
                  </div>
                  <div className="flex items-center text-xs text-gray-500 font-tech">
                    <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                    {post.location}
                  </div>
                  <div className="flex items-center text-xs text-gray-500 font-tech">
                    <Clock className="w-4 h-4 mr-2 text-orange-500" />
                    Durée: {post.duration}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full font-tech"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Message si aucun article */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 font-tech">Aucun article dans cette catégorie</p>
          </div>
        )}
      </div>

      {/* Modal lightbox */}
      {selectedImage && selectedPost && (
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
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Informations détaillées */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-white text-sm font-bold uppercase tracking-wide ${
                    categories.find(cat => cat.id === selectedPost.category)?.color || 'bg-gray-500'
                  }`}>
                    {categories.find(cat => cat.id === selectedPost.category)?.name}
                  </span>
                  <div className="text-sm text-gray-500 font-tech">{selectedPost.date}</div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 font-futuristic mb-4">
                  {selectedPost.title}
                </h3>
                
                <p className="text-gray-600 font-tech leading-relaxed mb-6">
                  {selectedPost.description}
                </p>

                {/* Métadonnées détaillées */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-sm text-gray-600 font-tech">
                    <MapPin className="w-5 h-5 mr-3 text-orange-500" />
                    <span><strong>Lieu:</strong> {selectedPost.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 font-tech">
                    <Clock className="w-5 h-5 mr-3 text-orange-500" />
                    <span><strong>Durée:</strong> {selectedPost.duration}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {selectedPost.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full font-tech"
                    >
                      {tag}
                    </span>
                  ))}
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