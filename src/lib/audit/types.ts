export type Tier = 'flash' | 'pro';

export type MeasurementStatus = 'pass' | 'warn' | 'fail' | 'info';

export type ModuleId =
  | 'seo-onpage'
  | 'seo-tech'
  | 'perf'
  | 'images'
  | 'mobile'
  | 'business'
  | 'competitors'
  | 'impact';

/**
 * L'unité atomique de vérité du système. Chaque donnée du rapport final
 * provient d'une Measurement. Le LLM rédacteur ne pourra référencer que des
 * ids existants (contrat du plan 2).
 */
export interface Measurement {
  id: string; // ex: 'seo.title.length' — stable, unique par audit
  module: ModuleId;
  label: string; // libellé FR lisible
  status: MeasurementStatus;
  value: string | number | boolean | null;
  unit?: string; // 's', 'ms', '%', 'octets'...
  proof?: string; // ce qui a été testé : URL, code HTTP, sélecteur...
  details?: string; // contexte factuel additionnel
}

export interface ImageRect {
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  alt: string | null;
  area: number; // surface rendue en px² (width * height arrondi)
}

/** Annotation prouvable par code, destinée au screenshot annoté (plan 2). */
export interface Annotation {
  x: number;
  y: number;
  width: number;
  height: number;
  measurementId?: string; // la preuve (absente pour les annotations visuelles, qui sont des opinions)
  note: string;
}

export interface CompetitorSummary {
  domain: string;
  url: string;
  perfScoreMobile: number | null;
  seoScore: number | null;
  lcpMs: number | null;
}

export interface ImpactItem {
  id: string; // ex: 'impact.lcp'
  label: string;
  lossPercent: number; // % de visiteurs perdus
  basis: string; // source/justification de l'estimation
}

export interface ImpactEstimate {
  items: ImpactItem[];
  headlinePercent: number; // % phare affiché dans le rapport
  assumptions: string[]; // hypothèses affichées dans le rapport
}

export type BusinessType = 'local' | 'national' | 'hybrid';

export interface BusinessDetection {
  type: BusinessType;
  scoreLocal: number;
  scoreNational: number;
  city: string | null;
  sector: string | null; // clé de SECTOR_BENCHMARKS
}

export interface AuditData {
  url: string;
  finalUrl: string;
  tier: Tier;
  collectedAt: string; // ISO 8601
  business: BusinessDetection;
  measurements: Measurement[];
  annotations: Annotation[];
  screenshotPath: string | null; // PNG full-page sur disque
  competitors: CompetitorSummary[];
  impact: ImpactEstimate | null; // pro uniquement
}
