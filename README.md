# 🚗 Jack Up Garage - Site Web Mécanicien à Domicile

Site web professionnel pour Jack Up Garage, mécanicien à domicile en Haute-Loire (43) et Loire (42).

## 🎯 Fonctionnalités

- ✅ **Site responsive** - Optimisé mobile/desktop
- ✅ **Formulaire de devis** - Popup interactif avec géolocalisation
- ✅ **Galerie photos** - Gestion des interventions
- ✅ **Zone d'intervention** - Carte Google Maps interactive
- ✅ **SEO optimisé** - Référencement local Haute-Loire
- ✅ **Performance** - Chargement ultra-rapide

## 🛠️ Technologies Utilisées

- **React 18** + TypeScript
- **Tailwind CSS** - Design system
- **Vite** - Build tool moderne
- **Google Maps API** - Géolocalisation
- **Lucide React** - Icônes

---

## 📋 GUIDE D'INSTALLATION COMPLET

### 🔧 **ÉTAPE 1 : Prérequis**

Installez ces logiciels sur votre ordinateur :

1. **Node.js** (version 18 ou plus récente)
   - Téléchargez : https://nodejs.org/
   - Vérifiez l'installation : `node --version`

2. **VS Code** 
   - Téléchargez : https://code.visualstudio.com/

3. **Git** (optionnel mais recommandé)
   - Téléchargez : https://git-scm.com/

### 📁 **ÉTAPE 2 : Récupérer le Code**

#### Option A : Télécharger le ZIP
1. Téléchargez tous les fichiers du projet
2. Créez un dossier `jackup-garage-site` sur votre bureau
3. Copiez tous les fichiers dans ce dossier

#### Option B : Avec Git (recommandé)
```bash
git clone [URL_DU_PROJET] jackup-garage-site
cd jackup-garage-site
```

### 🚀 **ÉTAPE 3 : Ouvrir dans VS Code**

1. **Ouvrez VS Code**
2. **Fichier** → **Ouvrir le dossier**
3. Sélectionnez le dossier `jackup-garage-site`
4. Cliquez sur **"Faire confiance aux auteurs"** si demandé

### 📦 **ÉTAPE 4 : Installer les Extensions VS Code (Recommandées)**

Dans VS Code, allez dans **Extensions** (Ctrl+Shift+X) et installez :

- ✅ **ES7+ React/Redux/React-Native snippets**
- ✅ **Tailwind CSS IntelliSense**
- ✅ **TypeScript Importer**
- ✅ **Auto Rename Tag**
- ✅ **Prettier - Code formatter**
- ✅ **GitLens** (si vous utilisez Git)

### 💻 **ÉTAPE 5 : Installation des Dépendances**

1. **Ouvrez le terminal dans VS Code** :
   - Menu : **Terminal** → **Nouveau Terminal**
   - Ou raccourci : `Ctrl + ù` (Windows) / `Cmd + ù` (Mac)

2. **Installez les dépendances** :
```bash
npm install
```

⏳ *Cette étape peut prendre 2-3 minutes selon votre connexion internet*

### ▶️ **ÉTAPE 6 : Lancer le Site en Développement**

Dans le terminal VS Code, tapez :

```bash
npm run dev
```

✅ **Le site sera accessible à** : http://localhost:5173

### 🌐 **ÉTAPE 7 : Configuration Google Maps (Important !)**

1. **Obtenez une clé API Google Maps** :
   - Allez sur : https://console.cloud.google.com/
   - Créez un projet
   - Activez "Maps JavaScript API" et "Places API"
   - Créez une clé API

2. **Remplacez la clé dans le code** :
   - Ouvrez le fichier `index.html`
   - Ligne 47, remplacez `AIzaSyCdX0Eh2utXFDBq0CWq3SEO_14ol6v4L-4` par votre clé

---

## 🎨 **PERSONNALISATION**

### 📞 **Changer les Informations de Contact**

**Fichiers à modifier :**

1. **Numéro de téléphone** :
   - `src/components/Contact.tsx` → ligne 89 : `href="tel:+33123456789"`
   - `src/components/Footer.tsx` → ligne 45 : `href="tel:+33123456789"`
   - `src/components/QuotePopup.tsx` → ligne 298 : `const phoneNumber = "0123456789"`

2. **Email** :
   - `src/components/Contact.tsx` → ligne 102 : `href="mailto:contact@jackupgarage.fr"`
   - `src/components/Footer.tsx` → ligne 55 : `href="mailto:contact@jackupgarage.fr"`

### 🖼️ **Changer le Logo**

