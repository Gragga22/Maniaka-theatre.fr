# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Priorité : les programmateurs** (directions de salles, festivals, services culture des collectivités, réseaux d'itinérance). Ils découvrent le spectacle, le comparent à d'autres propositions et doivent pouvoir décider de le programmer.
- Publics secondaires : les enseignants (séances scolaires dès le CM1, ateliers pédagogiques) et le public familial (trouver où et quand voir le spectacle).

## Product Purpose

Site vitrine de la Compagnie Maniaka Théâtre, qui remplace l'ancien site Wix (maniaka-theatre.fr). Il met aujourd'hui en avant le spectacle *Tant pis pour King Kong !* et présente Audrey Boudon, artiste associée et directrice artistique.

Le site doit happer le visiteur, lui donner envie d'en savoir plus, de voir le spectacle et surtout de le programmer.

**Succès : le visiteur prend contact** (courriel ou téléphone) pour programmer le spectacle ou des ateliers. Le téléchargement du dossier artistique et la venue à une date sont des étapes utiles, pas le but principal.

## Positioning

*Tant pis pour King Kong !* est un spectacle de théâtre d'objets documentaire, d'après *Gorilles dans la brume* de Dian Fossey, écrit et interprété par Audrey Boudon (avec la complicité de Marie Carrignon). Une seule comédienne fait exister, avec des objets, toute une forêt à 3 000 m d'altitude. Il existe en salle, en itinérance et en version extérieure (bois, parcs, jardins, lieux patrimoniaux). Tout public dès 8 ans, 1 heure.

La compagnie défend un théâtre décloisonné : pour enfants accessible aux adultes, et pour adultes accessible aux enfants.

## Operating Context

- Les programmateurs reçoivent le lien par courriel ou le trouvent lors de leur veille, et font circuler le dossier artistique en interne.
- Le site est mis à jour par une personne non développeuse : les dates de l'agenda s'ajoutent en copiant une ligne dans le HTML, et les dates passées disparaissent automatiquement.
- Trois propositions de mise en page sont en cours de comparaison par les équipes : A (racine), B « Carnet de terrain » (`proposition-b/`), C « Dans la brume » (`proposition-c/`).

## Capabilities and Constraints

- Site statique HTML, CSS et JavaScript, sans outil de construction. Polices hébergées sur le site.
- Version de test publiée sur GitHub Pages (https://gragga22.github.io/Maniaka-theatre.fr/), marquée « noindex ». Hébergement définitif et passage sur le nom de domaine maniaka-theatre.fr : **non décidés**.
- Aucun cookie ni outil de mesure d'audience. La bande-annonce YouTube ne se charge qu'au clic.
- Fond sonore : les navigateurs interdisent le son avant un geste du visiteur. La musique démarre donc au premier clic et peut être coupée à tout moment (choix mémorisé).
- **D'autres spectacles viendront** : le site doit pouvoir devenir celui de toute la compagnie, avec plusieurs créations mises en avant. La structure ne doit pas enfermer le site dans un seul spectacle.

## Brand Commitments

- Fil directeur : la plaquette de *Tant pis pour King Kong !* (graphisme Suzanne Caroni). Titre en capitales pinceau grasses (approché par Londrina Solid), textes de type machine à écrire (Special Elite), univers jungle et gorilles des montagnes.
- Repris de l'ancien site : le nom de la compagnie en rose corail espacé, sur fond vert jungle.
- Ton : chaleureux, accessible, poétique, engagé pour la préservation du vivant, sans être moralisateur.
- La phrase « Un titre en pied de nez à l'image monstrueuse des gorilles… » est validée telle quelle : ne pas la réécrire.

## Evidence on Hand

- Dossier artistique, plaquette et projet pédagogique en PDF (`documents/`).
- Photos de scène (`images/`) : crédits connus Franck Roncière, Marie Carrignon, Marion Billy, Sébastien Meys, Bob Campbell (photos de Dian Fossey), Audrey Boudon. Certaines photos signées ont un auteur non identifié.
- Presse : portrait d'Audrey Boudon dans *Le Monde* (Cristina Marino, 14 janvier 2025), article de *La Voix du Nord* (10 février 2025).
- Plus de 30 lieux d'accueil depuis la création en octobre 2022 (liste dans le dossier artistique et l'agenda).
- Bande-annonce YouTube (EKWruIdJ2wE).
- Musique : bandes son originales de Solo Gomez créées pour le spectacle (`sons/`, originaux WAV non publiés).
- Soutien de la Région Hauts-de-France (PRAC) et liste des coproducteurs et lieux de résidence.
- **Absences à ne pas combler par de l'invention** : pas de portrait photo professionnel d'Audrey Boudon (photo de scène utilisée à la place), pas de tarifs publiés, pas de témoignages de programmateurs, pas de chiffres de fréquentation.

## Product Principles

1. Le programmateur doit trouver en quelques secondes la fiche pratique, le dossier à télécharger et le moyen de nous joindre.
2. Faire ressentir le spectacle avant de l'expliquer : images, matière, ambiance de forêt et de brume.
3. Rester fidèle à l'univers de la plaquette, sans copier un site d'institution culturelle générique.
4. Pouvoir accueillir les prochaines créations de la compagnie sans tout reconstruire.
5. Rester simple à mettre à jour par une personne non développeuse.
