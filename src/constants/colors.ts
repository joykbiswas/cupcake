// Cupcake Frontend Color Palette
// Centralized color system for consistent use across the project

export const COLORS = {
  // Primary Colors
  PRIMARY: '#7C5228',        // Warm brown - main brand color
  PRIMARY_DEEP: '#553329',   // Deep chocolate brown - for emphasis
  
  // Secondary Colors
  SECONDARY: '#F5F1E8',      // Warm cream - main background
  SECONDARY_LIGHT: '#FAF8F3', // Lighter cream - subtle backgrounds
  SECONDARY_DARK: '#E8E0D0',  // Darker cream - borders and shadows
  
  // Accent Colors
  ACCENT_GOLD: '#D4AF37',    // Warm gold - highlights and CTAs
  ACCENT_GOLD_LIGHT: '#E6C35C', // Light gold - hover states
  
  // Text Colors
  TEXT_PRIMARY: '#553329',   // Deep brown for main text
  TEXT_SECONDARY: '#7C5228', // Primary brown for secondary text
  TEXT_LIGHT: '#9A8B7A',     // Light brown for subtle text
  TEXT_WHITE: '#FFFFFF',     // White text
  
  // Background Colors
  BG_PRIMARY: '#F5F1E8',     // Main page background
  BG_SECONDARY: '#FFFFFF',   // Card and component backgrounds
  BG_OVERLAY: 'rgba(124, 82, 40, 0.1)', // Subtle overlays
  
  // Interactive Colors
  BUTTON_PRIMARY: '#7C5228',     // Primary button background
  BUTTON_PRIMARY_HOVER: '#553329', // Primary button hover
  BUTTON_SECONDARY: '#FFFFFF',   // Secondary button background
  BUTTON_SECONDARY_HOVER: '#F5F1E8', // Secondary button hover
  
  // Border Colors
  BORDER_PRIMARY: 'rgba(124, 82, 40, 0.2)',   // Primary borders
  BORDER_SECONDARY: 'rgba(124, 82, 40, 0.1)', // Secondary borders
  BORDER_LIGHT: 'rgba(124, 82, 40, 0.05)',    // Light borders
  
  // Status Colors
  SUCCESS: '#9CAF88',        // Sage green for success states
  WARNING: '#E6C35C',        // Gold for warnings
  ERROR: '#D97777',          // Soft red for errors
  INFO: '#B8D4E3',          // Soft blue for info
  
  // Shadow Colors
  SHADOW_PRIMARY: 'rgba(124, 82, 40, 0.15)',  // Primary shadows
  SHADOW_SECONDARY: 'rgba(124, 82, 40, 0.08)', // Secondary shadows
  SHADOW_LIGHT: 'rgba(124, 82, 40, 0.05)',     // Light shadows
} as const;

