import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../providers/auth_provider.dart';
import '../../data/repositories/supabase_repository.dart';
import '../projects/projects_list_screen.dart';
import '../support/tickets_screen.dart';
import '../widgets/glass_container.dart';
import '../../core/theme/app_colors.dart';
import '../../core/services/notification_service.dart';

class DashboardScreen extends ConsumerStatefulWidget {
  final bool isAdminPreview;
  final ClientUser? impersonatedClient;
  const DashboardScreen({super.key, this.isAdminPreview = false, this.impersonatedClient});

  @override
  ConsumerState<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends ConsumerState<DashboardScreen> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    final client = widget.impersonatedClient ?? ref.watch(authProvider).clientUser;
    final List<Widget> pages = [
      _DashboardHome(
        isAdminPreview: widget.isAdminPreview, 
        impersonatedClient: widget.impersonatedClient
      ),
      ProjectsListScreen(impersonatedClient: widget.impersonatedClient),
      TicketsScreen(impersonatedClient: widget.impersonatedClient),
    ];

    final isDesktop = MediaQuery.of(context).size.width >= 800;

    if (isDesktop) {
      return Scaffold(
        appBar: AppBar(
          title: Text(widget.isAdminPreview ? 'Workspace Preview' : (client?.name ?? 'Magnence Workspace')),
          actions: [
            if (!widget.isAdminPreview)
              IconButton(
                icon: const Icon(Icons.logout),
                onPressed: () => ref.read(authProvider.notifier).logout(),
              ),
          ],
        ),
        body: Row(
          children: [
            NavigationRail(
              selectedIndex: _currentIndex,
              backgroundColor: AppColors.background.withOpacity(0.5),
              onDestinationSelected: (index) {
                setState(() => _currentIndex = index);
              },
              labelType: NavigationRailLabelType.all,
              destinations: const [
                NavigationRailDestination(
                  icon: Icon(Icons.grid_view_rounded),
                  selectedIcon: Icon(Icons.grid_view_rounded),
                  label: Text('Dashboard'),
                ),
                NavigationRailDestination(
                  icon: Icon(Icons.folder_outlined),
                  selectedIcon: Icon(Icons.folder),
                  label: Text('Projects'),
                ),
                NavigationRailDestination(
                  icon: Icon(Icons.support_agent_outlined),
                  selectedIcon: Icon(Icons.support_agent),
                  label: Text('Support'),
                ),
              ],
            ),
            const VerticalDivider(thickness: 1, width: 1, color: AppColors.glassBorder),
            Expanded(child: pages[_currentIndex]),
          ],
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text('Magnence'),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_outlined),
            onPressed: () {},
          ),
          if (!widget.isAdminPreview)
            IconButton(
              icon: const Icon(Icons.logout),
              onPressed: () => ref.read(authProvider.notifier).logout(),
            ),
        ],
      ),
      body: pages[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) => setState(() => _currentIndex = index),
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.grid_view_rounded),
            activeIcon: Icon(Icons.grid_view_rounded),
            label: 'Dashboard',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.folder_outlined),
            activeIcon: Icon(Icons.folder),
            label: 'Projects',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.support_agent_outlined),
            activeIcon: Icon(Icons.support_agent),
            label: 'Support',
          ),
        ],
      ),
    );
  }
}

class _DashboardHome extends ConsumerWidget {
  final bool isAdminPreview;
  final ClientUser? impersonatedClient;
  const _DashboardHome({required this.isAdminPreview, this.impersonatedClient});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final client = impersonatedClient ?? ref.watch(authProvider).clientUser;
    final allMetrics = client?.metrics ?? {};
    
    // Explicitly filter out legacy metrics
    final metrics = Map<String, dynamic>.from(allMetrics)..removeWhere((key, value) {
      final k = key.toLowerCase();
      return k.contains('seo') || k.contains('traffic');
    });

    final db = SupabaseRepository();

