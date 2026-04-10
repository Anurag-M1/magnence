import 'package:flutter/material.dart';
import '../widgets/glass_container.dart';
import '../../core/theme/app_colors.dart';

class ProjectDetailScreen extends StatelessWidget {
  final String projectId;
  
  const ProjectDetailScreen({super.key, required this.projectId});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Project Details', style: TextStyle(fontWeight: FontWeight.bold, letterSpacing: -0.5)),
        actions: [
          IconButton(
            icon: const Icon(Icons.share_outlined),
            onPressed: () {},
          )
        ],
      ),
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [AppColors.background, Color(0xFF0F172A)],
          ),
        ),
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Project Overview Header
              GlassContainer(
                padding: const EdgeInsets.all(24),
                child: Column(
                  children: [
                    const CircleAvatar(
                      radius: 32,
                      backgroundColor: AppColors.primary,
                      child: Icon(Icons.rocket_launch, color: Colors.white, size: 32),
                    ),
                    const SizedBox(height: 16),
                    const Text(
                      'Magnence Client Workspace',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 22,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                      decoration: BoxDecoration(
                        color: AppColors.primary.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(color: AppColors.primary.withOpacity(0.3)),
                      ),
                      child: const Text(
                        'Active Phase',
                        style: TextStyle(color: AppColors.primary, fontSize: 12, fontWeight: FontWeight.bold),
                      ),
                    ),
                  ],
                ),
              ),
              
              const SizedBox(height: 32),
              
              Text(
                'Timeline & Milestones',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.bold,
                  letterSpacing: -0.5,
                ),
              ),
              const SizedBox(height: 24),
              
              // Timeline List
              _buildMilestone(context, 'Project Kickoff', 'Completed', true),
              _buildMilestone(context, 'Design Mocks Approved', 'Completed', true),
              _buildMilestone(context, 'MVP Development', 'In Progress', false),
              _buildMilestone(context, 'Final Review', 'Pending', false),
              
              const SizedBox(height: 32),
              
              ElevatedButton(
                onPressed: () {},
                style: ElevatedButton.styleFrom(
                  minimumSize: const Size(double.infinity, 50),
                ),
                child: const Text('Request Update'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildMilestone(BuildContext context, String title, String status, bool isDone) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 0.0),
      child: IntrinsicHeight(
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Column(
              children: [
                Icon(
                  isDone ? Icons.check_circle : Icons.radio_button_unchecked,
                  color: isDone ? AppColors.primary : AppColors.textMuted,
                  size: 24,
                ),
                Expanded(
                  child: title == 'Final Review' 
                    ? const SizedBox() 
                    : Container(
                        width: 2,
                        color: isDone ? AppColors.primary : AppColors.glassBorder,
                      ),
                ),
              ],
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.only(bottom: 32.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: isDone ? FontWeight.bold : FontWeight.w500,
                        color: isDone ? Colors.white : AppColors.textSecondary,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      status,
                      style: TextStyle(
                        color: isDone ? AppColors.primary : AppColors.textMuted,
                        fontSize: 13,
                      ),
                    ),
                  ],
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
