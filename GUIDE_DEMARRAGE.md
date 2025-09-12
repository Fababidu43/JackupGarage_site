# 🚀 Guide de Démarrage - Jack Up Garage

## Étapes pour lancer le site en développement

### 1. Prérequis
- Node.js (version 18 ou plus récente)
- Un éditeur de code (VS Code recommandé)
- Un navigateur web moderne

### 2. Installation des dépendances
```bash
npm install
```

### 3. Configuration des variables d'environnement
Créer un fichier `.env` à la racine du projet avec le contenu suivant :
```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Maps API Key
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

**Important :** Remplacez les valeurs par vos vraies clés :
- `your_supabase_project_url` : URL de votre projet Supabase
- `your_supabase_anon_key` : Clé anonyme de votre projet Supabase
- `your_google_maps_api_key` : Clé API Google Maps

### 4. Configuration Supabase
1. Créez un compte sur [Supabase](https://supabase.com)
2. Créez un nouveau projet
3. Récupérez l'URL et la clé anonyme dans Settings > API
4. Exécutez les migrations SQL présentes dans le dossier `supabase/migrations/`

### 5. Configuration Google Maps
1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un projet ou sélectionnez un projet existant
3. Activez les APIs suivantes :
   - Maps JavaScript API
   - Places API
   - Geocoding API
4. Créez une clé API et ajoutez-la au fichier `.env`

### 6. Lancement du serveur de développement
```bash
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

### 7. Fonctionnalités administrateur de la galerie

#### Accès admin :
- **Méthode 1 :** Raccourci clavier `Ctrl+Shift+Alt+G+A+L` sur la page galerie
- **Méthode 2 :** Petit point discret en bas à droite du footer (très peu visible)

#### Comptes administrateurs configurés :
- Email : `benjamin.froussard@outlook.fr` - Mot de passe : `43benji43`
- Email : `fabian.measson123@gmail.com` - Mot de passe : `43benji43`

#### Fonctionnalités admin :
- Ajout de photos (glisser-déposer ou sélection multiple)
- Gestion de la visibilité des photos
- Suppression de photos
- Statistiques de la galerie
- Détection automatique des doublons

### 8. Structure du projet
```
src/
├── components/          # Composants React
│   ├── Header.tsx      # Navigation
│   ├── Hero.tsx        # Section d'accueil
│   ├── Gallery.tsx     # Galerie avec admin
│   ├── Contact.tsx     # Formulaire de contact
│   └── ...
├── lib/                # Services et utilitaires
│   ├── supabase.ts     # Configuration Supabase
│   ├── galleryService.ts # Service galerie
│   └── imageProcessor.ts # Traitement d'images
└── index.css           # Styles globaux
```

### 9. Commandes utiles
```bash
# Développement
npm run dev

# Build de production
npm run build

# Prévisualisation du build
npm run preview

# Vérification du code
npm run lint
```

### 10. Déploiement
Le site peut être déployé sur :
- Netlify (recommandé)
- Vercel
- GitHub Pages
- Tout hébergeur supportant les sites statiques

Voir le fichier `DEPLOYMENT.md` pour les instructions détaillées.

### 11. Résolution de problèmes courants

#### Erreur "Variables d'environnement Supabase manquantes"
- Vérifiez que le fichier `.env` existe et contient les bonnes valeurs
- Redémarrez le serveur de développement après modification du `.env`

#### Google Maps ne s'affiche pas
- Vérifiez que la clé API Google Maps est correcte
- Assurez-vous que les APIs nécessaires sont activées dans Google Cloud Console

#### Problèmes d'upload d'images
- Vérifiez la configuration Supabase Storage
- Assurez-vous que le bucket `gallery-images` existe et est public

### 12. Support
En cas de problème :
1. Vérifiez la console du navigateur (F12)
2. Consultez les logs du serveur de développement
3. Vérifiez que toutes les dépendances sont installées
4. Redémarrez le serveur de développement

---

**🎉 Votre site Jack Up Garage est maintenant prêt à fonctionner !**