    return Container(
      decoration: const BoxDecoration(
        color: AppColors.background,
      ),
      child: LayoutBuilder(
        builder: (context, constraints) {
          final isWide = constraints.maxWidth > 900;
          
          return SingleChildScrollView(
            padding: EdgeInsets.all(isWide ? 40.0 : 24.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildHeader(context, client),
                const SizedBox(height: 32),
                
                // Adaptive Metrics Grid
                GridView.builder(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: constraints.maxWidth > 1100 ? 4 : (constraints.maxWidth > 650 ? 2 : 1),
                    crossAxisSpacing: 20,
                    mainAxisSpacing: 20,
                    childAspectRatio: 2.0,
                  ),
                  itemCount: metrics.length.clamp(4, 10),
                  itemBuilder: (context, index) {
                    if (metrics.isEmpty) {
                      return const _StatCardPlaceholder();
                    }
                    final entry = metrics.entries.elementAt(index % metrics.length);
                    return _StatCard(
                      title: entry.key,
                      value: entry.value.toString(),
                      icon: _getIconForMetric(entry.key),
                      color: _getColorForMetric(index),
                    );
                  },
                ),
                
                const SizedBox(height: 40),
                
                // Agency Specific Section: Billing & Roadmap
                if (isWide)
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Expanded(flex: 2, child: _buildRecentActivity(context, db, client)),
                      const SizedBox(width: 32),
                      Expanded(flex: 1, child: _buildBillingCard(context, client)),
                    ],
                  )
                else
                  Column(
                    children: [
                      _buildBillingCard(context, client),
                      const SizedBox(height: 32),
                      _buildRecentActivity(context, db, client),
                    ],
                  ),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildHeader(BuildContext context, ClientUser? client) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          client?.name ?? (isAdminPreview ? 'Workspace Preview' : 'Loading...'),
          style: Theme.of(context).textTheme.headlineMedium?.copyWith(
            fontWeight: FontWeight.w900,
            letterSpacing: -1,
            color: Colors.white,
          ),
        ),
        const SizedBox(height: 4),
        if (client?.customerId != null)
          Text(
            'CID: ${client!.customerId}',
            style: TextStyle(color: AppColors.textSecondary, fontSize: 14, fontWeight: FontWeight.w500, letterSpacing: 1),
          ),
        const SizedBox(height: 12),
      ],
    );
  }

  Widget _buildBillingCard(BuildContext context, ClientUser? client) {
    final lastInvoice = client?.metrics['Last Invoice'] ?? 'Paid';
    final nextPayment = client?.metrics['Next Payment'] ?? 'Scheduled';
    final isOverdue = nextPayment.toLowerCase().contains('overdue');

    return GlassContainer(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Row(
            children: [
              Icon(Icons.account_balance_wallet_outlined, color: AppColors.primary, size: 20),
              SizedBox(width: 12),
              Text('Financial Summary', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
            ],
          ),
          const SizedBox(height: 24),
          _buildBillRow('Last Invoice', lastInvoice, Colors.green),
          _buildBillRow('Next Payment', nextPayment, isOverdue ? Colors.red : Colors.orange),
          const SizedBox(height: 24),
          ElevatedButton(
            onPressed: () {},
            style: ElevatedButton.styleFrom(
              minimumSize: const Size(double.infinity, 50),
              backgroundColor: Colors.white.withOpacity(0.05),
              side: const BorderSide(color: AppColors.glassBorder),
            ),
            child: const Text('View Invoices', style: TextStyle(fontSize: 14)),
          ),
        ],
      ),
    );
  }

  Widget _buildBillRow(String label, String status, Color statusColor) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(color: AppColors.textSecondary, fontSize: 13)),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
            decoration: BoxDecoration(
              color: statusColor.withOpacity(0.1),
              borderRadius: BorderRadius.circular(6),
            ),
            child: Text(
              status,
              style: TextStyle(color: statusColor, fontSize: 11, fontWeight: FontWeight.bold),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildRecentActivity(BuildContext context, SupabaseRepository db, ClientUser? client) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Stream Feed',
              style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold),
            ),
            TextButton(
              onPressed: () {},
              child: const Text('Full History', style: TextStyle(color: AppColors.primary)),
            ),
          ],
        ),
        const SizedBox(height: 16),
        FutureBuilder<List<Activity>>(
          future: client != null ? db.getClientActivities(client.id) : Future.value([]),
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const Center(child: Padding(
                padding: EdgeInsets.all(40.0),
                child: CircularProgressIndicator(),
              ));
            }
            final activities = snapshot.data ?? [];
            if (activities.isEmpty) {
              return const GlassContainer(
                padding: EdgeInsets.all(40),
                child: Center(child: Text('No recent pulses in your workspace.', style: TextStyle(color: AppColors.textSecondary))),
              );
            }
            return ListView.separated(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: activities.length,
              separatorBuilder: (context, index) => const SizedBox(height: 12),
              itemBuilder: (context, index) => _ActivityItem(activity: activities[index]),
            );
          },
        ),
      ],
    );
  }

  IconData _getIconForMetric(String key) {
    final k = key.toLowerCase();
    if (k.contains('value') || k.contains('bill')) return Icons.payments_outlined;
    if (k.contains('balance')) return Icons.account_balance_outlined;
    if (k.contains('milestone') || k.contains('phase')) return Icons.flag_outlined;
    if (k.contains('health') || k.contains('status')) return Icons.favorite_border_outlined;
    return Icons.analytics_outlined;
  }

  Color _getColorForMetric(int index) {
    return AppColors.textPrimary;
  }
}

