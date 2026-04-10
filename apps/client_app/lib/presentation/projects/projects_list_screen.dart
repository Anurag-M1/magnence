import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../providers/auth_provider.dart';
import '../../data/repositories/supabase_repository.dart';
import '../widgets/glass_container.dart';
import '../../core/theme/app_colors.dart';

class ProjectsListScreen extends ConsumerWidget {
  final ClientUser? impersonatedClient;
  const ProjectsListScreen({super.key, this.impersonatedClient});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final client = impersonatedClient ?? ref.watch(authProvider).clientUser;
    final db = SupabaseRepository();

    return DefaultTabController(
      length: 3,
      child: Column(
        children: [
          TabBar(
            isScrollable: true,
            indicatorColor: AppColors.primary,
            labelColor: AppColors.primary,
            unselectedLabelColor: AppColors.textSecondary,
            tabs: const [
              Tab(text: 'Active'),
              Tab(text: 'Completed'),
              Tab(text: 'On Hold'),
            ],
          ),
          Expanded(
            child: Container(
              color: AppColors.background,
              child: TabBarView(
                children: [
                  _buildProjectList(context, db, client?.id, 'Active'),
                  _buildProjectList(context, db, client?.id, 'Completed'),
                  _buildProjectList(context, db, client?.id, 'On Hold'),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildProjectList(BuildContext context, SupabaseRepository db, String? clientId, String status) {
    if (clientId == null) return const Center(child: Text('Please login to view projects.'));

    return FutureBuilder<List<Project>>(
      future: db.getClientProjects(clientId),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }
        
        final projects = (snapshot.data ?? []).where((p) => p.status == status).toList();
        
        if (projects.isEmpty) {
          return Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(Icons.folder_open, size: 48, color: AppColors.textMuted.withOpacity(0.5)),
                const SizedBox(height: 16),
                Text('No $status projects found.', style: const TextStyle(color: AppColors.textSecondary)),
              ],
            ),
          );
        }

        return ListView.builder(
          padding: const EdgeInsets.all(24),
          itemCount: projects.length,
          itemBuilder: (context, index) {
            final project = projects[index];
            return _ProjectCard(project: project);
          },
        );
      },
    );
  }
}

class _ProjectCard extends StatelessWidget {
  final Project project;
  const _ProjectCard({required this.project});

  @override
  Widget build(BuildContext context) {
    return GlassContainer(
      margin: const EdgeInsets.only(bottom: 20),
      padding: const EdgeInsets.all(24),
      opacity: 0.05,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Text(
                  project.title,
                  style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white),
                ),
              ),
              _StatusChip(status: project.status),
            ],
          ),
          const SizedBox(height: 12),
          Text(
            project.description,
            style: const TextStyle(color: AppColors.textSecondary, fontSize: 14),
          ),
          const SizedBox(height: 24),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Progress',
                style: TextStyle(color: AppColors.textSecondary.withOpacity(0.8), fontSize: 12, fontWeight: FontWeight.w500),
              ),
              Text(
                '${(project.progress * 100).toInt()}%',
                style: const TextStyle(color: AppColors.primary, fontSize: 13, fontWeight: FontWeight.bold),
              ),
            ],
          ),
          const SizedBox(height: 8),
          ClipRRect(
            borderRadius: BorderRadius.circular(4),
            child: LinearProgressIndicator(
              value: project.progress,
              backgroundColor: AppColors.glassBorder,
              color: AppColors.primary,
              minHeight: 6,
            ),
          ),
          const SizedBox(height: 16),
          Text(
            'Last updated ${project.updatedAt.day}/${project.updatedAt.month}/${project.updatedAt.year}',
            style: const TextStyle(color: AppColors.textMuted, fontSize: 11),
          ),
        ],
      ),
    );
  }
}

class _StatusChip extends StatelessWidget {
  final String status;
  const _StatusChip({required this.status});

  @override
  Widget build(BuildContext context) {
    Color color;
    switch (status) {
      case 'Active': color = AppColors.primary; break;
      case 'Completed': color = AppColors.textSecondary; break;
      default: color = AppColors.textMuted;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: color.withOpacity(0.3)),
      ),
      child: Text(
        status,
        style: TextStyle(color: color, fontSize: 11, fontWeight: FontWeight.bold),
      ),
    );
  }
}
