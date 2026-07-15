/* ════════════════════════════════════════════════════════════
   FO GRDF 2027 — Données des 7 syndicats FO
   (6 régions GRDF + Fonctions Centrales)
   Un syndicat Force Ouvrière par région : les représentants
   et les listes sont propres à chaque territoire.
   Données fictives — maquette à valider par le collectif.
   ════════════════════════════════════════════════════════════ */
window.FO_REGIONS = {
  'nord-ouest': {
    name: 'Nord-Ouest',
    color: '#29b0d5',
    capital: 'Lille',
    eyebrow: 'Région GRDF · Hauts-de-France & Normandie',
    heroTitle: 'au cœur du Grand Nord.',
    heroLead: 'De Lille au Havre en passant par Amiens, Rouen et Caen, une équipe ancrée dans le tissu industriel et portuaire du Grand Nord. Découvrez vos représentants et sachez à qui vous adresser.',
    syndicat: 'Syndicat FO GRDF Nord-Ouest',
    syndicatDesc: 'Le syndicat régional couvre l’ensemble des sites GRDF des Hauts-de-France et de Normandie. Ses représentants sont élus par et pour les salariés de la région : ce sont eux, et personne d’autre, qui figureront sur la liste Nord-Ouest en 2027.',
    secretaire: { initials: 'PL', name: 'Pierre L.', role: 'Secrétaire régional FO GRDF Nord-Ouest' },
    mailSubject: 'Contact FO GRDF Nord-Ouest',
    sites: ['Lille', 'Amiens', 'Rouen', 'Le Havre', 'Caen', 'Dunkerque', 'Beauvais'],
    stats: { militants: 9, sites: 8, perm: 3 },
    candidats: [
      { initials: 'AR', college: 'Exécution', name: 'Antoine R.', role: 'Tête de liste exécution · Lille', meta: 'Technicien Intervention Gaz · 12 ans d’ancienneté', quote: '« Quand un collègue a un souci, il doit savoir vers qui se tourner. C’est ça, être élu du personnel. »' },
      { initials: 'CM', college: 'Maîtrise', name: 'Céline M.', role: 'Tête de liste maîtrise · Rouen', meta: 'Responsable d’équipe clientèle · 15 ans d’ancienneté', quote: '« La maîtrise tient les équipes à bout de bras. Il est temps que ça se voie dans les parcours. »' },
      { initials: 'FD', college: 'Cadre', name: 'François D.', role: 'Tête de liste cadre · Lille', meta: 'Chef de projet réseau · 10 ans d’ancienneté', quote: '« Un CSE fort, c’est une direction qui doit rendre des comptes. J’y veillerai. »' }
    ],
    priorites: [
      { title: 'Emploi industriel régional', text: 'Défendre les sites et l’emploi gazier dans les bassins industriels du Nord et de la Normandie.' },
      { title: 'Conditions d’intervention', text: 'Météo, distances, zones denses : obtenir des moyens adaptés aux réalités du terrain régional.' },
      { title: 'Reconnaissance des astreintes', text: 'Une rémunération et une organisation des astreintes à la hauteur des contraintes réelles.' },
      { title: 'Proximité syndicale', text: 'Des permanences régulières sur chaque site, de Dunkerque à Caen.' }
    ]
  },

  'idf': {
    name: 'Île-de-France',
    color: '#e8c93f',
    capital: 'Paris',
    eyebrow: 'Région GRDF · Paris & Couronne',
    heroTitle: 'au cœur de la métropole.',
    heroLead: 'Cœur d’activité de GRDF, l’Île-de-France concentre les enjeux les plus stratégiques : densité urbaine, chantiers du Grand Paris, pression immobilière sur les sites. Votre équipe FO connaît ces réalités.',
    syndicat: 'Syndicat FO GRDF Île-de-France',
    syndicatDesc: 'Le syndicat régional rassemble les militants FO de Paris et de toute la couronne francilienne. Ses représentants, élus par les salariés d’Île-de-France, composeront la liste régionale en 2027.',
    secretaire: { initials: 'SL', name: 'Sophie L.', role: 'Secrétaire régionale FO GRDF Île-de-France' },
    mailSubject: 'Contact FO GRDF Île-de-France',
    sites: ['Paris', 'Nanterre', 'Créteil', 'Versailles', 'Cergy', 'Melun', 'Bobigny'],
    stats: { militants: 15, sites: 7, perm: 4 },
    candidats: [
      { initials: 'KD', college: 'Exécution', name: 'Karim D.', role: 'Tête de liste exécution · Paris', meta: 'Technicien Gaz · 9 ans d’ancienneté', quote: '« Intervenir dans Paris, c’est un métier à part. Il mérite une reconnaissance à part entière. »' },
      { initials: 'SL', college: 'Maîtrise', name: 'Sophie L.', role: 'Tête de liste maîtrise · Nanterre', meta: 'Manager d’équipe exploitation · 14 ans d’ancienneté', quote: '« Encadrer, c’est aussi protéger. Je veux que la charge réelle de la maîtrise soit enfin reconnue. »' },
      { initials: 'JB', college: 'Cadre', name: 'Julien B.', role: 'Tête de liste cadre · Paris', meta: 'Ingénieur études · 11 ans d’ancienneté', quote: '« Forfait jours maîtrisé, charge mentale, transparence : les cadres aussi ont besoin d’un contre-pouvoir. »' }
    ],
    priorites: [
      { title: 'Logement & pouvoir d’achat', text: 'Faire peser le coût de la vie francilienne dans les négociations salariales et d’aides au logement.' },
      { title: 'Temps de trajet', text: 'Obtenir la prise en compte réelle des déplacements en zone dense dans le temps de travail.' },
      { title: 'Maintien des sites franciliens', text: 'Refuser les regroupements immobiliers qui éloignent les salariés de leur lieu de vie.' },
      { title: 'Santé & sécurité en zone urbaine', text: 'Renforcer la prévention sur les chantiers denses et les interventions sensibles.' }
    ]
  },

  'est': {
    name: 'Est',
    color: '#b81f6e',
    capital: 'Nancy',
    eyebrow: 'Région GRDF · Grand Est & Bourgogne-Franche-Comté',
    heroTitle: 'de Nancy à Dijon.',
    heroLead: 'Du Grand Est à la Bourgogne-Franche-Comté, une région transfrontalière aux hivers exigeants, des métiers techniques pointus et des combats sociaux structurants. Votre équipe FO est sur le terrain.',
    syndicat: 'Syndicat FO GRDF Est',
    syndicatDesc: 'Le syndicat régional couvre le Grand Est et la Bourgogne-Franche-Comté : Nancy, Strasbourg, Metz, Reims, Dijon, Besançon. Ses représentants, élus localement, porteront la liste Est en 2027.',
    secretaire: { initials: 'MD', name: 'Marc D.', role: 'Secrétaire régional FO GRDF Est' },
    mailSubject: 'Contact FO GRDF Est',
    sites: ['Nancy', 'Strasbourg', 'Metz', 'Reims', 'Mulhouse', 'Dijon', 'Besançon'],
    stats: { militants: 11, sites: 8, perm: 3 },
    candidats: [
      { initials: 'LT', college: 'Exécution', name: 'Lucas T.', role: 'Tête de liste exécution · Strasbourg', meta: 'Technicien réseau · 8 ans d’ancienneté', quote: '« Les hivers de l’Est ne pardonnent pas. Nos conditions d’intervention non plus ne doivent rien lâcher. »' },
      { initials: 'MD', college: 'Maîtrise', name: 'Marc D.', role: 'Tête de liste maîtrise · Nancy', meta: 'Référent maintenance réseau · 20 ans d’ancienneté', quote: '« Vingt ans de réseau, une conviction : les compétences techniques doivent peser dans les carrières. »' },
      { initials: 'AK', college: 'Cadre', name: 'Anna K.', role: 'Tête de liste cadre · Dijon', meta: 'Responsable de pôle · 13 ans d’ancienneté', quote: '« Je veux des débats honnêtes au CSE : investissements, sécurité industrielle, emploi régional. »' }
    ],
    priorites: [
      { title: 'Conditions hivernales', text: 'Des moyens et des organisations adaptés aux interventions par grand froid.' },
      { title: 'Transmission des savoir-faire', text: 'Anticiper les départs en retraite et sécuriser le compagnonnage technique.' },
      { title: 'Équité territoriale', text: 'Les mêmes droits et les mêmes moyens de Reims à Besançon, sans site oublié.' },
      { title: 'Mobilités choisies', text: 'Des parcours transparents, jamais de mobilité subie.' }
    ]
  },

  'centre-ouest': {
    name: 'Centre-Ouest',
    color: '#6b2d8b',
    capital: 'Nantes',
    eyebrow: 'Région GRDF · Bretagne, Pays de la Loire & Centre-Val de Loire',
    heroTitle: 'de Brest à Orléans.',
    heroLead: 'De la pointe bretonne au Val de Loire autour de Nantes, une dynamique de proximité, des sites à taille humaine et un attachement fort au service public. Découvrez vos représentants.',
    syndicat: 'Syndicat FO GRDF Centre-Ouest',
    syndicatDesc: 'Le syndicat régional fédère les militants FO de Bretagne, des Pays de la Loire et du Centre-Val de Loire. Ses représentants, élus par les salariés du territoire, composeront la liste Centre-Ouest en 2027.',
    secretaire: { initials: 'JM', name: 'Julie M.', role: 'Secrétaire régionale FO GRDF Centre-Ouest' },
    mailSubject: 'Contact FO GRDF Centre-Ouest',
    sites: ['Nantes', 'Rennes', 'Brest', 'Angers', 'Le Mans', 'Tours', 'Orléans'],
    stats: { militants: 12, sites: 9, perm: 3 },
    candidats: [
      { initials: 'JM', college: 'Exécution', name: 'Julie M.', role: 'Tête de liste exécution · Nantes', meta: 'Technicienne clientèle · 11 ans d’ancienneté', quote: '« La tournée, les objectifs, la pression : je connais. Je veux des conditions de travail qui tiennent la route. »' },
      { initials: 'YG', college: 'Maîtrise', name: 'Yann G.', role: 'Tête de liste maîtrise · Rennes', meta: 'Appui métier exploitation · 16 ans d’ancienneté', quote: '« Sans les appuis, rien ne tourne. Je défendrai la visibilité de nos métiers dans les réorganisations. »' },
      { initials: 'TG', college: 'Cadre', name: 'Thomas G.', role: 'Tête de liste cadre · Tours', meta: 'Ingénieur réseau · 9 ans d’ancienneté', quote: '« Des décisions éclairées par le terrain, pas par les seuls tableaux de bord. »' }
    ],
    priorites: [
      { title: 'Proximité des sites', text: 'Préserver le maillage territorial, des côtes bretonnes au Val de Loire.' },
      { title: 'Service public de l’énergie', text: 'Défendre une vision du gaz au service des usagers et des territoires.' },
      { title: 'Équilibre vie pro / vie perso', text: 'Des organisations qui respectent les temps de vie, y compris en astreinte.' },
      { title: 'Égalité femmes-hommes', text: 'Une égalité réelle dans les parcours, les salaires et l’accès aux responsabilités.' }
    ]
  },

  'sud-ouest': {
    name: 'Sud-Ouest',
    color: '#3aa544',
    capital: 'Toulouse',
    eyebrow: 'Région GRDF · Nouvelle-Aquitaine & Occitanie',
    heroTitle: 'de Bordeaux à la Méditerranée.',
    heroLead: 'Des territoires immenses, de Bordeaux à Toulouse et jusqu’à Montpellier : une équipe mobile, engagée, qui connaît le prix des kilomètres et la réalité des sites isolés.',
    syndicat: 'Syndicat FO GRDF Sud-Ouest',
    syndicatDesc: 'Le syndicat régional couvre la Nouvelle-Aquitaine et l’Occitanie, le plus vaste territoire GRDF. Ses représentants, élus par les salariés du grand Sud-Ouest, porteront la liste régionale en 2027.',
    secretaire: { initials: 'NT', name: 'Nadia T.', role: 'Secrétaire régionale FO GRDF Sud-Ouest' },
    mailSubject: 'Contact FO GRDF Sud-Ouest',
    sites: ['Toulouse', 'Bordeaux', 'Montpellier', 'Pau', 'Limoges', 'Perpignan', 'Nîmes'],
    stats: { militants: 10, sites: 8, perm: 3 },
    candidats: [
      { initials: 'RB', college: 'Exécution', name: 'Romain B.', role: 'Tête de liste exécution · Bordeaux', meta: 'Technicien Gaz · 7 ans d’ancienneté', quote: '« Des centaines de kilomètres par semaine : le grand territoire, on le vit dans nos plannings. »' },
      { initials: 'NT', college: 'Maîtrise', name: 'Nadia T.', role: 'Tête de liste maîtrise · Toulouse', meta: 'Appui métier · 13 ans d’ancienneté', quote: '« Les fonctions support méritent mieux : de la visibilité, un avenir et du respect. »' },
      { initials: 'HC', college: 'Cadre', name: 'Hélène C.', role: 'Tête de liste cadre · Montpellier', meta: 'Cheffe de projet biométhane · 10 ans d’ancienneté', quote: '« L’avenir des gaz verts se joue ici. L’emploi qui va avec aussi. »' }
    ],
    priorites: [
      { title: 'Grands déplacements', text: 'Indemnités et temps de trajet à la hauteur des distances réelles du territoire.' },
      { title: 'Sites isolés', text: 'Aucun site oublié : les mêmes moyens à Perpignan qu’à Bordeaux.' },
      { title: 'Développement du biométhane', text: 'Faire de la transition gaz verts une opportunité d’emplois régionaux.' },
      { title: 'Prévention canicule', text: 'Des protocoles sérieux pour les interventions en fortes chaleurs.' }
    ]
  },

  'sud-est': {
    name: 'Sud-Est',
    color: '#f39b1d',
    capital: 'Lyon',
    eyebrow: 'Région GRDF · Auvergne-Rhône-Alpes & PACA',
    heroTitle: 'au plus près du terrain.',
    heroLead: 'De Lyon à Marseille, de Grenoble à Nice, une équipe engagée pour défendre les salariés des Alpes, de la Provence et de la Vallée du Rhône. Découvrez vos représentants et leurs priorités.',
    syndicat: 'Syndicat FO GRDF Sud-Est',
    syndicatDesc: 'Le syndicat régional couvre Auvergne-Rhône-Alpes et PACA : montagnes, vallées et grandes métropoles. Ses représentants, élus par les salariés du Sud-Est, composeront la liste régionale en 2027.',
    secretaire: { initials: 'SE', name: 'Sophie E.', role: 'Secrétaire régionale FO GRDF Sud-Est' },
    mailSubject: 'Contact FO GRDF Sud-Est',
    sites: ['Lyon', 'Marseille', 'Grenoble', 'Nice', 'Avignon', 'Valence', 'Clermont-Ferrand'],
    stats: { militants: 12, sites: 12, perm: 3 },
    candidats: [
      { initials: 'KB', college: 'Exécution', name: 'Karim B.', role: 'Tête de liste exécution · Lyon', meta: 'Technicien Gaz · 10 ans d’ancienneté', quote: '« Sécurité des interventions, reconnaissance du métier, respect des astreintes : je porterai la voix des équipes gaz. »' },
      { initials: 'JR', college: 'Maîtrise', name: 'Julie R.', role: 'Tête de liste maîtrise · Grenoble', meta: 'Encadrante exploitation · 18 ans d’ancienneté', quote: '« Représenter, c’est porter une parole collective, pas individuelle. »' },
      { initials: 'EP', college: 'Cadre', name: 'Élodie P.', role: 'Tête de liste cadre · Marseille', meta: 'RH de proximité · 12 ans d’ancienneté', quote: '« Je connais les deux côtés de la table. Un atout pour défendre chaque salarié avec justesse et fermeté. »' }
    ],
    priorites: [
      { title: 'Maintien des sites régionaux', text: 'Refuser toute fermeture déguisée et défendre l’emploi local de proximité dans chaque agence.' },
      { title: 'Temps de trajet & astreintes', text: 'Une meilleure prise en compte des contraintes géographiques : montagne, distances, trafic.' },
      { title: 'Reconnaissance des compétences', text: 'Faire valoir les expertises terrain dans les grilles et les évolutions de carrière.' },
      { title: 'Qualité de vie au travail', text: 'Lutter contre la charge mentale, les organisations désorganisées et le management dégradé.' }
    ]
  },

  'fc': {
    equipe: [
      { file: 'mickael.png', name: 'Mickaël', role: 'Prévention des risques · Chambéry', link: '../militants/mickael-lopes.html' },
      { file: 'bebby.png',   name: 'Bebby',   role: 'Rôle à préciser' },
      { file: 'carine-detouree.png',  name: 'Carine',  role: 'Maîtrise · Service Gaz' },
      { file: 'celine.png',  name: 'Céline',  role: 'Chargée de clientèle · Toulouse' },
      { file: 'david.png',   name: 'David',   role: 'Rôle à préciser' },
      { file: 'helene.png',  name: 'Hélène',  role: 'Cadre · Energy Formation' },
      { file: 'hubert.png',  name: 'Hubert',  role: 'Rôle à préciser' }
    ],
    name: 'Fonctions Centrales',
    color: '#c0303a',
    capital: 'Saint-Denis',
    eyebrow: 'Siège · Saint-Denis — un rayonnement national',
    heroTitle: 'un rayonnement national.',
    heroLead: 'Basée au siège de Saint-Denis, l’équipe des Fonctions Centrales rayonne sur toute la France : SI, RH, achats, finances, communication, juridique. Partout où GRDF décide, FO est présent.',
    syndicat: 'Syndicat FO GRDF Fonctions Centrales',
    syndicatDesc: 'Le syndicat des Fonctions Centrales représente les salariés du siège de Saint-Denis et des entités nationales, où qu’ils travaillent en France. Ses représentants, élus par les salariés des FC, composeront la liste Fonctions Centrales en 2027.',
    secretaire: { initials: 'CV', name: 'Claire V.', role: 'Secrétaire FO GRDF Fonctions Centrales' },
    mailSubject: 'Contact FO GRDF Fonctions Centrales',
    sites: ['Saint-Denis (siège)', 'Entités nationales', 'Salariés FC en région'],
    stats: { militants: 7, sites: 52, perm: 2 },
    candidatsTitle: 'L\'équipe <em>Fonctions Centrales</em>, en vrai.',
    candidatsLead: 'Les visages du syndicat FO Fonctions Centrales — pas des profils inventés. Les fiches détaillées (parcours, combats, vidéo) arrivent au fur et à mesure.',
    candidats: [
      { photo: 'mickael.png', college: 'Exécution', name: 'Mickaël Lopes', role: 'Détaché syndical · Chambéry', meta: 'Prévention des risques professionnels — mandats CSE & formation des militants FO. Militant FO depuis 2016.', quote: '« On rentre chez soi entier, le soir. C\'est pour ça que je me bats. »', link: '../militants/mickael-lopes.html' },
      { photo: 'bebby.png', name: 'Bebby', role: 'Militant FO Fonctions Centrales', meta: 'Profil détaillé à venir' },
      { photo: 'carine-detouree.png', college: 'Maîtrise', name: 'Carine Brusson', role: 'Service Gaz · Région parisienne', meta: '25 ans au sein des IEG — très sensible à l\'égalité professionnelle et à la lutte contre les discriminations. Passionnée de musique et de flamenco.', quote: '« Une main de fer dans un gant de velours. »' },
      { photo: 'celine.png', college: 'Maîtrise', name: 'Céline Le Bec', role: 'Chargée de clientèle · SCM Toulouse', meta: 'Dans les IEG depuis 2010 : C2T région parisienne, USG Toulouse, puis chargée de clientèle depuis 2022. Expérience RH et urgence gaz.', quote: '« Je porte beaucoup d\'intérêt aux injustices salariales et à la sécurité physique et morale des personnes. »' },
      { photo: 'david.png', name: 'David', role: 'Militant FO Fonctions Centrales', meta: 'Profil détaillé à venir' },
      { photo: 'helene.png', college: 'Cadre', name: 'Hélène Wallyn', role: 'Energy Formation · St-Étienne-de-Montluc', meta: 'Ingénieure informatique passée par l\'automobile, le nucléaire puis le gaz. Sensible à l\'équilibre pro-perso et aux jeunes parents. Touche-à-tout, fan d\'histoire.', quote: '« Trouver du sens dans l\'entraide et la transmission des savoirs. »' },
      { photo: 'hubert.png', name: 'Hubert', role: 'Militant FO Fonctions Centrales', meta: 'Profil détaillé à venir' }
    ],
    priorites: [
      { title: 'Télétravail équitable', text: 'Un accord télétravail ambitieux et appliqué de la même façon dans toutes les directions.' },
      { title: 'Réorganisations transparentes', text: 'Aucune transformation du siège sans information loyale et accompagnement réel.' },
      { title: 'Charge de travail des FC', text: 'Mesurer et réguler la charge réelle, y compris pour les forfaits jours.' },
      { title: 'Égalité des parcours', text: 'Des promotions et des rémunérations transparentes, au siège comme en région.' }
    ]
  }
};

/* Ordre d'affichage des onglets */
window.FO_REGIONS_ORDER = ['nord-ouest', 'idf', 'est', 'centre-ouest', 'sud-ouest', 'sud-est', 'fc'];
