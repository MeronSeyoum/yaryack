# Yaryack Photography Website

A modern, professional photography portfolio website built with React and TypeScript, featuring a centralized design system for easy customization.

![Yaryack Photography](https://img.shields.io/badge/Photography-Portfolio-ff8533)
![React](https://img.shields.io/badge/React-18.x-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8)

## 🌟 Features

- **Single-Page Application** - Smooth scrolling navigation between sections
- **Centralized Design System** - Change colors, fonts, and spacing from one file
- **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- **Dark/Light Mode** - Theme toggle with persistent preferences
- **Portfolio Gallery** - Category filtering with masonry grid layout
- **Contact Form** - Integrated contact section with validation
- **Image Optimization** - Lazy loading and progressive enhancement
- **Smooth Animations** - Professional transitions and hover effects
- **SEO Optimized** - Semantic HTML and meta tags

## 📁 Project Structure

```
yaryack-photography/
├── src/
│   ├── config/
│   │   └── designSystem.ts          
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navigation.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── ScrollToTop.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Section.tsx
│   │   └── home/
│   │       ├── HeroSection.tsx
│   │       ├── AboutSection.tsx
│   │       ├── PortfolioSection.tsx
│   │       ├── ServicesSection.tsx
│   │       └── ContactSection.tsx
│   ├── hooks/
│   │   ├── useTheme.ts
│   │   ├── useImageLoader.ts
│   │   └── useScrollToTop.ts
│   ├── types/
│   │   ├── index.ts
│   │   └── portfolio.ts
│   ├── constants/
│   │   ├── index.ts
│   │   └── portfolio.ts
│   ├── assets/
│   │   └── images/
│   ├── pages/
│   │   └── HomePage.tsx
│   ├── App.tsx
│   └── index.tsx
├── public/
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/yaryack-photography.git
cd yaryack-photography
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

### Build for Production

```bash
npm run build
# or
yarn build
```

The optimized production build will be in the `build/` directory.

## 🎨 Customization Guide

### Design System (One File to Rule Them All!)

All visual customization is controlled from **one central file**: `src/config/designSystem.ts`

#### Change Brand Color

```typescript
// src/config/designSystem.ts
export const DESIGN_SYSTEM = {
  colors: {
    primary: '#ff8533',        // 👈 Change this!
    primaryHover: '#ff9944',   // 👈 And this!
    primaryDark: '#e67529',
    primaryLight: '#ffaa66',
  }
}
```

**Example Color Schemes:**

```typescript
// Modern Blue
primary: '#3b82f6'
primaryHover: '#60a5fa'

// Elegant Purple
primary: '#a855f7'
primaryHover: '#c084fc'

// Fresh Teal
primary: '#14b8a6'
primaryHover: '#2dd4bf'

// Warm Rose
primary: '#f43f5e'
primaryHover: '#fb7185'
```

#### Change Fonts

```typescript
// src/config/designSystem.ts
fonts: {
  primary: '"Inter", sans-serif',      // 👈 Body text
  heading: '"Inter", sans-serif',      // 👈 Headings
  mono: '"Fira Code", monospace',
}
```

**Popular Font Combinations:**

```typescript
// Modern & Clean
primary: '"Poppins", sans-serif'
heading: '"Poppins", sans-serif'

// Elegant & Professional
primary: '"Lato", sans-serif'
heading: '"Playfair Display", serif'

// Tech & Modern
primary: '"IBM Plex Sans", sans-serif'
heading: '"IBM Plex Sans", sans-serif'
```

#### Adjust Spacing

```typescript
// src/config/designSystem.ts
spacing: {
  4: '1rem',      // 16px - Small spacing
  8: '2rem',      // 32px - Medium spacing
  12: '3rem',     // 48px - Large spacing
  16: '4rem',     // 64px - XL spacing
}
```

#### Change Border Radius (Roundness)

```typescript
// src/config/designSystem.ts
borderRadius: {
  sm: '0.125rem',   // 2px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px - Default
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
}
```

#### Adjust Animation Speed

```typescript
// src/config/designSystem.ts
transitions: {
  fast: '150ms',     // Quick
  normal: '200ms',   // Default
  slow: '300ms',     // Smooth
  slower: '500ms',   // Very smooth
}
```

### Content Customization

#### Update Services & Pricing

Edit `src/constants/index.ts`:

```typescript
export const SERVICES: Service[] = [
  {
    name: "Your Service Name",
    description: "Service description",
    price: "$XXX",
    features: [
      "Feature 1",
      "Feature 2",
      // Add more features
    ],
  },
  // Add more services
];
```

#### Update Statistics

Edit `src/constants/index.ts`:

```typescript
export const STATS: Stat[] = [
  { number: "5+", label: "Years of Experience" },
  { number: "500+", label: "Happy Clients" },
  // Update values
];
```

#### Add Portfolio Categories

Edit `src/constants/portfolio.ts`:

```typescript
export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  "Event", 
  "Engagement", 
  "Wedding", 
  "Maternity", 
  "Portrait",
  "Your New Category"  // Add new category
];

export const PORTFOLIO_IMAGES: Record<PortfolioCategory, string[]> = {
  "Your New Category": [
    "image1.jpg",
    "image2.jpg",
    // Add image paths
  ],
};
```

#### Update Contact Information

Edit `src/components/home/ContactSection.tsx` and `src/components/layout/Footer.tsx`:

```typescript
// Update email, phone, location
hello@yaryackphotography.ca  // 👈 Change email
+1 (587) 123-4567            // 👈 Change phone
Calgary, Alberta              // 👈 Change location
```

### Images

Replace images in `src/assets/images/`:

- `hero-main.jpg` - Main hero background
- `hero-thumb-1.jpg` to `hero-thumb-4.jpeg` - Hero slideshow
- `photographer-portrait.jpg` - About section image
- `portfolio-*.jpg` - Portfolio gallery images

**Image Requirements:**
- Format: JPG, JPEG, or PNG
- Hero images: 1920x1080px (minimum)
- Portrait: 800x1200px (minimum)
- Portfolio: 800x800px to 1200x1600px

## 📄 Page Sections

The website consists of a single page with the following sections:

1. **Hero Section** - Main landing with slideshow and CTA buttons
2. **About Section** - Photographer info, stats, and testimonials
3. **Portfolio Section** - Gallery with category filtering
4. **Services Section** - Pricing packages and features
5. **Process Section** - Photography workflow steps
6. **Contact Section** - Contact form and information

## 🎯 Key Components

### Design System (`src/config/designSystem.ts`)
Central configuration for all visual aspects:
- Colors (primary, backgrounds, text)
- Typography (fonts, sizes, weights)
- Spacing (margins, padding)
- Border radius
- Shadows
- Transitions
- Breakpoints

### Custom Hooks

#### `useTheme()`
Manages dark/light mode with localStorage persistence.

```typescript
const { isDarkMode, toggleTheme, themeClasses } = useTheme();
```

#### `useImageLoader()`
Preloads images before rendering components.

```typescript
const imagesLoaded = useImageLoader([image1, image2, image3]);
```

#### `useScrollToTop()`
Manages scroll-to-top button visibility and functionality.

```typescript
const { showScrollTop, scrollToTop } = useScrollToTop();
```

## 🎨 Theming

The website supports both dark and light modes:

- **Dark Mode** (Default) - Professional photography aesthetic
- **Light Mode** - Clean, modern alternative

Theme preference is saved to localStorage and persists across sessions.

## 📱 Responsive Breakpoints

```typescript
xs: '475px'   // Small phones
sm: '640px'   // Large phones
md: '768px'   // Tablets
lg: '1024px'  // Laptops
xl: '1280px'  // Desktops
2xl: '1536px' // Large desktops
```

## 🔧 Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library
- **React Router** (optional) - Navigation
- **CSS Grid & Flexbox** - Layouts

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## ⚡ Performance Optimizations

- Image lazy loading
- Code splitting
- Minified production builds
- Optimized asset loading
- Efficient re-renders with React hooks
- Debounced scroll events

## 📊 SEO Best Practices

- Semantic HTML5 elements
- Proper heading hierarchy
- Alt tags on all images
- Meta descriptions
- Open Graph tags (add to `public/index.html`)
- Sitemap ready

## 🔒 Security

- Form validation
- XSS protection
- Sanitized user inputs
- Secure external links (`rel="noopener noreferrer"`)

## 🧪 Testing

Run tests:
```bash
npm test
# or
yarn test
```

Build and test production bundle:
```bash
npm run build
npm run serve
```

## 📝 Code Quality

- ESLint configuration
- Prettier formatting
- TypeScript strict mode
- Component documentation
- Clean code principles

## 🚀 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Drag and drop the `build/` folder to Netlify

### Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/yaryack-photography",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

3. Deploy:
```bash
npm run deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Yaryack Photography**

- Website: [yaryackphotography.ca](https://yaryackphotography.ca)
- Email: hello@yaryackphotography.ca
- Phone: +1 (587) 123-4567
- Location: Calgary, Alberta

## 🙏 Acknowledgments

- [Unsplash](https://unsplash.com) - Stock photography
- [Lucide Icons](https://lucide.dev) - Icon library
- [Tailwind CSS](https://tailwindcss.com) - CSS framework
- [React](https://react.dev) - UI framework

## 📞 Support

For support, email hello@yaryackphotography.ca or open an issue in the repository.

## 🗺️ Roadmap

- [ ] Add blog section
- [ ] Integrate with CMS (Contentful/Sanity)
- [ ] Add booking calendar integration
- [ ] Implement photo gallery lightbox
- [ ] Add client testimonials section
- [ ] Social media feed integration
- [ ] Multi-language support
- [ ] Analytics integration

## 💡 FAQ

### How do I change the primary color?

Edit `src/config/designSystem.ts` and change the `primary` color value. All components will automatically update.

### How do I add more portfolio categories?

Edit `src/constants/portfolio.ts` and add your category to the `PORTFOLIO_CATEGORIES` array and images to the `PORTFOLIO_IMAGES` object.

### How do I customize fonts?

Edit `src/config/designSystem.ts` in the `fonts` section. Make sure to import the font in your HTML or CSS first.

### Can I use this for my own photography business?

Yes! This template is designed to be easily customizable for any photography business.

### How do I add Google Analytics?

Add your tracking code to `public/index.html` in the `<head>` section.

---

**Made with ❤️ for photographers by photographers**

⭐ Star this repo if you find it helpful!