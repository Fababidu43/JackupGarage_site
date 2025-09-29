import React from 'react';

const StructuredData: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["AutoRepair", "LocalBusiness", "EmergencyService", "Locksmith"],
    "name": "JACK Up Auto - Dépanneur & Garage Auto Haute-Loire Loire",
    "alternateName": ["JACK Up Auto", "Dépanneur 43", "Dépanneurs Haute-Loire", "Garage Auto 43", "Garage Auto 42", "Garagiste 43", "Garage Monistrol", "Garage Bas-en-Basset", "Dépanneur Monistrol sur Loire", "Garage Auto Monistrol", "Garagiste Monistrol sur Loire", "Mécanicien à domicile 43", "Garagiste mobile Haute-Loire", "Mécanicien à domicile 42", "Garagiste mobile Loire", "Mécanicien Saint-Étienne", "Garagiste Le Puy-en-Velay", "Dépanneur Le Puy", "Garage Yssingeaux", "Garagiste Yssingeaux", "Garage Brioude", "Garage Firminy", "Garage Saint-Chamond", "Dépannage Auto 43", "Dépannage Voiture Haute-Loire", "Garage Mobile 43", "Garage Itinérant Haute-Loire", "Réparation Auto Domicile 43", "Service Auto Mobile", "Atelier Mobile Automobile", "Maintenance Véhicule Domicile", "Expert Auto Mobile", "Technicien Automobile Domicile"],
    "description": "JACK Up Auto - N°1 Dépanneur & Garage auto mobile Haute-Loire (43) et Loire (42) dans un rayon de 60km. Spécialiste dépannage automobile, réparation à domicile, vidange, freinage, embrayage, distribution, suspensions. Intervention rapide Monistrol-sur-Loire, Bas-en-Basset, Le Puy-en-Velay, Saint-Étienne, Yssingeaux, Firminy, Saint-Chamond, Brioude, Retournac, Aurec-sur-Loire.",
    "url": "https://www.jackup-auto.fr/",
    "logo": "https://www.jackup-auto.fr/logo.png",
    "image": [
      "https://www.jackup-auto.fr/logo.png",
      "https://www.jackup-auto.fr/entretiens_photos.jpg",
      "https://www.jackup-auto.fr/freins_photos.jpg",
      "https://www.jackup-auto.fr/embrayage_photos.jpg",
      "https://www.jackup-auto.fr/distri_photos.jpg",
      "https://www.jackup-auto.fr/amortie_photos.jpg",
      "https://www.jackup-auto.fr/autre_presta.jpg"
    ],
    "telephone": "+33629485339",
    "email": "jackup-auto@outlook.fr",
    "priceRange": "€-€€",
    "paymentAccepted": ["Cash", "Check", "Bank transfer", "Credit Card", "Debit Card"],
    "currenciesAccepted": "EUR",
    "hasMap": "https://www.google.com/maps/place/Monistrol-sur-Loire,+43120",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Monistrol-sur-Loire",
      "addressRegion": "Haute-Loire",
      "postalCode": "43120",
      "addressCountry": "FR",
      "streetAddress": "Zone d'intervention mobile 60km"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 45.2947,
      "longitude": 4.1736
    },
    "areaServed": [
      {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": 45.2947,
          "longitude": 4.1736
        },
        "geoRadius": "60000"
      },
      {
        "@type": "State",
        "name": "Haute-Loire",
        "alternateName": "43"
      },
      {
        "@type": "State", 
        "name": "Loire",
        "alternateName": "42"
      },
      {
        "@type": "City",
        "name": "Le Puy-en-Velay"
      },
      {
        "@type": "City",
        "name": "Monistrol-sur-Loire"
      },
      {
        "@type": "City",
        "name": "Yssingeaux"
      },
      {
        "@type": "City",
        "name": "Brioude"
      },
      {
        "@type": "City",
        "name": "Retournac"
      },
      {
        "@type": "City",
        "name": "Bas-en-Basset"
      },
      {
        "@type": "City",
        "name": "Saint-Étienne"
     },
     {
       "@type": "City",
       "name": "Firminy"
     },
     {
       "@type": "City",
       "name": "Saint-Chamond"
     },
     {
       "@type": "City",
       "name": "Rive-de-Gier"
     },
     {
       "@type": "City",
       "name": "Roanne"
     },
     {
       "@type": "City",
       "name": "Montbrison"
      },
      {
        "@type": "City",
        "name": "Bas-en-Basset"
      },
      {
        "@type": "City",
        "name": "Retournac"
      },
      {
        "@type": "City",
        "name": "Aurec-sur-Loire"
      },
      {
        "@type": "City",
        "name": "Saint-Didier-en-Velay"
      },
      {
        "@type": "City",
        "name": "Saint-Just-Malmont"
      },
      {
        "@type": "City",
        "name": "Dunières"
      },
      {
        "@type": "City",
        "name": "Tence"
      },
      {
        "@type": "City",
        "name": "Craponne-sur-Arzon"
      },
      {
        "@type": "City",
        "name": "Vorey"
      },
      {
        "@type": "City",
        "name": "Saint-Paulien"
      },
      {
        "@type": "City",
        "name": "Allegre"
      },
      {
        "@type": "City",
        "name": "Langeac"
      },
      {
        "@type": "City",
        "name": "Sainte-Sigolène"
      },
      {
        "@type": "City",
        "name": "Veauche"
      },
      {
        "@type": "City",
        "name": "Sorbiers"
      }
    ],
    "serviceType": [
      "Dépannage automobile à domicile",
      "Dépanneur auto mobile",
      "Garage auto mobile",
      "Réparation automobile à domicile",
      "Service dépannage voiture",
      "Assistance automobile mobile",
      "Dépannage panne voiture",
      "Secours automobile",
      "SOS auto mobile",
      "Intervention automobile urgente",
      "Vidange moteur à domicile",
      "Entretien automobile mobile",
      "Réparation freins à domicile",
      "Changement plaquettes de frein",
      "Remplacement embrayage à domicile",
      "Kit distribution à domicile",
      "Suspensions et amortisseurs",
      "Changement batterie auto",
      "Réparation alternateur démarreur",
      "Diagnostic automobile mobile",
      "Mécanicien à domicile",
      "Garagiste mobile",
     "Mécanicien à domicile Saint-Étienne",
     "Garagiste mobile Loire 42",
     "Réparation auto Firminy",
     "Vidange domicile Saint-Chamond",
     "Mécanicien mobile Rive-de-Gier",
     "Garagiste itinérant Roanne",
     "Service auto domicile Montbrison",
      "Réparation auto à domicile",
      "Service mécanique itinérant",
      "Garage auto Monistrol",
      "Garage auto Bas-en-Basset",
      "Garage auto Le Puy-en-Velay",
      "Garage auto Yssingeaux",
      "Garage auto Brioude",
      "Garage auto Retournac",
      "Garage auto Aurec-sur-Loire",
      "Garage auto Saint-Didier-en-Velay",
      "Garage auto Saint-Just-Malmont",
      "Garage auto Dunières",
      "Garage auto Tence",
      "Garage auto Craponne-sur-Arzon",
      "Garage auto Vorey",
      "Garage auto Saint-Paulien",
      "Garage auto Allegre",
      "Garage auto Langeac",
      "Garage auto Sainte-Sigolène",
      "Dépanneur Monistrol-sur-Loire",
      "Dépanneur Bas-en-Basset",
      "Dépanneur Le Puy-en-Velay",
      "Dépanneur Yssingeaux",
      "Dépanneur Brioude",
      "Dépanneur Retournac",
      "Dépanneur Aurec-sur-Loire",
      "Dépanneur Saint-Didier-en-Velay",
      "Dépanneur Saint-Just-Malmont",
      "Dépanneur Dunières",
      "Dépanneur Tence",
      "Dépanneur Craponne-sur-Arzon",
      "Dépanneur Vorey",
      "Dépanneur Saint-Paulien",
      "Dépanneur Allegre",
      "Dépanneur Langeac",
      "Dépanneur Sainte-Sigolène"
    ],
    "keywords": [
      "dépanneur haute-loire",
      "dépanneurs 43",
      "garage auto 43",
      "garage auto 42",
      "garagiste 43",
      "garage monistrol",
      "garage bas-en-basset",
      "garagiste haute-loire",
      "mécanicien à domicile 43",
     "garagiste loire 42",
     "mécanicien à domicile saint-étienne",
     "garage mobile firminy",
     "réparation auto saint-chamond",
      "garage monistrol sur loire",
      "réparation auto haute-loire",
     "réparation auto loire",
      "vidange à domicile le puy",
      "vidange domicile saint-étienne",
      "dépanneur monistrol sur loire",
      "garage auto monistrol",
      "garagiste monistrol sur loire",
      "dépannage auto 43",
      "dépannage voiture haute-loire",
      "garage mobile 43",
      "garage itinérant haute-loire",
      "réparation auto domicile 43",
      "garage auto le puy en velay",
      "garagiste le puy",
      "dépanneur le puy",
      "garage yssingeaux",
      "garagiste yssingeaux",
      "dépanneur yssingeaux",
      "garage brioude",
      "garagiste brioude",
      "dépanneur brioude",
      "garage retournac",
      "garagiste mobile"
    ],
    "openingHours": [
      "Mo-Sa 08:00-18:00"
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday", 
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "09:00",
        "closes": "17:00",
        "validFrom": "2024-01-01",
        "validThrough": "2024-12-31"
      }
    ],
    "speciality": [
      "Mécanique automobile mobile",
      "Dépannage automobile",
      "Service d'urgence auto",
      "Intervention à domicile",
      "Assistance automobile",
      "Réparation sur site",
      "Réparation sur site",
      "Service client personnalisé"
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 45.2947,
        "longitude": 4.1736
      },
      "geoRadius": "60000",
      "description": "Zone d'intervention de 60km autour de Monistrol-sur-Loire, couvrant Bas-en-Basset, Le Puy-en-Velay, Saint-Étienne, Yssingeaux, Firminy, Saint-Chamond, Brioude, Retournac, Aurec-sur-Loire et environs"
    },
    "mobilitySolution": "Service à domicile",
    "vehicleType": "Véhicule d'intervention mobile équipé",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services de mécanique automobile",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Dépannage automobile à domicile Haute-Loire",
            "category": "Entretien automobile",
            "description": "Service de dépannage automobile complet à domicile avec diagnostic et réparation sur site"
          },
          "areaServed": ["Haute-Loire", "Loire"]
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Garage auto mobile Haute-Loire",
            "category": "Sécurité automobile",
            "description": "Service de garage automobile mobile avec intervention à domicile"
          },
          "areaServed": ["Haute-Loire", "Loire"]
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Vidange moteur à domicile",
            "category": "Transmission automobile",
            "description": "Vidange complète avec changement filtre à huile et contrôle niveaux"
          },
          "areaServed": ["Haute-Loire", "Loire"]
       },
       {
         "@type": "Offer",
         "itemOffered": {
           "@type": "Service",
           "name": "Dépanneur Saint-Étienne",
           "category": "Service automobile mobile",
           "description": "Service de dépannage automobile à domicile dans la Loire"
         },
         "areaServed": "Loire"
       },
       {
         "@type": "Offer",
         "itemOffered": {
           "@type": "Service",
           "name": "Garage auto Le Puy-en-Velay",
           "category": "Service automobile mobile",
           "description": "Service de garage automobile mobile en Haute-Loire"
         },
         "areaServed": "Haute-Loire"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Garage Monistrol-sur-Loire",
            "category": "Service automobile local",
            "description": "Garage automobile mobile basé à Monistrol-sur-Loire"
          },
          "areaServed": "Monistrol-sur-Loire"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Garage Bas-en-Basset",
            "category": "Service automobile local",
            "description": "Service de garage automobile mobile à Bas-en-Basset"
          },
          "areaServed": "Bas-en-Basset"
        }
      ]
    },
    "review": [
      {
        "@type": "Review",
        "author": { 
          "@type": "Person",
          "name": "Client Monistrol-sur-Loire"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Excellent dépanneur ! Service rapide et professionnel à domicile. Je recommande vivement JACK Up Auto !"
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person", 
          "name": "Client Bas-en-Basset"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "Garage mobile parfait ! Intervention rapide pour ma panne, mécanicien compétent et prix correct."
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person", 
          "name": "Client Yssingeaux"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "Super dépanneur ! Très réactif, travail de qualité. Le garage vient à vous, c'est génial !"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.95",
      "reviewCount": "73",
      "bestRating": "5",
      "worstRating": "4"
    },
    "sameAs": [
      "https://www.facebook.com/jackupauto",
      "https://www.instagram.com/jackupauto",
      "https://www.google.com/maps/place/JACK+Up+Auto",
      "https://www.pagesjaunes.fr/pros/jack-up-auto",
      "https://www.yelp.fr/biz/jack-up-auto",
      "https://fr.foursquare.com/v/jack-up-auto"
    ],
    "founder": {
      "@type": "Person",
      "name": "Fondateur JACK Up Auto"
    },
    "slogan": "JACK Up Auto - Votre dépanneur & garage auto mobile en Haute-Loire Loire",
    "knowsAbout": [
      "Dépannage automobile",
      "Service d'urgence auto",
      "Assistance automobile mobile",
      "Mécanique automobile",
      "Diagnostic électronique",
      "Réparation à domicile",
      "Service mobile automobile",
      "Garage auto mobile",
      "Mécanique Haute-Loire",
      "Mécanique Loire",
      "Intervention rapide",
      "Entretien préventif",
      "Réparation à domicile",
      "Dépannage panne voiture",
      "Secours automobile"
    ],
    "makesOffer": [
      {
        "@type": "Offer",
        "name": "Devis gratuit dépannage",
        "description": "Estimation gratuite pour dépannage et réparation sous 12h",
        "price": "0",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "name": "Intervention rapide",
        "description": "Service de dépannage automobile rapide à domicile",
        "availability": "https://schema.org/InStock"
      }
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+33629485339",
      "contactType": "emergency",
      "availableLanguage": "French",
      "serviceType": "Dépannage automobile"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default StructuredData;