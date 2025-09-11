import React from 'react';

const StructuredData: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "Jack Up Garage",
    "alternateName": "Jack Up Garage - Mécanicien à domicile",
    "description": "Mécanicien professionnel à domicile en Haute-Loire (43) et Loire (42). Spécialisé en vidange, freinage, embrayage, distribution, suspensions.",
    "url": "https://jackupgarage.fr",
    "logo": "https://jackupgarage.fr/logo.png",
    "image": [
      "https://jackupgarage.fr/logo.png",
      "https://jackupgarage.fr/entretiens_photos.jpg",
      "https://jackupgarage.fr/freins_photos.jpg"
    ],
    "telephone": "+33123456789",
    "email": "contact@jackupgarage.fr",
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
        "name": "Saint-Étienne"
      }
    ],
    "serviceType": [
      "Vidange moteur",
      "Entretien automobile",
      "Réparation freins",
      "Changement plaquettes",
      "Remplacement embrayage",
      "Kit distribution",
      "Suspensions",
      "Amortisseurs",
      "Diagnostic automobile"
    ],
    "priceRange": "€€",
    "paymentAccepted": ["Cash", "Check", "Bank transfer"],
    "currenciesAccepted": "EUR",
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
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services de mécanique automobile",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Vidange moteur à domicile",
            "description": "Vidange complète avec changement filtre à huile et contrôle niveaux"
          },
          "areaServed": "Haute-Loire"
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Réparation système de freinage",
            "description": "Changement plaquettes, disques, purge liquide de frein"
          },
          "areaServed": "Haute-Loire"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Remplacement embrayage",
            "description": "Kit embrayage complet et volant moteur"
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
      "https://www.instagram.com/jackupgarage"
    ],
    "founder": {
      "@type": "Person",
      "name": "Mécanicien Jack Up Garage"
    },
    "slogan": "Votre mécanicien à domicile en Haute-Loire",
    "knowsAbout": [
      "Mécanique automobile",
      "Diagnostic électronique", 
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
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default StructuredData;