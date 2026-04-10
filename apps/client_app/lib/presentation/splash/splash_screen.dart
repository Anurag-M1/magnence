import 'dart:async';
import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../providers/auth_provider.dart';
import '../../core/theme/app_colors.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:flutter_native_splash/flutter_native_splash.dart';

class SplashScreen extends ConsumerStatefulWidget {
  const SplashScreen({super.key});

  @override
  ConsumerState<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends ConsumerState<SplashScreen> with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    FlutterNativeSplash.remove();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 3200),
    );
    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Stack(
        children: [
          // Canvas Particle Background
          Positioned.fill(
            child: ParticleBackground(controller: _controller),
          ),
          
          // Flash Effect (from splash.html @keyframes flashIn)
          // 0.08s duration, 0.05s delay -> ~ 0.0 - 0.04 relative
          FadeTransition(
            opacity: TweenSequence<double>([
              TweenSequenceItem(tween: Tween(begin: 0.0, end: 0.7), weight: 15),
              TweenSequenceItem(tween: Tween(begin: 0.7, end: 0.0), weight: 85),
            ]).animate(CurvedAnimation(
              parent: _controller,
              curve: const Interval(0.0, 0.04, curve: Curves.linear),
            )),
            child: Container(color: Colors.white),
          ),

          // Centered Content
          Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                AnimatedLogoLetters(controller: _controller),
                const SizedBox(height: 18),
                
                // Line expansion (from splash.html @keyframes lineExpand)
                // 1s forwards after 1.4s delay -> 1.4/3.2 to 2.4/3.2 -> 0.43 to 0.75
                AnimatedBuilder(
                  animation: _controller,
                  builder: (context, child) {
                    final progress = CurvedAnimation(
                      parent: _controller,
                      curve: const Interval(0.43, 0.75, curve: Curves.easeOut),
                    ).value;
                    return Container(
                      width: progress * (MediaQuery.of(context).size.width * 0.7).clamp(200, 500),
                      height: 1,
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          colors: [
                            Colors.transparent,
                            Colors.white.withOpacity(0.6),
                            Colors.transparent,
                          ],
                        ),
                      ),
                    );
                  },
                ),
                const SizedBox(height: 10),
                
                // Tagline fade up (from splash.html @keyframes fadeUp)
                // 1s forwards after 1.2s delay -> 1.2/3.2 to 2.2/3.2 -> 0.37 to 0.68
                FadeTransition(
                  opacity: CurvedAnimation(
                    parent: _controller,
                    curve: const Interval(0.37, 0.68, curve: Curves.easeIn),
                  ),
                  child: SlideTransition(
                    position: Tween<Offset>(
                      begin: const Offset(0, 0.4),
                      end: Offset.zero,
                    ).animate(CurvedAnimation(
                      parent: _controller,
                      curve: const Interval(0.37, 0.68, curve: Curves.easeOutCubic),
                    )),
                    child: Text(
                      'Build Ship Scale',
                      style: GoogleFonts.rajdhani(
                        color: Colors.white54,
                        fontSize: 16,
                        letterSpacing: 8,
                        fontWeight: FontWeight.w300,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
          
          // Bottom Loader Bar (from splash.html @keyframes loadBar)
          // 2.2s duration -> 0.0 to 0.68 relative
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: AnimatedBuilder(
              animation: _controller,
              builder: (context, child) {
                final loaderProgress = CurvedAnimation(
                  parent: _controller,
                  curve: const Interval(0.0, 0.68, curve: Curves.linear),
                ).value;
                final loaderOpacity = (1.0 - CurvedAnimation(
                  parent: _controller,
                  curve: const Interval(0.6, 0.68, curve: Curves.linear),
                ).value);
                
                return FractionallySizedBox(
                  alignment: Alignment.centerLeft,
                  widthFactor: loaderProgress,
                  child: Opacity(
                    opacity: loaderOpacity,
                    child: Container(
                      height: 2,
                      color: Colors.white,
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class AnimatedLogoLetters extends StatelessWidget {
  final AnimationController controller;
  const AnimatedLogoLetters({super.key, required this.controller});

  @override
  Widget build(BuildContext context) {
    const text = 'MAGNENCE';
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: List.generate(text.length, (index) {
        return LogoLetter(
          letter: text[index],
          index: index,
          controller: controller,
        );
      }),
    );
  }
}

class LogoLetter extends StatelessWidget {
  final String letter;
  final int index;
  final AnimationController controller;

  const LogoLetter({
    super.key,
    required this.letter,
    required this.index,
    required this.controller,
  });

  @override
  Widget build(BuildContext context) {
    // Start timing from splash.html: 0.1s delay per letter, 0.7s duration
    // Staggered starts: 0.1, 0.2, 0.3... 0.8
    // End times: 0.8, 0.9, 1.0... 1.5
    // Relative to 3.2s:
    final startTime = (0.1 + (index * 0.1)) / 3.2;
    final endTime = (startTime + (0.7 / 3.2));

    return AnimatedBuilder(
      animation: controller,
      builder: (context, child) {
        final animationValue = CurvedAnimation(
          parent: controller,
          curve: Interval(
            startTime.clamp(0.0, 1.0),
            endTime.clamp(0.0, 1.0),
            curve: const Cubic(0.22, 1, 0.36, 1), // Exact cubic-bezier from CSS
          ),
        ).value;

        // Keyframes: letterIn
        // 0% -> translateY(80) scaleX(0.5) rotateX(40deg)
        // 60% -> translateY(-8) scaleX(1.04)
        // 100% -> translateY(0) scaleX(1)
        
        double translateY;
        double scaleX;
        double rotateX;
        double opacity = animationValue;

        if (animationValue < 0.6) {
          final t = animationValue / 0.6;
          translateY = 80 - (88 * t);
          scaleX = 0.5 + (0.54 * t);
          rotateX = 40 * (1 - t);
        } else {
          final t = (animationValue - 0.6) / 0.4;
          translateY = -8 + (8 * t);
          scaleX = 1.04 - (0.04 * t);
          rotateX = 0;
        }

        return Opacity(
          opacity: opacity,
          child: Transform(
            transform: Matrix4.identity()
              ..setEntry(3, 2, 0.001) // perspective
              ..rotateX(rotateX * math.pi / 180)
              ..translate(0.0, translateY)
              ..scale(scaleX, 1.0),
            alignment: Alignment.center,
            child: Text(
              letter,
              style: GoogleFonts.bebasNeue(
                fontSize: (MediaQuery.of(context).size.width * 0.15).clamp(40, 120),
                fontWeight: FontWeight.w900,
                color: Colors.white,
                letterSpacing: 2,
                shadows: const [
                  Shadow(color: Colors.white30, blurRadius: 40),
                  Shadow(color: Colors.white10, blurRadius: 80),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}

class ParticleBackground extends StatelessWidget {
  final Animation<double> controller;
  const ParticleBackground({super.key, required this.controller});

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: controller,
      builder: (context, child) {
        return CustomPaint(
          painter: SimpleParticlePainter(isStatic: controller.isCompleted),
        );
      },
    );
  }
}

class SimpleParticlePainter extends CustomPainter {
  static final math.Random _random = math.Random();
  static List<_Point>? _points;
  final bool isStatic;

  SimpleParticlePainter({required this.isStatic}) {
    _points ??= List.generate(90, (index) => _Point());
  }

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()..style = PaintingStyle.fill;

    for (var p in _points!) {
      if (!isStatic) p.update(size);
      paint.color = Colors.white.withOpacity(p.alpha);
      canvas.drawCircle(Offset(p.x, p.y), p.radius, paint);
    }
  }

  @override
  bool shouldRepaint(covariant SimpleParticlePainter oldDelegate) => !oldDelegate.isStatic;
}

class _Point {
  double x = 0;
  double y = 0;
  double vx = 0;
  double vy = 0;
  double radius = 0;
  double alpha = 0;
  static final math.Random _random = math.Random();

  _Point() {
    x = _random.nextDouble() * 500;
    y = _random.nextDouble() * 800;
    vx = (_random.nextDouble() - 0.5) * 0.6;
    vy = (_random.nextDouble() - 0.5) * 0.6;
    radius = _random.nextDouble() * 1.5 + 0.5;
    alpha = _random.nextDouble() * 0.3 + 0.05;
  }

  void update(Size size) {
    x += vx;
    y += vy;

    if (x < 0) x = size.width;
    if (x > size.width) x = 0;
    if (y < 0) y = size.height;
    if (y > size.height) y = 0;
  }
}
