# FO GRDF 2027 — Plateforme digitale

Plateforme nationale de communication pour les **élections professionnelles FO GRDF 2027**.

> Maquette concept à présenter au collectif. Tous les noms, photos et témoignages sont fictifs et destinés à valider la structure du support.

## 📂 Structure

```
Elections 2027/
├── index.html              Page d'accueil nationale (carte interactive)
├── presentation.html       Page de présentation au collectif
├── regions/
│   └── region.html         Page régionale (Sud-Est par défaut)
├── militants/
│   └── militant.html       Fiche militante individuelle
├── assets/
│   ├── css/fo-2027.css     Design system (charte FO)
│   └── js/fo-2027.js       Interactivité (carte, compteurs, parallax)
└── README.md
```

## 🎨 Charte respectée

Cette maquette respecte intégralement la charte FO GRDF :

- **Palette** : bleu `#019cda`, or `#f7dd5c`, gradient bleu→bleu foncé, rouge FO `#c0303a`
- **Typographie** : Fraunces (titres), DM Sans (corps), Atkinson Hyperlegible (a11y)
- **Composants** : header gradient bleu, badge or, `.fo-contact-card` rouge avant footer, mailto direct
- **Mode lecture universelle** (bouton flottant en bas à droite)

## ✨ Effets interactifs

- **Carte de France géographique réelle** (contours des 13 régions administratives, groupées en 7 territoires FO + pin Fonctions Centrales), avec tooltip au survol, navigation clavier et panneau d'information dynamique
- **Cartes candidats à retourner** (flip 3D) pour les 3 collèges — exécution, maîtrise, cadre — avec filtres par collège et emplacement vidéo YouTube par candidat
- **Section « Comprendre le vote »** : 2 emplacements vidéo pédagogiques (pourquoi voter, le CSE en 3 min) + FAQ accordéon
- Compte à rebours animé jusqu'aux élections de novembre 2027
- Compteurs animés au scroll (statistiques)
- Reveal animations au défilement
- Curseur personnalisé sur desktop
- Parallaxe et gradients animés sur les hero
- Tilt 3D sur les cartes "Pourquoi nous choisir"
- Navigation avec barre de progression de lecture

## 🚀 Hébergement GitHub Pages

```bash
# 1. Créer un repo sur github.com nommé "fo-grdf-2027"

# 2. Depuis ce dossier :
git init
git add .
git commit -m "Maquette concept FO GRDF 2027"
git branch -M main
git remote add origin https://github.com/<TON_USER>/fo-grdf-2027.git
git push -u origin main

# 3. Sur github.com, Settings → Pages → Source: main / root → Save
# La maquette sera publiée à https://<TON_USER>.github.io/fo-grdf-2027/
```

## 📧 Contact

Toutes les communications transitent par : **syndicat-fo_grdf-delegations-nationales@grdf.fr**

---

*© 2026 FO GRDF · Document de travail interne · Données fictives*
