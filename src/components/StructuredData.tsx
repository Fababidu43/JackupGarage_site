import React from 'react';

const StructuredData: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["AutoRepair", "LocalBusiness"],
    "name": "JACK Up Auto - Garagiste à Domicile Haute-Loire",
    "alternateName": ["JACK Up Auto", "Mécanicien à domicile 43", "Garagiste mobile Haute-Loire", "Mécanicien à domicile 42", "Garagiste mobile Loire", "Mécanicien Saint-Étienne", "Garagiste Le Puy-en-Velay"],
    "description": "JACK Up Auto - Garagiste professionnel à domicile Haute-Loire (43) et Loire (42) dans un rayon de 60km. Mécanicien mobile spécialisé en vidange, freinage, embrayage, distribution, suspensions. Intervention rapide Le Puy-en-Velay, Saint-Étienne, Monistrol-sur-Loire, Yssingeaux, Firminy, Saint-Chamond.",
    "url": "https://jackupauto.fr",
    "logo": "https://jackupauto.fr/logo.png",
    "image": [
      "https://jackupauto.fr/logo.png",
      "https://jackupauto.fr/entretiens_photos.jpg",
      "https://jackupauto.fr/freins_photos.jpg"
    ],
    "telephone": "+33629485339",
    "email": "jackup-auto@outlook.fr",
    "priceRange": "€€",
    "paymentAccepted": ["Cash", "Check", "Bank transfer"],
    "currenciesAccepted": "EUR",
    "hasMap": "https://www.google.com/maps/place/Monistrol-sur-Loire",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Monistrol-sur-Loire",
      "addressRegion": "Haute-Loire",
      "postalCode": "43120",
      "addressCountry": "FR",
      "streetAddress": "Zone d'intervention mobile"
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
      }
    ],
    "serviceType": [
      "Vidange moteur à domicile",
      "Entretien automobile mobile",
      "Réparation freins à domicile",
      "Changement plaquettes de frein",
      "Remplacement embrayage à domicile",
      "Kit distribution à domicile",
      "Suspensions et amortisseurs",
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
      "Service mécanique itinérant"
    ],
    "keywords": [
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
      "Intervention à domicile",
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
      "description": "Zone d'intervention de 60km autour de Monistrol-sur-Loire, couvrant Le Puy-en-Velay, Saint-Étienne, Yssingeaux, Firminy, Saint-Chamond, Brioude et environs"
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
            "name": "Vidange moteur à domicile Haute-Loire",
            "category": "Entretien automobile",
            "description": "Vidange complète avec changement filtre à huile et contrôle niveaux"
          },
          "areaServed": ["Haute-Loire", "Loire"]
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Réparation freins à domicile Haute-Loire",
            "category": "Sécurité automobile",
            "description": "Changement plaquettes, disques, purge liquide de frein"
          },
          "areaServed": ["Haute-Loire", "Loire"]
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Remplacement embrayage à domicile",
            "category": "Transmission automobile",
            "description": "Kit embrayage complet et volant moteur"
          },
          "areaServed": ["Haute-Loire", "Loire"]
       },
       {
         "@type": "Offer",
         "itemOffered": {
           "@type": "Service",
           "name": "Mécanicien à domicile Saint-Étienne",
           "category": "Service automobile mobile",
           "description": "Intervention mécanique à domicile dans la Loire"
         },
         "areaServed": "Loire"
       },
       {
         "@type": "Offer",
         "itemOffered": {
           "@type": "Service",
           "name": "Garagiste mobile Le Puy-en-Velay",
           "category": "Service automobile mobile",
           "description": "Service de mécanique mobile en Haute-Loire"
         },
         "areaServed": "Haute-Loire"
        }
      ]
    },
    "review": [
      {
        "@type": "Review",
        "author": { 
          "@type": "Person",
          "name": "Client Haute-Loire"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Service excellent, mécanicien professionnel qui se déplace à domicile. Très pratique !"
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person", 
          "name": "Client Le Puy-en-Velay"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "Intervention rapide pour ma vidange, mécanicien compétent et prix correct."
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "47",
      "bestRating": "5",
      "worstRating": "4"
    },
    "sameAs": [
      "https://www.facebook.com/jackupgarage",
      "https://www.instagram.com/jackupgarage",
      "https://www.google.com/maps/place/JACK+Up+Auto",
      "https://www.pagesjaunes.fr/pros/jack-up-auto"
    ],
    "founder": {
      "@type": "Person",
      "name": "Mécanicien JACK Up Auto"
    },
    "slogan": "JACK Up Auto - Votre mécanicien à domicile en Haute-Loire",
    "knowsAbout": [
      "Mécanique automobile",
      "Diagnostic électronique",
      "Réparation à domicile",
      "Service mobile automobile",
      "Mécanique Haute-Loire",
      "Intervention rapide",
      "Entretien préventif",
      "Réparation à domicile"
    ],
    "makesOffer": [
      {
        "@type": "Offer",
        "name": "Devis gratuit",
        "description": "Estimation gratuite sous 12h",
        "price": "0",
        "priceCurrency": "EUR"
      }
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+33629485339",
      "contactType": "customer service",
      "availableLanguage": "French"
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