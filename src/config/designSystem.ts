// src/config/designSystem.ts
// ============================================================================
// DESIGN SYSTEM - Central configuration for brand colors, fonts, and sizing
// ============================================================================

export const DESIGN_SYSTEM = {
  // ========== BRAND COLORS ==========
  colors: {
    // Primary Brand Colors
    primary: '#ff8533',           // Main brand color
    primaryHover: '#ff9944',      // Hover state
    primaryDark: '#e67529',       // Darker variant
    primaryLight: '#ffaa66',      // Lighter variant
    
    // Background Colors - Dark Theme
    dark: {
      primary: '#000000',         // Pure black
      secondary: '#0a0a0a',       // Almost black
      tertiary: '#1a1a1a',        // Dark gray
      card: '#1a1a1a',           // Card background
      cardHover: '#2a2a2a',      // Card hover state
    },
    
    // Background Colors - Light Theme
    light: {
      primary: '#ffffff',         // Pure white
      secondary: '#f9fafb',       // Light gray
      tertiary: '#f3f4f6',        // Lighter gray
      card: '#ffffff',           // Card background
      cardHover: '#f9fafb',      // Card hover state
    },
    
    // Grayscale Palette
    gray: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    },
    
    // Semantic Colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    
    // Border Colors
    border: {
      dark: '#2a2a2a',
      light: '#e5e5e5',
    }
  },
  
  // ========== TYPOGRAPHY ==========
  fonts: {
    // Font Families
    primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    heading: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: '"Fira Code", "Courier New", Consolas, monospace',
    
    // Font Sizes (rem based)
    size: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
      '6xl': '3.75rem',   // 60px
      '7xl': '4.5rem',    // 72px
      '8xl': '6rem',      // 96px
    },
    
    // Font Weights
    weight: {
      thin: 100,
      extralight: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    
    // Line Heights
    lineHeight: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
    
    // Letter Spacing
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    }
  },
  
  // ========== SPACING ==========
  spacing: {
    px: '1px',
    0: '0',
    0.5: '0.125rem',   // 2px
    1: '0.25rem',      // 4px
    1.5: '0.375rem',   // 6px
    2: '0.5rem',       // 8px
    2.5: '0.625rem',   // 10px
    3: '0.75rem',      // 12px
    3.5: '0.875rem',   // 14px
    4: '1rem',         // 16px
    5: '1.25rem',      // 20px
    6: '1.5rem',       // 24px
    7: '1.75rem',      // 28px
    8: '2rem',         // 32px
    9: '2.25rem',      // 36px
    10: '2.5rem',      // 40px
    11: '2.75rem',     // 44px
    12: '3rem',        // 48px
    14: '3.5rem',      // 56px
    16: '4rem',        // 64px
    20: '5rem',        // 80px
    24: '6rem',        // 96px
    28: '7rem',        // 112px
    32: '8rem',        // 128px
    36: '9rem',        // 144px
    40: '10rem',       // 160px
    44: '11rem',       // 176px
    48: '12rem',       // 192px
    52: '13rem',       // 208px
    56: '14rem',       // 224px
    60: '15rem',       // 240px
    64: '16rem',       // 256px
    72: '18rem',       // 288px
    80: '20rem',       // 320px
    96: '24rem',       // 384px
  },
  
  // ========== BORDER RADIUS ==========
  borderRadius: {
    none: '0',
    sm: '0.125rem',    // 2px
    base: '0.25rem',   // 4px
    md: '0.375rem',    // 6px
    lg: '0.5rem',      // 8px
    xl: '0.75rem',     // 12px
    '2xl': '1rem',     // 16px
    '3xl': '1.5rem',   // 24px
    full: '9999px',
  },
  
  // ========== TRANSITIONS ==========
  transitions: {
    none: '0ms',
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms',
    slowest: '700ms',
  },
  
  // ========== SHADOWS ==========
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  },
  
  // ========== BREAKPOINTS ==========
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // ========== Z-INDEX ==========
  zIndex: {
    0: 0,
    10: 10,
    20: 20,
    30: 30,
    40: 40,
    50: 50,
    auto: 'auto',
  },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get theme-specific classes based on dark/light mode
 */
export const getThemeClasses = (isDarkMode: boolean) => {
  const { colors } = DESIGN_SYSTEM;
  
  return isDarkMode
    ? {
        bg: {
          primary: `bg-[${colors.dark.primary}]`,
          secondary: `bg-[${colors.dark.secondary}]`,
          tertiary: `bg-[${colors.dark.tertiary}]`,
          card: `bg-[${colors.dark.card}]`,
        },
        text: {
          primary: 'text-white',
          secondary: 'text-gray-400',
          muted: 'text-gray-600',
          accent: `text-[${colors.primary}]`,
        },
        border: `border-[${colors.border.dark}]`,
        hover: {
          bg: `hover:bg-[${colors.dark.cardHover}]`,
          text: `hover:text-[${colors.primary}]`,
          border: `hover:border-[${colors.primary}]`,
        }
      }
    : {
        bg: {
          primary: `bg-[${colors.light.primary}]`,
          secondary: `bg-[${colors.light.secondary}]`,
          tertiary: `bg-[${colors.light.tertiary}]`,
          card: `bg-[${colors.light.card}]`,
        },
        text: {
          primary: 'text-black',
          secondary: 'text-gray-600',
          muted: 'text-gray-500',
          accent: `text-[${colors.primary}]`,
        },
        border: `border-[${colors.border.light}]`,
        hover: {
          bg: `hover:bg-[${colors.light.cardHover}]`,
          text: `hover:text-[${colors.primary}]`,
          border: `hover:border-[${colors.primary}]`,
        }
      };
};

