# 🚀 Déploiement JACK Up Auto

## Netlify (5 minutes)

### 1. Build
```bash
npm run build
```

### 2. Déployer
- Allez sur [netlify.com](https://netlify.com)
- Glissez-déposez le dossier `dist/`
- ✅ Site en ligne !

### 3. Variables d'environnement
Dans Netlify → Site settings → Environment variables :
```
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre_cle_anon
VITE_GOOGLE_MAPS_KEY=votre_cle_google_maps
VITE_SITE_URL=https://www.jackup-auto.fr
```

### 4. Domaine personnalisé (optionnel)
- Site settings → Domain management
- Add custom domain → `jackupgarage.fr`

## Vercel (Alternative)

1. Connectez votre repo GitHub
2. Déployez automatiquement
3. Ajoutez les variables d'environnement

## ✅ Checklist finale

- [ ] Variables Supabase configurées
- [ ] Variables d'environnement configurées
- [ ] Clé Google Maps configurée
- [ ] Téléphone personnalisé
- [ ] Logo remplacé
- [ ] Test du formulaire de contact
- [ ] Test de la galerie admin
- [ ] Variables d'environnement en production

**🎉 Votre site est prêt à attirer des clients !**