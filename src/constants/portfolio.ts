
// Import portfolio images
import portfolio1 from "../assets/images/portfolio-1.jpg";
import portfolio2 from "../assets/images/portfolio-2.jpg";
import portfolio3 from "../assets/images/portfolio-3.jpg";
import portfolio4 from "../assets/images/portfolio-4.jpg";
import portfolio5 from "../assets/images/portfolio-5.jpg";
import portfolio6 from "../assets/images/portfolio-6.jpg";
import portfolio10 from "../assets/images/portfolio-11.jpg";
import portfolio12 from "../assets/images/portfolio-12.jpg";
import portfolio13 from "../assets/images/portfolio-13.jpg";
import portfolio7 from "../assets/images/portfolio-7.jpg";
import portfolio8 from "../assets/images/portfolio-8.jpg";
import portfolio11 from "../assets/images/portfolio-10.jpg";
import heroThumb2 from "../assets/images/hero-thumb-2.jpeg";
import heroThumb1 from "../assets/images/hero-thumb-3.jpeg";
import type { PortfolioCategory } from "../types/portfolio";

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  "Event", "Engagement", "Wedding", "Maternity", "Portrait"
];

export const PORTFOLIO_TABS = ["All Work", "Featured", "Recent"];

export const PORTFOLIO_IMAGES: Record<PortfolioCategory, string[]> = {
  Event: [portfolio2, portfolio1, portfolio6, portfolio7, portfolio4, portfolio5, portfolio3,portfolio1],
  Engagement: [portfolio2, portfolio3, portfolio1, portfolio6, portfolio5, portfolio4, portfolio8],
  Wedding: [portfolio8, portfolio4, portfolio3, portfolio5, portfolio3, portfolio2, portfolio1, heroThumb2],
  Maternity: [portfolio4, portfolio6, portfolio3, portfolio13, portfolio2, portfolio1, portfolio5, heroThumb2],
  Portrait: [heroThumb1,portfolio1 , portfolio12, portfolio7, portfolio11, portfolio1, portfolio10, heroThumb2],
};