/**
 * Generate CSS variables from design system
 */
export const generateCSSVariables = () => {
  const { colors, fonts, spacing, borderRadius, transitions, shadows } = DESIGN_SYSTEM;
  
  return `
    :root {
      /* Colors */
      --color-primary: ${colors.primary};
      --color-primary-hover: ${colors.primaryHover};
      --color-primary-dark: ${colors.primaryDark};
      --color-primary-light: ${colors.primaryLight};
      
      /* Fonts */
      --font-primary: ${fonts.primary};
      --font-heading: ${fonts.heading};
      --font-mono: ${fonts.mono};
      
      /* Transitions */
      --transition-fast: ${transitions.fast};
      --transition-normal: ${transitions.normal};
      --transition-slow: ${transitions.slow};
      
      /* Spacing */
      --spacing-sm: ${spacing[4]};
      --spacing-md: ${spacing[6]};
      --spacing-lg: ${spacing[8]};
      --spacing-xl: ${spacing[12]};
      
      /* Border Radius */
      --radius-sm: ${borderRadius.sm};
      --radius-md: ${borderRadius.md};
      --radius-lg: ${borderRadius.lg};
      --radius-xl: ${borderRadius.xl};
      
      /* Shadows */
      --shadow-sm: ${shadows.sm};
      --shadow-md: ${shadows.md};
      --shadow-lg: ${shadows.lg};
      --shadow-xl: ${shadows.xl};
    }
  `;
};

/**
 * Get color value by path (e.g., 'primary', 'gray.500')
 */
export const getColor = (path: string): string => {
  const keys = path.split('.');
  let value: any = DESIGN_SYSTEM.colors;
  
  for (const key of keys) {
    value = value[key];
    if (value === undefined) return DESIGN_SYSTEM.colors.primary;
  }
  
  return value;
};

/**
 * Get spacing value
 */
export const getSpacing = (size: keyof typeof DESIGN_SYSTEM.spacing): string => {
  return DESIGN_SYSTEM.spacing[size];
};

/**
 * Get font size value
 */
export const getFontSize = (size: keyof typeof DESIGN_SYSTEM.fonts.size): string => {
  return DESIGN_SYSTEM.fonts.size[size];
};

/**
 * Get font weight value
 */
export const getFontWeight = (weight: keyof typeof DESIGN_SYSTEM.fonts.weight): number => {
  return DESIGN_SYSTEM.fonts.weight[weight];
};

// ============================================================================
// PRESET STYLES
// ============================================================================

export const PRESET_STYLES = {
  // Button Styles
  button: {
    primary: `bg-[${DESIGN_SYSTEM.colors.primary}] hover:bg-[${DESIGN_SYSTEM.colors.primaryHover}] text-black font-semibold transition-all duration-[${DESIGN_SYSTEM.transitions.normal}]`,
    secondary: 'bg-white hover:bg-gray-100 text-gray-900 font-semibold transition-all duration-200',
    outline: `border border-white text-white hover:bg-white hover:text-black transition-all duration-[${DESIGN_SYSTEM.transitions.normal}]`,
  },
  
  // Card Styles
  card: {
    base: `rounded-[${DESIGN_SYSTEM.borderRadius.lg}] border transition-all duration-[${DESIGN_SYSTEM.transitions.slow}]`,
    hover: `hover:border-[${DESIGN_SYSTEM.colors.primary}] hover:-translate-y-2`,
  },
  
  // Text Styles
  text: {
    heading: {
      h1: `font-[${DESIGN_SYSTEM.fonts.weight.medium}] leading-[${DESIGN_SYSTEM.fonts.lineHeight.tight}]`,
      h2: `font-[${DESIGN_SYSTEM.fonts.weight.medium}] leading-[${DESIGN_SYSTEM.fonts.lineHeight.tight}]`,
      h3: `font-[${DESIGN_SYSTEM.fonts.weight.medium}] leading-[${DESIGN_SYSTEM.fonts.lineHeight.normal}]`,
    },
    body: {
      base: `leading-[${DESIGN_SYSTEM.fonts.lineHeight.relaxed}]`,
      small: `text-[${DESIGN_SYSTEM.fonts.size.sm}] leading-[${DESIGN_SYSTEM.fonts.lineHeight.relaxed}]`,
    }
  },
  
  // Input Styles
  input: {
    base: `w-full border rounded-[${DESIGN_SYSTEM.borderRadius.lg}] transition-colors duration-[${DESIGN_SYSTEM.transitions.normal}] focus:outline-none`,
    dark: `bg-black/50 border-gray-700 text-white placeholder-gray-500 focus:border-[${DESIGN_SYSTEM.colors.primary}]`,
    light: `bg-white border-gray-300 text-black placeholder-gray-400 focus:border-[${DESIGN_SYSTEM.colors.primary}]`,
  }
};

// Export default for convenience
export default DESIGN_SYSTEM;