class _StatCardPlaceholder extends StatelessWidget {
  const _StatCardPlaceholder();
  @override
  Widget build(BuildContext context) {
    return const GlassContainer(opacity: 0.05, child: Center(child: Text('---', style: TextStyle(color: Colors.white24))));
  }
}

class _StatCard extends StatelessWidget {
  final String title;
  final String value;
  final IconData icon;
  final Color color;

  const _StatCard({required this.title, required this.value, required this.icon, required this.color});

  @override
  Widget build(BuildContext context) {
    return GlassContainer(
      opacity: 0.05,
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Row(
            children: [
              Icon(icon, color: color, size: 20),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  title,
                  style: const TextStyle(color: AppColors.textSecondary, fontSize: 12, fontWeight: FontWeight.w500),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            ],
          ),
          const Spacer(),
          Text(
            value,
            style: TextStyle(color: color, fontSize: 28, fontWeight: FontWeight.bold, letterSpacing: -1),
          ),
        ],
      ),
    );
  }
}

class _ActivityItem extends StatelessWidget {
  final Activity activity;
  const _ActivityItem({required this.activity});

  @override
  Widget build(BuildContext context) {
    return GlassContainer(
      opacity: 0.05,
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
      child: Row(
        children: [
          CircleAvatar(
            backgroundColor: _getTypeColor(activity.type).withOpacity(0.1),
            child: Icon(_getTypeIcon(activity.type), color: _getTypeColor(activity.type), size: 20),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(activity.title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
                Text(activity.subtitle, style: const TextStyle(color: AppColors.textSecondary, fontSize: 13)),
              ],
            ),
          ),
          Text(
            _formatTime(activity.timestamp),
            style: const TextStyle(color: AppColors.textMuted, fontSize: 11),
          ),
        ],
      ),
    );
  }

  Color _getTypeColor(String type) {
    switch (type) {
      case 'new': return AppColors.primary;
      case 'complete': return Colors.indigo;
      default: return AppColors.accent;
    }
  }

  IconData _getTypeIcon(String type) {
    switch (type) {
      case 'new': return Icons.add_circle_outline;
      case 'complete': return Icons.check_circle_outline;
      default: return Icons.update;
    }
  }

  String _formatTime(DateTime time) {
    final now = DateTime.now();
    final diff = now.difference(time);
    
    // If it's today, show exact time
    if (time.year == now.year && time.month == now.month && time.day == now.day) {
      final hour = time.hour > 12 ? time.hour - 12 : (time.hour == 0 ? 12 : time.hour);
      final ampm = time.hour >= 12 ? 'PM' : 'AM';
      final minute = time.minute.toString().padLeft(2, '0');
      return '$hour:$minute $ampm';
    }

    if (diff.inDays < 7) return '${diff.inDays}d ago';
    
    return '${time.day}/${time.month}/${time.year}';
  }
}
