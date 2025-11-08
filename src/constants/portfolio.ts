// Import portfolio images

// Event images (1-8)
import event1 from "../assets/images/event-1.jpg";
import event2 from "../assets/images/event-2.jpg";
import event3 from "../assets/images/event-3.jpg";
import event4 from "../assets/images/event-4.jpg";
import event5 from "../assets/images/event-5.jpg";
import event6 from "../assets/images/event-6.jpg";
import event7 from "../assets/images/event-7.jpg";
import event8 from "../assets/images/event-8.jpg";

// Engagement images (1-8)
import engagement1 from "../assets/images/engagement-1.jpg";
import engagement2 from "../assets/images/engagement-2.jpg";
import engagement3 from "../assets/images/engagement-3.jpg";
import engagement4 from "../assets/images/engagement-4.jpg";
import engagement5 from "../assets/images/engagement-5.jpg";
import engagement6 from "../assets/images/engagement-6.jpg";
import engagement7 from "../assets/images/engagement-7.jpg";
import engagement8 from "../assets/images/engagement-8.jpg";

// Wedding images (1-8)
import wedding1 from "../assets/images/wedding-1.jpg";
import wedding2 from "../assets/images/wedding-2.jpg";
import wedding3 from "../assets/images/wedding-3.jpg";
import wedding4 from "../assets/images/wedding-4.jpg";
import wedding5 from "../assets/images/wedding-5.jpg";
import wedding6 from "../assets/images/wedding-6.jpg";
import wedding7 from "../assets/images/wedding-7.jpg";
import wedding8 from "../assets/images/wedding-8.jpg";

// Maternity images (1-8)
import maternity1 from "../assets/images/maternity-1.jpg";
import maternity2 from "../assets/images/maternity-2.jpg";
import maternity3 from "../assets/images/maternity-3.jpg";
import maternity4 from "../assets/images/maternity-4.jpg";
import maternity5 from "../assets/images/maternity-5.jpg";
import maternity6 from "../assets/images/maternity-6.jpg";
import maternity7 from "../assets/images/maternity-7.jpg";
import maternity8 from "../assets/images/maternity-8.jpg";

// Portrait images (1-8)
import portrait1 from "../assets/images/portrait-1.jpg";
import portrait2 from "../assets/images/portrait-2.jpg";
import portrait3 from "../assets/images/portrait-3.jpg";
import portrait4 from "../assets/images/portrait-4.jpg";
import portrait5 from "../assets/images/portrait-5.jpg";
import portrait6 from "../assets/images/portrait-6.jpg";
import portrait7 from "../assets/images/portrait-7.jpg";
import portrait8 from "../assets/images/portrait-8.jpg";

// Fallback/alternative portfolio images
// import portfolio1 from "../assets/images/portfolio-1.jpg";
// import portfolio2 from "../assets/images/portfolio-2.jpg";
// import portfolio3 from "../assets/images/portfolio-3.jpg";
// import portfolio4 from "../assets/images/portfolio-4.jpg";
// import portfolio5 from "../assets/images/portfolio-5.jpg";
// import portfolio6 from "../assets/images/portfolio-6.jpg";
// import portfolio7 from "../assets/images/portfolio-7.jpg";
// import portfolio8 from "../assets/images/portfolio-8.jpg";
// import portfolio10 from "../assets/images/portfolio-10.jpg";
// import portfolio11 from "../assets/images/portfolio-11.jpg";
// import portfolio12 from "../assets/images/portfolio-12.jpg";
// import portfolio13 from "../assets/images/portfolio-13.jpg";

// Hero images
// import heroThumb1 from "../assets/images/hero-thumb-1.jpeg";
// import heroThumb2 from "../assets/images/hero-thumb-2.jpeg";
// import heroThumb3 from "../assets/images/hero-thumb-3.jpeg";

import type { PortfolioCategory } from "../types/portfolio";

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  "Event",
  "Engagement", 
  "Wedding",
  "Maternity",
  "Portrait"
];

export const PORTFOLIO_TABS = ["All Work", "Featured", "Recent"];

export const PORTFOLIO_IMAGES: Record<PortfolioCategory, string[]> = {
  Event: [event1, event2, event3, event4, event5, event6, event7, event8],
  Engagement: [engagement1, engagement2, engagement3, engagement4, engagement5, engagement6, engagement7, engagement8],
  Wedding: [wedding1, wedding2, wedding3, wedding4, wedding5, wedding6, wedding7, wedding8],
  Maternity: [maternity1, maternity2, maternity3, maternity4, maternity5, maternity6, maternity7, maternity8],
  Portrait: [portrait1, portrait2, portrait3, portrait4, portrait5, portrait6, portrait7, portrait8],
};

// Alternative implementation if you want to keep using portfolio images as fallbacks
// export const PORTFOLIO_IMAGES_WITH_FALLBACKS: Record<PortfolioCategory, string[]> = {
//   Event: [event1, event2, event3, event4, event5, event6, event7, event8],
//   Engagement: [engagement1, engagement2, engagement3, portfolio2, portfolio3, engagement6, engagement7, portfolio8],
//   Wedding: [wedding1, wedding2, wedding3, wedding4, portfolio4, portfolio3, wedding7, wedding8],
//   Maternity: [maternity1, maternity2, portfolio3, portfolio13, portfolio2, portfolio1, portfolio5, heroThumb2],
//   Portrait: [heroThumb1, portrait2, portfolio12, portfolio7, portfolio11, portrait6, portrait7, heroThumb3],
// };

// Utility function to get all portfolio images
export const getAllPortfolioImages = (): string[] => {
  return Object.values(PORTFOLIO_IMAGES).flat();
};

// Utility function to get images by category
export const getImagesByCategory = (category: PortfolioCategory): string[] => {
  return PORTFOLIO_IMAGES[category] || [];
};

// Utility function to get featured images (first 2 from each category)
export const getFeaturedImages = (): string[] => {
  return Object.values(PORTFOLIO_IMAGES).flatMap(images => images.slice(0, 2));
};

// Utility function to get recent images (last 3 from each category)
export const getRecentImages = (): string[] => {
  return Object.values(PORTFOLIO_IMAGES).flatMap(images => images.slice(-3));
};