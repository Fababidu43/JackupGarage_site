# Récapitulatif de Toutes les Clés API et Configuration

## 📋 Résumé Complet

Voici toutes les clés API, tokens et identifiants utilisés dans votre projet.

---

## 1️⃣ SUPABASE (Base de Données)

### Fichier : `.env`

```env
VITE_SUPABASE_URL=https://0ec90b57d6e95fcbda19832f.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwiYWxZSQ6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw
```

**Utilisation :**
- Appels aux Edge Functions (formulaires, emails)
- Authentification
- Base de données Firebase-like

**Fichiers qui l'utilisent :**
- `src/components/Contact.tsx` (ligne 42, 46)
- `src/components/QuotePopup.tsx` (ligne 244, 248)
- `src/components/Gallery.tsx` (ligne 73)

---

## 2️⃣ GOOGLE MAPS API

### Fichier : `index.html`

**Clé API :** `AIzaSyCdX0Eh2utXFDBq0CWq3SEO_14ol6v4L-4`

**Emplacement exact :** Ligne 140 de `index.html`

```javascript
script.src = '//maps.googleapis.com/maps/api/js?key=AIzaSyCdX0Eh2utXFDBq0CWq3SEO_14ol6v4L-4&libraries=places,geometry'
```

**Utilisation :**
- Autocomplete des adresses dans le formulaire de devis
- Calcul de distance entre localisation et zone de couverture
- Vérification de la zone d'intervention (60km)

**Fichiers qui l'utilisent :**
- `src/components/QuotePopup.tsx` (Autocomplete Google Places)
- `index.html` (Lazy loading de la carte)

**Bibliothèques activées :**
- `places` - Autocomplete des adresses
- `geometry` - Calcul de distance

---

## 3️⃣ GOOGLE ADS (Tracking des Conversions)

### Fichier : `index.html`

**ID de compte Google Ads :** `AW-17610625083`

**Emplacement exact :** Lignes 10-17 de `index.html`

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-17610625083"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-17610625083');
</script>
```

**ID de conversion :** `AW-17610625083/8JZMCP_iiLQbELugs81B`

**Utilisation :**
- Suivi des conversions (formulaires de contact, devis)
- Optimisation des campagnes Google Ads

**Fichiers qui l'utilisent :**
- `src/components/Contact.tsx` (ligne 66-68)
- `src/components/QuotePopup.tsx` (ligne 270-272)

---

## 4️⃣ FORMULAIRE DE CONTACT

### Configuration :

**Email d'envoi :** `jackup-auto@outlook.fr`

**Service utilisé :** Supabase Edge Functions

**Fonction :** `send-quote-email`

**Emplacement :** `/supabase/functions/send-quote-email/index.ts`

**Points d'envoi :**
1. Formulaire Contact (`src/components/Contact.tsx`)
2. Popup Devis (`src/components/QuotePopup.tsx`)

---

## 5️⃣ AUTRES CONFIGURATIONS

### Google Search Console
- **Verification Code :** `3_-xBGyya2Spbntg_UqNm4BlmmHo541RDDZu5lrJE6M`
- **Fichier :** `index.html` (ligne 7)

### Facebook
- **App ID :** `61581767660833`
- **Fichier :** `index.html` (ligne 43)

### Réseaux Sociaux
- **Facebook :** [https://www.facebook.com/profile.php?id=61581767660833](https://www.facebook.com/profile.php?id=61581767660833)
- **Instagram :** [@jackupauto](https://www.instagram.com/jackupauto)

### Coordonnées Géographiques
- **Latitude :** `45.2947`
- **Longitude :** `4.1736`
- **Lieu :** Monistrol-sur-Loire, Haute-Loire
- **Rayon de couverture :** 60 km

---

## 📊 Tableau Récapitulatif

| Service | Type | Clé/ID | Fichier | Ligne |
|---------|------|--------|--------|------|
| **Supabase** | URL | `https://0ec90b57...` | `.env` | 2 |
| **Supabase** | Clé Anon | `eyJhbGci...` | `.env` | 3 |
| **Google Maps** | API Key | `AIzaSyCdX0Eh...` | `index.html` | 140 |
| **Google Ads** | Account ID | `AW-17610625083` | `index.html` | 10 |
| **Google Ads** | Conversion ID | `AW-17610625083/8JZMCP_iiLQbELugs81B` | `Contact.tsx`, `QuotePopup.tsx` | 66-68, 270-272 |
| **GSC** | Verification | `3_-xBGyya2Spbntg...` | `index.html` | 7 |
| **Facebook** | App ID | `61581767660833` | `index.html` | 43 |

---

## ⚠️ SÉCURITÉ - IMPORTANT

### Clés Publiques (Safe à exposer)
- ✅ `VITE_SUPABASE_ANON_KEY` - Limitée aux opérations spécifiques
- ✅ `Google Maps API Key` - Restreinte par domaine
- ✅ `Google Ads Account ID` - Information publique

### Clés À Protéger
- 🔒 `VITE_SUPABASE_SERVICE_ROLE_KEY` - (Côté serveur uniquement)
- 🔒 Identifiants Google Ads - (Accès géré par compte Google)
- 🔒 Clés MailerSend - (Côté serveur Edge Function)

---

## 🔄 Où Récupérer les Clés

### 1. Supabase
- Allez sur [supabase.com](https://supabase.com)
- Projet → Settings → API
- Copiez `Project URL` et `anon public key`

### 2. Google Maps
- [Google Cloud Console](https://console.cloud.google.com)
- APIs & Services → Credentials
- Créez une clé API
- Activez les APIs : Maps JavaScript API, Places API, Geometry Library

### 3. Google Ads
- [Google Ads](https://ads.google.com)
- Tools & Settings → Conversions
- Votre ID de compte Ads est en haut à gauche

### 4. Google Search Console
- [Google Search Console](https://search.google.com/search-console)
- Vérification du site

---

## 🛠️ Configuration pour Développement Local

Créez un fichier `.env.local` :

```env
VITE_SUPABASE_URL=https://0ec90b57d6e95fcbda19832f.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwiYWxZSQ6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw
```

Puis :
```bash
npm run dev
```

---

## 📞 Informations de Contact

**Email :** jackup-auto@outlook.fr
**Téléphone :** 06 29 48 53 39
**Site :** https://www.jackup-auto.fr
**Zone de couverture :** 60km autour de Monistrol-sur-Loire

---

✅ Toutes les clés et configurations sont documentées !
