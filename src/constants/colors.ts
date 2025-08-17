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
} as const;

export default COLORS;
