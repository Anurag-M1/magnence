import 'package:flutter/material.dart';

class AppColors {
  AppColors._();

  // Primary brand colors (Monochromatic White)
  static const Color primary = Color(0xFFFFFFFF); 
  static const Color primaryLight = Color(0xFFF8FAFC);
  static const Color primaryDark = Color(0xFFE2E8F0);

  // Secondary/Accent
  static const Color secondary = Color(0xFFFFFFFF); 
  static const Color accent = Color(0xFFFFFFFF); 

  // Backgrounds (Neutral Black based - matching website)
  static const Color background = Color(0xFF0A0A0A); 
  static const Color surface = Color(0xFF121212); 
  static const Color surfaceLight = Color(0xFF1E1E1E); 

  // Glassmorphism specific (Translucent White)
  static const Color glassBackground = Color(0x0DFFFFFF); // 5% White
  static const Color glassBorder = Color(0x1AFFFFFF); // 10% White
  static const Color glassShadow = Color(0x40000000); // 25% Black

  // Text
  static const Color textPrimary = Color(0xFFEDEDED); // Near white
  static const Color textSecondary = Color(0xFFA1A1A1); // Medium grey
  static const Color textMuted = Color(0xFF717171); // Deep grey

  // Status Colors (Keep for functionality but subtle)
  static const Color success = Color(0xFFFFFFFF);
  static const Color warning = Color(0xFFF59E0B);
  static const Color error = Color(0xFFEF4444);
  static const Color info = Color(0xFFFFFFFF);
}
