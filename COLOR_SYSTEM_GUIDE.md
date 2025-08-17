# 🎨 Cupcake Frontend Color System Guide

## Overview
This guide explains how to use the centralized color system in your cupcake frontend project. All colors are now stored in one place and can be easily reused across components.

## 📁 File Structure
```
src/
├── constants/
│   ├── colors.ts           # Main color constants
│   └── tailwindColors.js   # Tailwind color extensions
├── components/              # Your components
└── pages/                  # Your pages
```

## 🎯 How to Use Colors

### 1. **Import Colors in Your Components**
```typescript
import { COLORS, COLOR_COMBINATIONS } from '../../constants/colors';
```

### 2. **Use Individual Colors**
```typescript
// Background colors
<div style={{ backgroundColor: COLORS.BG_PRIMARY }}>

// Text colors
<h1 style={{ color: COLORS.TEXT_PRIMARY }}>

// Button colors
<button style={{ backgroundColor: COLORS.BUTTON_PRIMARY }}>
```

### 3. **Use Color Combinations (Recommended)**
```typescript
// Card styling
<div style={{
  backgroundColor: COLOR_COMBINATIONS.CARD.background,
  borderColor: COLOR_COMBINATIONS.CARD.border,
  boxShadow: `0 20px 25px -5px ${COLOR_COMBINATIONS.CARD.shadow}`
}}>

// Button styling
<button style={{
  backgroundColor: COLOR_COMBINATIONS.BUTTON.primary.background,
  color: COLOR_COMBINATIONS.BUTTON.primary.text
}}>
```

## 🌈 Available Colors

### **Primary Colors**
- `COLORS.PRIMARY` → `#7C5228` (Warm brown)
- `COLORS.PRIMARY_DEEP` → `#553329` (Deep chocolate brown)

### **Secondary Colors**
- `COLORS.SECONDARY` → `#F5F1E8` (Warm cream)
- `COLORS.SECONDARY_LIGHT` → `#FAF8F3` (Lighter cream)
- `COLORS.SECONDARY_DARK` → `#E8E0D0` (Darker cream)

### **Text Colors**
- `COLORS.TEXT_PRIMARY` → `#553329` (Deep brown for headings)
- `COLORS.TEXT_SECONDARY` → `#7C5228` (Primary brown for body text)
- `COLORS.TEXT_LIGHT` → `#9A8B7A` (Light brown for subtle text)
- `COLORS.TEXT_WHITE` → `#FFFFFF` (White text)

### **Background Colors**
- `COLORS.BG_PRIMARY` → `#F5F1E8` (Main page background)
- `COLORS.BG_SECONDARY` → `#FFFFFF` (Card backgrounds)
- `COLORS.BG_OVERLAY` → `rgba(124, 82, 40, 0.1)` (Subtle overlays)

### **Interactive Colors**
- `COLORS.BUTTON_PRIMARY` → `#7C5228` (Primary button)
- `COLORS.BUTTON_PRIMARY_HOVER` → `#553329` (Primary button hover)
- `COLORS.BUTTON_SECONDARY` → `#FFFFFF` (Secondary button)
- `COLORS.BUTTON_SECONDARY_HOVER` → `#F5F1E8` (Secondary button hover)

### **Border Colors**
- `COLORS.BORDER_PRIMARY` → `rgba(124, 82, 40, 0.2)` (Main borders)
- `COLORS.BORDER_SECONDARY` → `rgba(124, 82, 40, 0.1)` (Subtle borders)
- `COLORS.BORDER_LIGHT` → `rgba(124, 82, 40, 0.05)` (Very light borders)

### **Status Colors**
- `COLORS.SUCCESS` → `#9CAF88` (Sage green)
- `COLORS.WARNING` → `#E6C35C` (Gold)
- `COLORS.ERROR` → `#D97777` (Soft red)
- `COLORS.INFO` → `#B8D4E3` (Soft blue)

### **Shadow Colors**
- `COLORS.SHADOW_PRIMARY` → `rgba(124, 82, 40, 0.15)` (Main shadows)
- `COLORS.SHADOW_SECONDARY` → `rgba(124, 82, 40, 0.08)` (Subtle shadows)
- `COLORS.SHADOW_LIGHT` → `rgba(124, 82, 40, 0.05)` (Light shadows)

## 🚀 **Usage Examples**

### **Example 1: Basic Component Styling**
```typescript
import { COLORS } from '../../constants/colors';

const MyComponent = () => {
  return (
    <div style={{ backgroundColor: COLORS.BG_PRIMARY }}>
      <h1 style={{ color: COLORS.TEXT_PRIMARY }}>
        Welcome to Cupcake
      </h1>
      <p style={{ color: COLORS.TEXT_SECONDARY }}>
        Delicious cakes for everyone
      </p>
    </div>
  );
};
```

