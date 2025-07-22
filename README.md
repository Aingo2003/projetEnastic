# EcoWatch - Plateforme de Gestion Environnementale

## Description
EcoWatch est une plateforme collaborative de gestion environnementale permettant aux utilisateurs de signaler des événements climatiques, partager des bonnes pratiques et collaborer sur des projets environnementaux locaux.

## Fonctionnalités

### Pour tous les utilisateurs
- **Signalement d'événements** : Signaler des événements climatiques avec géolocalisation automatique
- **Carte interactive** : Visualiser les événements signalés sur une carte
- **Bonnes pratiques** : Partager et consulter des bonnes pratiques environnementales
- **Recommandations IA** : Recevoir des recommandations personnalisées basées sur la localisation
- **Messagerie interne** : Communiquer avec d'autres utilisateurs pour des projets collaboratifs
- **Notifications** : Recevoir des alertes pour les événements critiques dans votre région
- **Groupes communautaires** : Créer et rejoindre des groupes d'action environnementale locaux

### Pour les administrateurs
- **Gestion des utilisateurs** : Ajouter de nouveaux administrateurs
- **Tableau de bord analytique** : Visualiser les tendances avec des graphiques interactifs
- **Rapports automatisés** : Générer et exporter des rapports PDF des analyses environnementales

## Installation et Exécution

### Prérequis
- Navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Connexion internet (pour les CDN et l'API Trickle)

### Exécution en local
1. Téléchargez tous les fichiers du projet
2. Ouvrez le fichier `index.html` dans votre navigateur web
3. L'application se lancera automatiquement

### Exécution en ligne
1. Hébergez les fichiers sur un serveur web (GitHub Pages, Netlify, Vercel, etc.)
2. Accédez à l'URL de votre hébergement

## Structure du projet
```
ecowatch/
├── index.html              # Page principale
├── app.js                  # Application principale
├── components/             # Composants React
│   ├── Header.js
│   ├── Login.js
│   ├── UserProfile.js
│   ├── ReportEvent.js
│   ├── EventMap.js
│   ├── BestPractices.js
│   ├── AIRecommendations.js
│   ├── Messaging.js
│   ├── AdminDashboard.js
│   ├── Analytics.js
│   ├── Notifications.js
│   ├── Reports.js
│   └── CommunityGroups.js
└── utils/                  # Utilitaires
    ├── database.js
    ├── aiAgent.js
    ├── geolocation.js
    └── storage.js
```

## Technologies utilisées
- **Frontend** : React 18, TailwindCSS, Lucide Icons
- **Graphiques** : Chart.js
- **Base de données** : Trickle Database API
- **IA** : Agent IA intégré pour les recommandations
- **Géolocalisation** : API Geolocation + BigDataCloud

## Configuration

### Compte administrateur par défaut
- Email : admin@ecowatch.com
- Permissions : Super Admin

### API externes
- Géocodage inverse : BigDataCloud API (gratuit)
- Base de données : Trickle API

## Responsive Design
L'application est entièrement responsive et s'adapte aux différentes tailles d'écran :
- **Desktop** : Navigation complète avec toutes les fonctionnalités
- **Tablet** : Interface adaptée avec navigation compacte
- **Mobile** : Menu hamburger et interface optimisée pour le tactile

## Fonctionnalités avancées

### Notifications Push
- Alertes automatiques pour les événements critiques
- Notifications basées sur la géolocalisation
- Système de préférences utilisateur

### Rapports automatisés
- Génération de rapports PDF
- Analyses temporelles et géographiques
- Export de données statistiques

### Groupes communautaires
- Création de groupes locaux
- Gestion de projets collaboratifs
- Système de messagerie de groupe

## Support et Contact
Pour toute question ou suggestion, contactez l'équipe EcoWatch.

## Licence
Ce projet est sous licence MIT.