1. Remplacez le fichier `src/logo.png` par votre logo
2. Remplacez le fichier `public/logo.png` par le même logo
3. **Format recommandé** : PNG transparent, ratio 2:1 (ex: 400x200px)

### 📸 **Modifier les Photos de Services**

Remplacez ces fichiers dans le dossier `public/` :
- `entretiens_photos.jpg` - Photo vidange/entretien
- `freins_photos.jpg` - Photo système de freinage  
- `embrayage_photos.jpg` - Photo embrayage
- `distri_photos.jpg` - Photo distribution
- `amortie_photos.jpg` - Photo amortisseurs

**Format recommandé** : JPG, 800x800px minimum

### 🗺️ **Modifier la Zone d'Intervention**

Dans `src/components/ServiceArea.tsx` :
- Ligne 12-15 : Changez les coordonnées du centre
- Ligne 16-17 : Modifiez les rayons d'intervention
- Ligne 58-70 : Adaptez les listes de communes

---

## 🚀 **MISE EN PRODUCTION**

### 📦 **Construire le Site pour la Production**

```bash
npm run build
```

Les fichiers optimisés seront dans le dossier `dist/`

### 🌐 **Déployer le Site**

**Options recommandées :**

1. **Netlify** (Gratuit) :
   - Glissez-déposez le dossier `dist/` sur netlify.com

2. **Vercel** (Gratuit) :
   - Connectez votre projet GitHub sur vercel.com

3. **Hébergeur traditionnel** :
   - Uploadez le contenu du dossier `dist/` via FTP

---

## 🔧 **COMMANDES UTILES**

```bash
# Lancer en développement
npm run dev

# Construire pour la production
npm run build

# Prévisualiser la version de production
npm run preview

# Vérifier les erreurs de code
npm run lint
```

---

## 📱 **FONCTIONNALITÉS SPÉCIALES**

### 🎯 **Popup de Devis Intelligent**
- Géolocalisation automatique
- Vérification de zone de couverture
- Envoi par WhatsApp/SMS

### 📸 **Galerie Administrable**
- Raccourci secret : `Ctrl+Shift+Alt+G+A+L`
- Code admin : `43BENJI43`
- Ajout/suppression de photos

### 🗺️ **Carte Interactive**
- Zones de couverture colorées
- Vérificateur d'adresse en temps réel
- Calcul automatique des distances

---

## 🆘 **RÉSOLUTION DE PROBLÈMES**

### ❌ **Erreur "npm not found"**
- Réinstallez Node.js depuis nodejs.org

### ❌ **Port 5173 déjà utilisé**
```bash
npm run dev -- --port 3000
```

### ❌ **Erreurs de dépendances**
```bash
rm -rf node_modules package-lock.json
npm install
```

### ❌ **Google Maps ne s'affiche pas**
- Vérifiez votre clé API dans `index.html`
- Activez les APIs nécessaires dans Google Console

---

## 📞 **SUPPORT**

Si vous rencontrez des problèmes :

1. **Vérifiez les prérequis** (Node.js version)
2. **Consultez la console** (F12 dans le navigateur)
3. **Redémarrez VS Code** et le terminal
4. **Supprimez node_modules** et réinstallez

---

## 📄 **STRUCTURE DU PROJET**

```
jackup-garage-site/
├── public/                 # Fichiers statiques
│   ├── logo.png           # Logo principal
│   ├── *.jpg              # Photos de services
│   ├── robots.txt         # SEO
│   └── sitemap.xml        # Plan du site
├── src/
│   ├── components/        # Composants React
│   │   ├── Header.tsx     # En-tête navigation
│   │   ├── Hero.tsx       # Section d'accueil
│   │   ├── Services.tsx   # Services proposés
│   │   ├── Gallery.tsx    # Galerie photos
│   │   ├── Contact.tsx    # Formulaire contact
│   │   └── ...
│   ├── App.tsx           # Application principale
│   ├── main.tsx          # Point d'entrée
│   └── index.css         # Styles globaux
├── package.json          # Dépendances
├── vite.config.ts        # Configuration Vite
└── README.md            # Ce fichier
```

---

## ✅ **CHECKLIST DE DÉMARRAGE**

- [ ] Node.js installé (version 18+)
- [ ] VS Code installé avec extensions
- [ ] Projet ouvert dans VS Code
- [ ] `npm install` exécuté avec succès
- [ ] `npm run dev` fonctionne
- [ ] Site accessible sur http://localhost:5173
- [ ] Clé Google Maps configurée
- [ ] Informations de contact personnalisées
- [ ] Logo remplacé
- [ ] Photos de services mises à jour

**🎉 Félicitations ! Votre site Jack Up Garage est prêt !**