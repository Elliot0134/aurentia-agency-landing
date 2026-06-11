import type { CheerioAPI } from 'cheerio';
import type { BusinessDetection } from './types';
import { extractJsonLd, jsonLdTypes } from './jsonld';

/** Top villes françaises (extensible — suffit pour la détection v1). */
export const FRENCH_CITIES = [
  'paris', 'marseille', 'lyon', 'toulouse', 'nice', 'nantes', 'montpellier', 'strasbourg',
  'bordeaux', 'lille', 'rennes', 'reims', 'toulon', 'angers', 'grenoble', 'dijon',
  'saint-étienne', 'nîmes', 'villeurbanne', 'clermont-ferrand', 'aix-en-provence', 'brest',
  'tours', 'amiens', 'limoges', 'annecy', 'perpignan', 'metz', 'besançon', 'orléans',
  'rouen', 'mulhouse', 'caen', 'nancy', 'avignon', 'cannes', 'antibes', 'la rochelle',
  'pau', 'bayonne', 'biarritz', 'ajaccio', 'bastia', 'chambéry', 'colmar', 'poitiers',
  'valence', 'quimper', 'vannes', 'lorient', 'narbonne', 'béziers', 'arles', 'fréjus',
  'cavaillon', 'salon-de-provence', 'martigues', 'aubagne', 'istres', 'gap', 'draguignan',
] as const;

const LOCAL_SCHEMA_TYPES = [
  'LocalBusiness', 'Restaurant', 'Plumber', 'RealEstateAgent', 'Dentist', 'Physician',
  'AutoRepair', 'HairSalon', 'Hotel', 'BarOrPub', 'Store', 'LegalService', 'Electrician',
  'HousePainter', 'RoofingContractor', 'HomeAndConstructionBusiness', 'LodgingBusiness',
];

/** mot-clé → clé de secteur business (sert à la détection locale/nationale) */
const SECTOR_KEYWORDS: Record<string, string> = {
  conciergerie: 'conciergerie',
  airbnb: 'conciergerie',
  plombier: 'artisan', plomberie: 'artisan', électricien: 'artisan', menuisier: 'artisan',
  peintre: 'artisan', paysagiste: 'artisan', maçon: 'artisan', couvreur: 'artisan',
  restaurant: 'restaurant', pizzeria: 'restaurant', brasserie: 'restaurant', traiteur: 'restaurant',
  avocat: 'service-pro', notaire: 'service-pro', 'expert-comptable': 'service-pro', comptable: 'service-pro',
  saas: 'saas-b2b', logiciel: 'saas-b2b', plateforme: 'saas-b2b',
  boutique: 'ecommerce', 'e-commerce': 'ecommerce',
};

const FRENCH_PHONE = /(?:\+33|0)\s?[1-9](?:[\s.\-]?\d{2}){4}/;
const POSTAL_ADDRESS = /\b\d{5}\b/; // code postal présent près d'un nom de ville

export function detectBusinessType($: CheerioAPI): BusinessDetection {
  const bodyText = $('body').text().toLowerCase();
  const title = $('head title').text().toLowerCase();
  const h1 = $('h1').first().text().toLowerCase();
  const types = jsonLdTypes(extractJsonLd($));

  let scoreLocal = 0;
  let scoreNational = 0;

  // Schema
  if (types.some((t) => LOCAL_SCHEMA_TYPES.includes(t))) scoreLocal += 3;
  if (types.includes('SoftwareApplication') || types.includes('WebApplication')) scoreNational += 3;
  if (types.includes('Organization') && !types.some((t) => LOCAL_SCHEMA_TYPES.includes(t))) scoreNational += 1;

  // NAP
  if (FRENCH_PHONE.test($('body').text()) && POSTAL_ADDRESS.test($('body').text())) scoreLocal += 2;

  // Mentions de ville
  let topCity: string | null = null;
  let topCount = 0;
  for (const city of FRENCH_CITIES) {
    const count = bodyText.split(city).length - 1;
    if (count > topCount) {
      topCount = count;
      topCity = city;
    }
  }
  if (topCount > 3) scoreLocal += 2;

  // Ville dans title/h1
  if (topCity && (title.includes(topCity) || h1.includes(topCity))) scoreLocal += 2;

  // Pricing abonnement
  if (/\d+\s*€\s*\/\s*mois/i.test(bodyText)) scoreNational += 2;

  // E-commerce
  if (['ajouter au panier', 'add to cart', 'checkout', 'panier'].some((k) => bodyText.includes(k))) {
    scoreNational += 2;
  }

  // Secteur
  let sector: string | null = null;
  const haystack = `${title} ${h1} ${bodyText.slice(0, 3000)}`;
  for (const [keyword, sectorKey] of Object.entries(SECTOR_KEYWORDS)) {
    if (haystack.includes(keyword)) {
      sector = sectorKey;
      break;
    }
  }

  const type =
    scoreLocal >= scoreNational + 2 ? 'local' : scoreNational >= scoreLocal + 2 ? 'national' : 'hybrid';

  return { type, scoreLocal, scoreNational, city: topCity, sector };
}
