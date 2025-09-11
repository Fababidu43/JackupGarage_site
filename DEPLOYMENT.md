# 🚀 GUIDE DE DÉPLOIEMENT GRATUIT
## Jack Up Garage - Mise en Production

Ce guide vous explique comment mettre votre site en ligne **GRATUITEMENT** sur Netlify ou GitHub Pages.

---

## 🎯 **OPTION 1 : NETLIFY (RECOMMANDÉ)**

### ✅ **Avantages Netlify :**
- 🆓 **100% Gratuit** (jusqu'à 100GB/mois)
- ⚡ **Ultra rapide** (CDN mondial)
- 🔄 **Déploiement automatique** depuis GitHub
- 🌐 **Domaine personnalisé** gratuit
- 📱 **HTTPS automatique**
- 🔧 **Formulaires** intégrés

---

### 📋 **MÉTHODE A : Déploiement Direct (Plus Simple)**

#### **ÉTAPE 1 : Préparer les fichiers**

1. **Ouvrez VS Code** avec votre projet
2. **Ouvrez le terminal** (`Ctrl + ù`)
3. **Construisez le site** :
```bash
npm run build
```
4. **Vérifiez** que le dossier `dist/` est créé

#### **ÉTAPE 2 : Créer un compte Netlify**

1. Allez sur **https://netlify.com**
2. Cliquez sur **"Sign up"**
3. Créez un compte (email + mot de passe)
4. Confirmez votre email

#### **ÉTAPE 3 : Déployer le site**

1. **Connectez-vous** à Netlify
2. Sur le tableau de bord, **glissez-déposez** le dossier `dist/` directement sur la zone :
   ```
   "Want to deploy a new site without connecting to Git?
   Drag and drop your site output folder here"
   ```
3. **Attendez** le déploiement (30 secondes)
4. **Votre site est en ligne !** 🎉

#### **ÉTAPE 4 : Personnaliser l'URL**

1. Cliquez sur **"Site settings"**
2. Allez dans **"Change site name"**
3. Tapez : `jackup-garage-43` (ou votre choix)
4. **Votre site** : `https://jackup-garage-43.netlify.app`

---

### 📋 **MÉTHODE B : Déploiement Automatique GitHub (Avancé)**

#### **ÉTAPE 1 : Créer un dépôt GitHub**

1. Allez sur **https://github.com**
2. Créez un compte si nécessaire
3. Cliquez sur **"New repository"**
4. Nom : `jackup-garage-site`
5. ✅ Cochez **"Public"**
6. Cliquez **"Create repository"**

#### **ÉTAPE 2 : Pousser le code sur GitHub**

Dans VS Code, terminal :

```bash
# Initialiser Git (si pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit - Jack Up Garage"

# Connecter à GitHub (remplacez VOTRE-USERNAME)
git remote add origin https://github.com/VOTRE-USERNAME/jackup-garage-site.git

# Pousser le code
git push -u origin main
```

#### **ÉTAPE 3 : Connecter Netlify à GitHub**

1. Sur **Netlify**, cliquez **"New site from Git"**
2. Choisissez **"GitHub"**
3. **Autorisez** Netlify à accéder à GitHub
4. Sélectionnez **"jackup-garage-site"**
5. **Configuration** :
   - Branch : `main`
   - Build command : `npm run build`
   - Publish directory : `dist`
6. Cliquez **"Deploy site"**

#### **ÉTAPE 4 : Déploiement automatique**

✅ **Maintenant** : Chaque fois que vous modifiez le code et faites :
```bash
git add .
git commit -m "Mes modifications"
git push
```
**Le site se met à jour automatiquement !** 🚀

---

## 🎯 **OPTION 2 : GITHUB PAGES**

### ✅ **Avantages GitHub Pages :**
- 🆓 **100% Gratuit**
- 🔗 **Intégré à GitHub**
- 🌐 **URL : votre-username.github.io**

### ⚠️ **Limitations :**
- Pas de formulaires backend
- Moins rapide que Netlify
- Configuration plus complexe

---

### 📋 **DÉPLOIEMENT GITHUB PAGES**

#### **ÉTAPE 1 : Préparer le projet**

1. **Créez** le fichier `.github/workflows/deploy.yml` :

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

#### **ÉTAPE 2 : Modifier vite.config.ts**

Ajoutez la base URL :

```typescript
export default defineConfig({
  base: '/jackup-garage-site/', // Nom de votre repo
  plugins: [react()],
  // ... reste de la config
});
```

#### **ÉTAPE 3 : Pousser sur GitHub**

```bash
git add .
git commit -m "Setup GitHub Pages deployment"
git push
```

#### **ÉTAPE 4 : Activer GitHub Pages**

1. Sur **GitHub**, allez dans votre repo
2. **Settings** → **Pages**
3. Source : **"GitHub Actions"**
4. **Attendez** le déploiement
5. **Votre site** : `https://votre-username.github.io/jackup-garage-site`

---

## 🔧 **CONFIGURATION AVANCÉE**

### 🌐 **Domaine Personnalisé (Netlify)**

#### **Si vous avez un domaine (ex: jackupgarage.fr) :**

1. **Netlify** → **Domain settings**
2. **Add custom domain** → `jackupgarage.fr`
3. **Chez votre registrar** (OVH, Gandi...) :
   - Type : `CNAME`
   - Nom : `@` ou `www`
   - Valeur : `votre-site.netlify.app`
4. **Attendez** la propagation DNS (24h max)

### 📧 **Formulaires Netlify**

Pour que le formulaire de contact fonctionne :

1. **Ajoutez** `netlify` dans le form HTML :
```html
<form netlify name="contact">
```

2. **Netlify** gère automatiquement les soumissions !

---

## 🚀 **OPTIMISATIONS PRODUCTION**

### ⚡ **Variables d'environnement**

Créez `.env.production` :
```
VITE_GOOGLE_MAPS_API_KEY=votre-clé-google-maps
VITE_SITE_URL=https://votre-site.netlify.app
```

### 🔍 **SEO Final**

1. **Google Search Console** :
   - Ajoutez votre site
   - Soumettez le sitemap : `https://votre-site.com/sitemap.xml`

2. **Google My Business** :
   - Créez votre fiche entreprise
   - Liez votre site web

---

## 📱 **FONCTIONNALITÉS SPÉCIALES**

### 🎯 **Popup de Devis Intelligent**
- Géolocalisation automatique
- Vérification de zone de couverture
- Envoi par WhatsApp/SMS

### 📸 **Galerie Administrable (avec Supabase)**
La galerie de photos est désormais entièrement administrable par votre client, sans aucune intervention de votre part une fois le site déployé.

- **Accès Admin** :
  - **Raccourci secret** : Sur la page "Galerie", utilisez la combinaison de touches `Ctrl+Shift+Alt+G+A+L` (G-A-L pour Galerie Admin Login).
  - **Code admin** : `43BENJI43` (peut être modifié dans le code source si nécessaire).
- **Fonctionnalités pour le client** :
  - **Ajout de photos** : Votre client peut glisser-déposer ou sélectionner plusieurs images à la fois. Le système valide automatiquement les images (format, taille max 5MB, résolution min 300x300px), les optimise pour le web, génère des miniatures et les stocke de manière sécurisée sur Supabase.
  - **Gestion de la visibilité** : Chaque photo peut être masquée ou affichée publiquement sur le site.
  - **Suppression de photos** : Possibilité de supprimer définitivement des images.
  - **Détection des doublons** : Le système empêche l'upload de photos identiques déjà présentes.
- **Stockage** : Toutes les photos sont stockées dans votre base de données Supabase, garantissant leur persistance et leur visibilité pour tous les visiteurs du site.

### 🗺️ **Carte Interactive**
- Zones de couverture colorées
- Vérificateur d'adresse en temps réel
- Calcul automatique des distances

---

## ✅ **CHECKLIST DE DÉPLOIEMENT**

### **Avant déploiement :**
- [ ] `npm run build` fonctionne sans erreur
- [ ] Toutes les images sont présentes
- [ ] Clé Google Maps configurée
- [ ] Informations de contact mises à jour
- [ ] Logo personnalisé ajouté

### **Après déploiement :**
- [ ] Site accessible et rapide
- [ ] Formulaire de contact testé
- [ ] Carte Google Maps fonctionne
- [ ] Version mobile testée
- [ ] SEO vérifié (Google Search Console)

---

## 🆘 **RÉSOLUTION DE PROBLÈMES**

### ❌ **"Build failed" sur Netlify**
```bash
# Localement, vérifiez :
npm run build
# Si erreur, corrigez puis redéployez
```

### ❌ **Images ne s'affichent pas**
- Vérifiez que les images sont dans `public/`
- Chemins : `/image.jpg` (pas `./image.jpg`)

### ❌ **Google Maps ne fonctionne pas**
- Vérifiez la clé API dans `index.html`
- Activez les APIs dans Google Console
- Ajoutez votre domaine aux restrictions

### ❌ **Site lent**
- Activez la compression dans Netlify
- Optimisez les images (WebP)
- Vérifiez PageSpeed Insights

---

## 📞 **SUPPORT DÉPLOIEMENT**

### **Ressources utiles :**
- 📖 **Netlify Docs** : https://docs.netlify.com
- 📖 **GitHub Pages** : https://pages.github.com
- 🎥 **Tutoriels YouTube** : "Netlify deployment"

### **En cas de problème :**
1. Vérifiez les logs de build
2. Testez `npm run build` localement
3. Consultez la documentation officielle
4. Communauté Discord/Reddit

---

## 🎉 **FÉLICITATIONS !**

Votre site **Jack Up Garage** est maintenant en ligne et accessible au monde entier !

**Prochaines étapes recommandées :**
1. 🔍 **Google My Business** - Créez votre fiche
2. 📊 **Google Analytics** - Suivez vos visiteurs  
3. 📈 **Google Search Console** - Optimisez votre SEO
4. 📱 **Test mobile** - Vérifiez sur différents appareils

**🚀 Votre site est prêt à attirer des clients en Haute-Loire !**