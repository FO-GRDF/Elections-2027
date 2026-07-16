# FO GRDF Fonctions Centrales — Élections CSE 2027

Tout le travail de campagne est regroupé dans ce dossier. Site en ligne : **https://fo-grdf.github.io/Elections-2027/**

> Maquette évolutive : les profils des régions (hors Fonctions Centrales) sont encore fictifs, à valider par le collectif.

## 📂 Où trouver quoi

```
Elections-2027/
├── index.html                    Accueil : carte de France GRDF interactive (6 régions + FC),
│                                 sites réels au survol, candidats flip, section CSE, countdown
├── propositions.html             Les 3+3 propositions de design (choix retenus : vitrine magazine
│                                 + mur de l'équipe, badges verts « Choix retenu »)
├── presentation.html             Page de présentation du projet au collectif
│
├── militants/
│   ├── mickael-lopes.html        Fiche vitrine de Mickaël (modèle retenu pour tous les candidats)
│   └── militant.html             Ancien gabarit générique
│
├── regions/
│   └── region.html               Page régionale dynamique (?r=fc, ?r=sud-est…) : onglets des
│                                 7 syndicats FO, mini-carte, équipe réelle FC, candidats, sites NTIC
│
├── affiches/                     ★ AFFICHES DE CAMPAGNE (HTML modifiable + PDF prêt à imprimer)
│   ├── affiche-mickael-fo.html/.pdf        Gabarit RETENU — Mickaël (Exécution = ROUGE)
│   ├── affiche-carine-brusson.html/.pdf    Carine (Maîtrise = VERT)
│   ├── affiche-celine-le-bec.html/.pdf     Céline (Maîtrise = VERT)
│   ├── affiche-helene-wallyn.html/.pdf     Hélène (Cadre = BLEU)
│   ├── affiche-1-pinceau / 2-nuit / 3-arche  Les 3 propositions initiales (mémoire)
│   └── formulaire-fiche-candidat.docx      ★ Questionnaire à recopier dans Microsoft Forms
│                                             pour collecter les infos des futurs candidats
│
├── assets/
│   ├── css/fo-2027.css           Design system complet (charte FO)
│   ├── js/fo-2027.js             Interactivité (carte, tooltips, flip, rayonnement FC…)
│   ├── js/regions-data.js        ★ DONNÉES des 7 syndicats : équipes, candidats, priorités
│   │                               → c'est ICI qu'on met à jour les profils
│   ├── js/sites-data.js          Les 52 sites réels FC géolocalisés (agrégats NTIC mars 2026)
│   └── img/
│       ├── equipe/               Photos détourées des 7 militants (celle de Carine : carine-detouree.png)
│       └── logo-fo-energie.jpg   Logo FO Énergie GRDF (affiches)
│
└── sources/                      ⚠ SOURCES CONFIDENTIELLES — exclues de GitHub (.gitignore)
    ├── Fichier-NTIC-mars-2026.xlsx          Fichier électoral nominatif (2 204 électeurs)
    ├── affiche-2023-Carine-Brusson.pdf      Affiches 2023 de référence
    ├── affiche-2023-Helene-Wallyn.pdf
    └── photos-brutes/                        Photos originales des 7 militants
```

## 🎨 Décisions actées

- **Découpage carte** : les 6 vraies régions GRDF (Nord-Ouest, IDF, Est+BFC, Centre-Ouest, Sud-Ouest, Sud-Est) + Fonctions Centrales à Saint-Denis avec rayonnement national animé. Sans la Corse.
- **Fiche individuelle** : style « vitrine magazine » (modèle = fiche de Mickaël).
- **Présentation d'équipe** : « mur de l'équipe » (en place sur la page FC).
- **Affiches** : gabarit clair couleurs FO, code couleur par collège → **Exécution rouge · Maîtrise vert · Cadre bleu**.
- **Prénom** : Mickaël (jamais « Michael »).

## 🔁 Gestes courants

- **Mettre à jour un profil / une équipe** : éditer `assets/js/regions-data.js`, pousser.
- **Créer l'affiche d'un candidat** : dupliquer `affiches/affiche-mickael-fo.html`, changer collège/couleur, textes (3 cartes ≤150 caractères, citation ≤110), photo détourée.
- **PDF d'une affiche** (qualité parfaite) : ouvrir le HTML dans Chrome → Ctrl+P → A4, marges « Aucune », cocher « Graphiques d'arrière-plan ». (Ou en ligne de commande : `chrome --headless --no-pdf-header-footer --print-to-pdf=...`.)
- **Collecter les infos candidats** : recopier `affiches/formulaire-fiche-candidat.docx` dans Microsoft Forms ; l'export Excel des réponses permet de générer fiches + affiches en série.
- **Avant tout push** : vérifier qu'aucun submodule fantôme ne traîne (`git ls-files -s | grep 160000` doit être vide) — c'était la cause des mails d'échec GitHub Pages. Garder `.nojekyll`.

## ✨ Effets interactifs du site

- **« Trouve ton élection en 10 secondes »** (audit du conseil des 5, 07/2026) : wizard 2 questions en tête de page — l'entité RH détermine le périmètre, pas la géographie. Recherche par site en secours (avec avertissement UM), résultat animé + confettis, mémorisation localStorage + bandeau de retour, partage natif mobile. QR codes par périmètre dans `affiches/qr/` (⚠ ne rien imprimer avant le protocole préélectoral).
- Carte de France géographique réelle avec tooltip, clavier, panneau dynamique et **sites réels par région** (52 sites FC, taille selon effectif)
- **Rayonnement Fonctions Centrales** : ondes animées depuis Saint-Denis + halo national
- Cartes candidats à retourner (flip 3D) filtrables par collège, emplacements vidéo YouTube
- Section « Comprendre le vote » (2 emplacements vidéo + FAQ CSE)
- Compte à rebours, compteurs animés, reveal au scroll, mode lecture universelle

## 📧 Contact

Toutes les communications transitent par : **syndicat-fo_grdf-delegations-nationales@grdf.fr**

---

*© 2026 FO GRDF · Document de travail — données candidats FC réelles (avec autorisations), autres régions fictives*