### **Example 2: Button Component**
```typescript
import { COLORS, COLOR_COMBINATIONS } from '../../constants/colors';

const Button = ({ variant = 'primary', children, ...props }) => {
  const buttonStyle = variant === 'primary' 
    ? COLOR_COMBINATIONS.BUTTON.primary
    : COLOR_COMBINATIONS.BUTTON.secondary;

  return (
    <button
      style={{
        backgroundColor: buttonStyle.background,
        color: buttonStyle.text,
        border: variant === 'secondary' ? `1px solid ${COLORS.BORDER_PRIMARY}` : 'none',
        padding: '12px 24px',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 
          variant === 'primary' ? COLORS.BUTTON_PRIMARY_HOVER : COLORS.BUTTON_SECONDARY_HOVER;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = buttonStyle.background;
      }}
      {...props}
    >
      {children}
    </button>
  );
};
```

### **Example 3: Card Component**
```typescript
import { COLOR_COMBINATIONS } from '../../constants/colors';

const Card = ({ children, ...props }) => {
  return (
    <div
      style={{
        backgroundColor: COLOR_COMBINATIONS.CARD.background,
        border: `1px solid ${COLOR_COMBINATIONS.CARD.border}`,
        borderRadius: '16px',
        padding: '24px',
        boxShadow: `0 20px 25px -5px ${COLOR_COMBINATIONS.CARD.shadow}`,
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 25px 50px -12px ${COLOR_COMBINATIONS.CARD.hoverShadow}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 20px 25px -5px ${COLOR_COMBINATIONS.CARD.shadow}`;
      }}
      {...props}
    >
      {children}
    </div>
  );
};
```

## 🔧 **Advanced Features**

### **Opacity Helper Function**
```typescript
import { getColorWithOpacity } from '../../constants/colors';

// Get primary color with 50% opacity
const semiTransparent = getColorWithOpacity(COLORS.PRIMARY, 0.5);
// Result: rgba(124, 82, 40, 0.5)
```

### **Dynamic Color Changes**
```typescript
const [isHovered, setIsHovered] = useState(false);

<div
  style={{
    backgroundColor: isHovered ? COLORS.BUTTON_PRIMARY_HOVER : COLORS.BUTTON_PRIMARY,
    transition: 'background-color 0.3s ease',
  }}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>
  Hover me!
</div>
```

## 📱 **Responsive Color Usage**

### **Dark Mode Support (Future)**
```typescript
// You can easily extend this system for dark mode
const isDarkMode = false; // Get from theme context

const dynamicColors = {
  background: isDarkMode ? COLORS.PRIMARY_DEEP : COLORS.BG_PRIMARY,
  text: isDarkMode ? COLORS.TEXT_WHITE : COLORS.TEXT_PRIMARY,
};
```

## 🎨 **Design Tips**

### **Color Hierarchy**
1. **Primary Brown** (`#7C5228`) - Main actions, buttons, links
2. **Deep Brown** (`#553329`) - Headings, important text
3. **Cream** (`#F5F1E8`) - Backgrounds, subtle elements
4. **White** (`#FFFFFF`) - Cards, content areas

### **Accessibility**
- Always ensure sufficient contrast between text and background
- Use `COLORS.TEXT_PRIMARY` on light backgrounds
- Use `COLORS.TEXT_WHITE` on dark backgrounds

### **Consistency**
- Use the same color for the same purpose across components
- Stick to the predefined combinations for buttons and cards
- Use opacity variations for subtle effects

## 🔄 **Updating Colors**

### **To Change a Color:**
1. Open `src/constants/colors.ts`
2. Update the hex value
3. All components using that color will automatically update

### **To Add a New Color:**
1. Add the color to `COLORS` object
2. Add it to relevant `COLOR_COMBINATIONS` if needed
3. Import and use in your components

## 📚 **Best Practices**

1. **Always import colors** from the constants file
2. **Use COLOR_COMBINATIONS** for common patterns
3. **Don't hardcode hex values** in components
4. **Use semantic names** (e.g., `TEXT_PRIMARY` not `BROWN_800`)
5. **Test color combinations** for accessibility
6. **Keep the color palette** focused and consistent

## 🎯 **Next Steps**

1. **Update existing components** to use the new color system
2. **Create reusable components** with consistent styling
3. **Add dark mode support** if needed
4. **Create color variations** for different themes
5. **Document any new color patterns** you create

---

**Remember**: This color system makes your project more maintainable and consistent. Use it everywhere instead of hardcoded colors! 🎨✨