// Beautiful linear gradients for cupcake website
export const GRADIENTS = {
  // Vibrant and colorful page backgrounds
  PAGE_BACKGROUND: 'linear-gradient(135deg, #FFE5E5 0%, #FFF0E5 25%, #E5F0FF 50%, #F0E5FF 75%, #FFE5F0 100%)',
  PAGE_BACKGROUND_ALT: 'linear-gradient(135deg, #FFD4D4 0%, #FFE8D4 25%, #D4E8FF 50%, #E8D4FF 75%, #FFD4E8 100%)',
  
  // Brand-aligned warm gradients (brown/cream/gold)
  BRAND_HERO: 'linear-gradient(135deg, #7C5228 0%, #D4AF37 35%, #F5F1E8 100%)',
  BRAND_SECTION: 'linear-gradient(180deg, #FAF8F3 0%, #F5F1E8 100%)',
  BRAND_ACCENT: 'linear-gradient(135deg, #D4AF37 0%, #E6C35C 50%, #D4AF37 100%)',
  BRAND_BUTTON: 'linear-gradient(135deg, #7C5228 0%, #553329 100%)',
  
  // Stunning hero section gradients
  HERO_GRADIENT: 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 25%, #4ECDC4 50%, #45B7D1 75%, #96CEB4 100%)',
  HERO_GRADIENT_VIBRANT: 'linear-gradient(135deg, #FF6B9D 0%, #C44569 25%, #F093FB 50%, #F5576C 75%, #4FACFE 100%)',
  HERO_GRADIENT_SUNSET: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 25%, #FECFEF 50%, #FFC3A0 75%, #FFAFBD 100%)',
  
  // Eye-catching card and component gradients
  CARD_GRADIENT: 'linear-gradient(145deg, #FFFFFF 0%, #F8F9FF 25%, #FFF8F9 50%, #F9FFF8 75%, #FFFFFF 100%)',
  CARD_GRADIENT_COLORFUL: 'linear-gradient(145deg, #FFE5E5 0%, #E5F0FF 25%, #F0E5FF 50%, #E5FFF0 75%, #FFE5E5 100%)',
  
  // Professional button gradients
  BUTTON_GRADIENT: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  BUTTON_HOVER_GRADIENT: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
  BUTTON_GRADIENT_ALT: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  BUTTON_HOVER_GRADIENT_ALT: 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)',
  
  // Vibrant accent gradients
  ACCENT_GRADIENT: 'linear-gradient(135deg, #FFD93D 0%, #FF6B6B 50%, #4ECDC4 100%)',
  ACCENT_GRADIENT_RAINBOW: 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 25%, #4ECDC4 50%, #45B7D1 75%, #96CEB4 100%)',
  ACCENT_GRADIENT_SUNSET: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 25%, #FECFEF 50%, #FFC3A0 75%, #FFAFBD 100%)',
  
  // Modern and trendy gradients
  MODERN_GRADIENT: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
  TRENDY_GRADIENT: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  TRENDY_GRADIENT_ALT: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  
  // Subtle but colorful backgrounds
  SUBTLE_BG: 'linear-gradient(180deg, #FFE5E5 0%, #FFF0E5 100%)',
  WARM_BG: 'linear-gradient(135deg, #FFE5E5 0%, #FFE8D4 100%)',
  COOL_BG: 'linear-gradient(135deg, #E5F0FF 0%, #D4E8FF 100%)',
  
  // Special effect gradients
  GLOW_GRADIENT: 'linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(78, 205, 196, 0.3) 50%, rgba(255, 230, 109, 0.1) 100%)',
  SHIMMER_GRADIENT: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)',
  
  // Section-specific gradients
  MENU_SECTION: 'linear-gradient(135deg, #FFE5E5 0%, #FFF0E5 25%, #E5F0FF 50%, #F0E5FF 75%, #FFE5F0 100%)',
  PRODUCT_SECTION: 'linear-gradient(135deg, #F8F9FF 0%, #FFF8F9 25%, #F9FFF8 50%, #FFF9F8 75%, #F8F9FF 100%)',
  HERO_SECTION: 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 25%, #4ECDC4 50%, #45B7D1 75%, #96CEB4 100%)',
  
  // Premium gradients for special elements
  PREMIUM_GRADIENT: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
  PREMIUM_GRADIENT_ALT: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 25%, #ffecd2 50%, #fcb69f 75%, #a8edea 100%)',
} as const;

// Type for color keys
export type ColorKey = keyof typeof COLORS;

// Helper function to get color with opacity
export const getColorWithOpacity = (color: string, opacity: number): string => {
  // Convert hex to rgba
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Common color combinations
export const COLOR_COMBINATIONS = {
  // Card styles
  CARD: {
    background: COLORS.BG_SECONDARY,
    border: COLORS.BORDER_SECONDARY,
    shadow: COLORS.SHADOW_SECONDARY,
    hoverShadow: COLORS.SHADOW_PRIMARY,
  },
  
  // Button styles
  BUTTON: {
    primary: {
      background: COLORS.BUTTON_PRIMARY,
      hover: COLORS.BUTTON_PRIMARY_HOVER,
      text: COLORS.TEXT_WHITE,
    },
    secondary: {
      background: COLORS.BUTTON_SECONDARY,
      hover: COLORS.BUTTON_SECONDARY_HOVER,
      text: COLORS.TEXT_PRIMARY,
      border: COLORS.BORDER_PRIMARY,
    },
  },
  
  // Text styles
  TEXT: {
    heading: COLORS.TEXT_PRIMARY,
    body: COLORS.TEXT_SECONDARY,
    subtle: COLORS.TEXT_LIGHT,
    white: COLORS.TEXT_WHITE,
  },
  
  // Background styles
  BACKGROUND: {
    page: COLORS.BG_PRIMARY,
    component: COLORS.BG_SECONDARY,
    overlay: COLORS.BG_OVERLAY,
  },
  
  // Gradient styles
  GRADIENTS: {
    page: GRADIENTS.PAGE_BACKGROUND,
    hero: GRADIENTS.HERO_GRADIENT,
    card: GRADIENTS.CARD_GRADIENT,
    button: GRADIENTS.BUTTON_GRADIENT,
    accent: GRADIENTS.ACCENT_GRADIENT,
    subtle: GRADIENTS.SUBTLE_BG,
    warm: GRADIENTS.WARM_BG,
  },
} as const;

export default COLORS;
