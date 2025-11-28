import { StyleSheet } from 'react-native';

export const colors = {
  // Light theme
  light: {
    primary: '#3B82F6',
    primaryDark: '#2563EB',
    background: '#F9FAFB',
    surface: '#FFFFFF',
    text: '#111827',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    gray50: '#F9FAFB',
    gray100: '#F3F4F6',
    gray200: '#E5E7EB',
    gray300: '#D1D5DB',
    gray700: '#374151',
    gray800: '#1F2937',
    gray900: '#111827',
  },
  // Dark theme
  dark: {
    primary: '#60A5FA',
    primaryDark: '#3B82F6',
    background: '#030712',
    surface: '#111827',
    text: '#F9FAFB',
    textSecondary: '#9CA3AF',
    border: '#374151',
    success: '#34D399',
    error: '#F87171',
    warning: '#FBBF24',
    gray50: '#1F2937',
    gray100: '#374151',
    gray200: '#4B5563',
    gray300: '#6B7280',
    gray700: '#D1D5DB',
    gray800: '#E5E7EB',
    gray900: '#F9FAFB',
  },
};

export const getStyles = (isDark) => {
  const theme = isDark ? colors.dark : colors.light;
  
  return StyleSheet.create({
    // Container styles
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    surface: {
      backgroundColor: theme.surface,
      borderRadius: 12,
      padding: 16,
      marginHorizontal: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    
    // Text styles
    heading: {
      fontSize: 24,
      fontWeight: '700',
      color: theme.text,
    },
    subheading: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.text,
    },
    body: {
      fontSize: 16,
      color: theme.text,
    },
    bodySmall: {
      fontSize: 14,
      color: theme.textSecondary,
    },
    caption: {
      fontSize: 12,
      color: theme.textSecondary,
    },
    
    // Button styles
    button: {
      backgroundColor: theme.primary,
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    buttonSecondary: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonSecondaryText: {
      color: theme.text,
      fontSize: 16,
      fontWeight: '600',
    },
    
    // Input styles
    input: {
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 16,
      fontSize: 16,
      color: theme.text,
    },
    
    // Card styles
    card: {
      backgroundColor: theme.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    
    // Badge styles
    badge: {
      paddingVertical: 4,
      paddingHorizontal: 12,
      borderRadius: 12,
      alignSelf: 'flex-start',
    },
    badgeActive: {
      backgroundColor: isDark ? 'rgba(52, 211, 153, 0.2)' : '#D1FAE5',
    },
    badgePresent: {
      backgroundColor: isDark ? 'rgba(96, 165, 250, 0.2)' : '#DBEAFE',
    },
    badgeAbsent: {
      backgroundColor: isDark ? 'rgba(248, 113, 113, 0.2)' : '#FEE2E2',
    },
    badgeLeft: {
      backgroundColor: isDark ? 'rgba(251, 191, 36, 0.2)' : '#FEF3C7',
    },
    badgeTextActive: {
      color: isDark ? '#34D399' : '#10B981',
      fontSize: 12,
      fontWeight: '600',
    },
    badgeTextPresent: {
      color: isDark ? '#60A5FA' : '#3B82F6',
      fontSize: 12,
      fontWeight: '600',
    },
    badgeTextAbsent: {
      color: isDark ? '#F87171' : '#EF4444',
      fontSize: 12,
      fontWeight: '600',
    },
    badgeTextLeft: {
      color: isDark ? '#FBBF24' : '#F59E0B',
      fontSize: 12,
      fontWeight: '600',
    },
    
    // Avatar styles
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.gray200,
    },
    avatarLarge: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: theme.gray200,
    },
    
    // Divider
    divider: {
      height: 1,
      backgroundColor: theme.border,
      marginVertical: 12,
    },
    
    // Shadow
    shadow: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    
    // Stats card
    statsCard: {
      backgroundColor: theme.surface,
      borderRadius: 12,
      padding: 16,
      flex: 1,
      marginHorizontal: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
  });
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 9999,
};
