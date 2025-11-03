# Configuration Google Ads - Documentation

## ✅ Configuration Complète

Les balises Google Ads ont été intégrées avec succès dans votre site web.

### 1. Balise Google Ads (gtag.js)

**Emplacement :** `index.html` (entre les balises `<head></head>`)

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

**Statut :** ✅ Installée et active sur toutes les pages

### 2. Événement de Conversion

**ID de conversion :** `AW-17610625083/8JZMCP_iiLQbELugs81B`

L'événement de conversion est déclenché automatiquement dans les situations suivantes :

#### A. Formulaire de Contact (Contact.tsx)
- **Déclencheur :** Envoi réussi du formulaire de contact
- **Emplacement :** Section "Contact" en bas de page
- **Code :** Ligne 65-70 de `src/components/Contact.tsx`

```typescript
// Déclencher l'événement de conversion Google Ads
if (typeof window !== 'undefined' && (window as any).gtag) {
  (window as any).gtag('event', 'conversion', {
    'send_to': 'AW-17610625083/8JZMCP_iiLQbELugs81B'
  });
  console.log('📊 Événement de conversion Google Ads déclenché');
}
```

#### B. Popup de Devis (QuotePopup.tsx)
- **Déclencheur :** Envoi réussi d'une demande de devis
- **Emplacement :** Popup qui s'ouvre via les boutons "Demander un devis"
- **Code :** Ligne 269-274 de `src/components/QuotePopup.tsx`

**Statut :** ✅ Configuré et fonctionnel

## 📊 Vérification du Fonctionnement

### Comment tester ?

1. **Ouvrez votre site web en navigation privée**
2. **Ouvrez la console développeur** (F12)
3. **Remplissez et envoyez un formulaire** (Contact ou Demande de devis)
4. **Vérifiez dans la console :** Vous devriez voir le message `📊 Événement de conversion Google Ads déclenché`

### Vérification dans Google Ads

1. Connectez-vous à [Google Ads](https://ads.google.com)
2. Allez dans **Outils et paramètres** → **Mesure** → **Conversions**
3. Cliquez sur votre conversion "Contact"
4. Vous devriez voir dans la section **État** : "Enregistrement des conversions"

⚠️ **Important :** Les conversions peuvent prendre jusqu'à 24 heures pour apparaître dans Google Ads.

## 🎯 Points de Conversion Configurés

| Point de conversion | Emplacement | Déclencheur |
|-------------------|-------------|-------------|
| Formulaire de contact | Section Contact | Envoi réussi |
| Demande de devis | Popup (bouton CTA) | Envoi réussi |

## 🔍 Données Collectées

Les événements de conversion permettent de suivre :
- ✅ Nombre de formulaires de contact envoyés
- ✅ Nombre de demandes de devis
- ✅ Taux de conversion des visiteurs
- ✅ Efficacité des campagnes publicitaires

## 🛡️ Confidentialité et RGPD

Les balises Google Ads respectent :
- Le RGPD (Règlement Général sur la Protection des Données)
- Les cookies sont gérés via le système Google
- Aucune donnée personnelle n'est envoyée directement à Google Ads via ces événements

## 🚀 Prochaines Étapes

1. **Créez vos campagnes Google Ads**
2. **Définissez un budget**
3. **Suivez vos conversions** dans le tableau de bord Google Ads
4. **Optimisez vos annonces** en fonction des données de conversion

## 📞 Support

Si vous rencontrez des problèmes :
- [Centre d'aide Google Ads](https://support.google.com/google-ads)
- Vérification du suivi : [Google Tag Assistant](https://tagassistant.google.com/)

---

✅ **Configuration terminée avec succès !**

Votre site est maintenant prêt à suivre les conversions Google Ads.
