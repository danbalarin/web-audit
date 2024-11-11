declare module "wappalyzer-core" {
  export const technologies: any[];
  export const categories: any[];
  export const requires: any[];
  export const categoryRequires: any[];
  export function slugify(name: string): string;
  export function getTechnology(name: string): any;
  export function getCategory(id: string): any;
  export function resolve(detections: any[]): any;
  export function resolveVersion(
    resolved: { version: any; regex: any },
    match: any,
  ): any;
  export function resolveExcludes(
    resolved: { technology: any },
    match: any,
  ): any;
  export function resolveImplies(
    resolved: { technology: any; confidence: number; lastUrl: string },
    match: any,
  ): any;
  export function analyze(items: any, technologies?: any[]): any;
  export function setTechnologies(technologies: object): void;
  export function setCategories(categories: object): void;
  // Internals
  // export function transformPatterns(patterns: any[]): any[];
  // export function parsePattern(pattern: any): any;
  // export function analyzeOneToOne(technologies: any[]): any;
  // export function analyzeOneToMany(technologies: any[]): any;
  // export function analyzeManyToMany(technologies: any[]): any;
}
