export type PortfolioCategory = 
  | "Event" 
  | "Engagement" 
  | "Wedding" 
  | "Maternity" 
  | "Portrait";

export type PortfolioTab = 
  | "All Work" 
  | "Featured" 
  | "Recent";

export interface PortfolioImage {
  src: string;
  alt: string;
  category: PortfolioCategory;
}