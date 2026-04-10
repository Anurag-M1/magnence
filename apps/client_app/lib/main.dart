import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'core/theme/app_theme.dart';
import 'presentation/auth/login_screen.dart';
import 'presentation/dashboard/dashboard_screen.dart';
import 'presentation/admin/admin_dashboard_screen.dart';
import 'presentation/splash/splash_screen.dart';
import 'providers/auth_provider.dart';
import 'core/services/notification_service.dart';
import 'package:supabase_flutter/supabase_flutter.dart' hide AuthState;
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_native_splash/flutter_native_splash.dart';

void main() async {
  WidgetsBinding widgetsBinding = WidgetsFlutterBinding.ensureInitialized();
  FlutterNativeSplash.preserve(widgetsBinding: widgetsBinding);
  
  await NotificationService().init();
  
  try {
    await dotenv.load(fileName: ".env");
    await Supabase.initialize(
      url: dotenv.env['SUPABASE_URL'] ?? '',
      anonKey: dotenv.env['SUPABASE_ANON_KEY'] ?? '',
    );
  } catch (e) {
    debugPrint("Supabase INIT Warning: No .env loaded. Ensure you created .env with proper keys.");
  }

  runApp(const ProviderScope(child: MagnenceApp()));
}

class MagnenceApp extends ConsumerWidget {
  const MagnenceApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authProvider);

    return MaterialApp(
      title: 'Magnence',
      debugShowCheckedModeBanner: false,
      themeMode: ThemeMode.dark,
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      home: _getHomeForState(authState),
    );
  }

  Widget _getHomeForState(AuthState state) {
    switch (state.status) {
      case AuthStatus.initial:
      case AuthStatus.loading:
        return const SplashScreen();
      case AuthStatus.authenticatedAdmin:
        return const AdminDashboardScreen(); // New screen
      case AuthStatus.authenticatedClient:
        return const DashboardScreen(); 
      case AuthStatus.unauthenticated:
      case AuthStatus.error:
      default:
        return const LoginScreen();
    }
  }
}
