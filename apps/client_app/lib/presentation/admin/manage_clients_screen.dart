import 'package:flutter/material.dart';
import '../../data/repositories/supabase_repository.dart';
import '../dashboard/dashboard_screen.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../providers/auth_provider.dart';
import '../../core/theme/app_colors.dart';
import '../../domain/entities/client_user.dart';
import '../../domain/entities/project.dart';
import '../../domain/entities/activity.dart';

class ManageClientsScreen extends ConsumerStatefulWidget {
  const ManageClientsScreen({super.key});

  @override
  ConsumerState<ManageClientsScreen> createState() => _ManageClientsScreenState();
}

class _ManageClientsScreenState extends ConsumerState<ManageClientsScreen> {
  final _db = SupabaseRepository();
  List<ClientUser> _clients = [];

  @override
  void initState() {
    super.initState();
    _loadClients();
  }

  Future<void> _loadClients() async {
    final clients = await _db.getAllClients();
    setState(() {
      _clients = clients;
    });
  }

  void _showAddClientDialog() {
    final emailCtrl = TextEditingController();
    final passCtrl = TextEditingController();
    final nameCtrl = TextEditingController();
    final customerIdCtrl = TextEditingController(text: 'MAG-${DateTime.now().year}-${_clients.length + 101}');
    
    final metricsCtrlMap = {
      'Total Project Value': TextEditingController(text: '\$0'),
      'Remaining Balance': TextEditingController(text: '\$0'),
      'Active Milestone': TextEditingController(text: 'Discovery'),
      'Project Health': TextEditingController(text: 'Green'),
      'Last Invoice': TextEditingController(text: 'Paid'),
      'Next Payment': TextEditingController(text: 'Due in 7 days'),
    };

    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          backgroundColor: AppColors.surface,
          title: const Text('New Agency Client', style: TextStyle(fontWeight: FontWeight.bold)),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextField(controller: customerIdCtrl, decoration: const InputDecoration(labelText: 'Customer ID', prefixIcon: Icon(Icons.badge_outlined, size: 18))),
                const SizedBox(height: 16),
                TextField(controller: nameCtrl, decoration: const InputDecoration(labelText: 'Company/Client Name', prefixIcon: Icon(Icons.business_outlined, size: 18))),
                const SizedBox(height: 16),
                TextField(controller: emailCtrl, decoration: const InputDecoration(labelText: 'Email Address', prefixIcon: Icon(Icons.alternate_email, size: 18))),
                const SizedBox(height: 16),
                TextField(controller: passCtrl, decoration: const InputDecoration(labelText: 'Access Password', prefixIcon: Icon(Icons.password, size: 18))),
                const SizedBox(height: 24),
                Row(
                  children: [
                    Icon(Icons.analytics_outlined, color: AppColors.primary, size: 18),
                    const SizedBox(width: 8),
                    const Text('Initial Dashboard Metrics', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                  ],
                ),
                const SizedBox(height: 16),
                ...metricsCtrlMap.entries.map((e) => Padding(
                  padding: const EdgeInsets.only(bottom: 12.0),
                  child: TextField(
                    controller: e.value,
                    decoration: InputDecoration(
                      labelText: e.key,
                      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                    ),
                  ),
                )).toList(),
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: Text('Cancel', style: TextStyle(color: AppColors.textSecondary)),
            ),
            ElevatedButton(
              onPressed: () async {
                if (emailCtrl.text.isNotEmpty && passCtrl.text.isNotEmpty) {
                  final dynamicMetrics = <String, dynamic>{};
                  metricsCtrlMap.forEach((key, ctrl) {
                    dynamicMetrics[key] = ctrl.text;
                  });

                  try {
                    // Show loading
                    if (context.mounted) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Creating client account...'), duration: Duration(seconds: 1)),
                      );
                    }

                    await _db.createClient(ClientUser(
                      id: '',
                      customerId: customerIdCtrl.text,
                      email: emailCtrl.text,
                      password: passCtrl.text,
                      name: nameCtrl.text,
                      metrics: dynamicMetrics,
                    ));
                    
                    _loadClients();
                    if (context.mounted) {
                      Navigator.pop(context);
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Account created successfully!'), backgroundColor: Colors.green),
                      );
                    }
                  } catch (e) {
                    if (context.mounted) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text('Error: ${e.toString()}'), backgroundColor: Colors.red),
                      );
                    }
                  }
                }
              },
              child: const Text('Create Account'),
            ),
          ],
        );
      }
    );
  }

  void _showAddProjectDialog(ClientUser client) {
    final titleCtrl = TextEditingController();
    final descCtrl = TextEditingController();
    final progressCtrl = TextEditingController(text: '0');

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: AppColors.surface,
        title: Text('Start Project: ${client.name}', style: const TextStyle(fontWeight: FontWeight.bold)),
        content: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(controller: titleCtrl, decoration: const InputDecoration(labelText: 'Project Name')),
              const SizedBox(height: 12),
              TextField(controller: descCtrl, decoration: const InputDecoration(labelText: 'Description/Scope')),
              const SizedBox(height: 12),
              TextField(
                controller: progressCtrl, 
                decoration: const InputDecoration(labelText: 'Progress (0.0 - 1.0)', helperText: 'Example: 0.5 for 50%'),
                keyboardType: const TextInputType.numberWithOptions(decimal: true),
              ),
            ],
          ),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
          ElevatedButton(
            onPressed: () async {
              await _db.createProject(Project(
                id: '',
                clientId: client.id,
                title: titleCtrl.text,
                description: descCtrl.text,
                status: 'Active',
                progress: double.tryParse(progressCtrl.text) ?? 0.0,
                updatedAt: DateTime.now(),
              ));
              await _db.createActivity(Activity(
                id: '',
                clientId: client.id,
                title: 'New Milestone Reached',
                subtitle: titleCtrl.text,
                timestamp: DateTime.now(),
                type: 'new',
              ));
              if (context.mounted) Navigator.pop(context);
            },
            child: const Text('Launch Project'),
          ),
        ],
      ),
    );
  }

  void _showManageProjectsDialog(ClientUser client) async {
    final projects = await _db.getClientProjects(client.id);
    
    if (context.mounted) {
      showDialog(
        context: context,
        builder: (context) => AlertDialog(
          backgroundColor: AppColors.surface,
          title: Text('Manage Projects: ${client.name}', style: const TextStyle(fontWeight: FontWeight.bold)),
          content: SizedBox(
            width: double.maxFinite,
            child: projects.isEmpty 
              ? const Padding(
                  padding: EdgeInsets.symmetric(vertical: 20),
                  child: Text('No active projects found.'),
                )
              : ListView.builder(
                  shrinkWrap: true,
                  itemCount: projects.length,
                  itemBuilder: (context, index) {
                    final p = projects[index];
                    return ListTile(
                      title: Text(p.title),
                      subtitle: Text('${p.status} • ${(p.progress * 100).toInt()}%'),
                      trailing: const Icon(Icons.edit, size: 18),
                      onTap: () {
                        Navigator.pop(context);
                        _showEditProjectDialog(client, p);
                      },
                    );
                  },
                ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Close'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pop(context);
                _showAddProjectDialog(client);
              },
              child: const Text('Add New'),
            ),
          ],
        ),
      );
    }
  }

  void _showEditProjectDialog(ClientUser client, Project project) {
    final titleCtrl = TextEditingController(text: project.title);
    final descCtrl = TextEditingController(text: project.description);
    final progressCtrl = TextEditingController(text: project.progress.toString());
    String selectedStatus = project.status;

    showDialog(
      context: context,
      builder: (context) => StatefulBuilder(
        builder: (context, setDialogState) => AlertDialog(
          backgroundColor: AppColors.surface,
          title: const Text('Edit Project Details', style: TextStyle(fontWeight: FontWeight.bold)),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextField(controller: titleCtrl, decoration: const InputDecoration(labelText: 'Project Name')),
                const SizedBox(height: 12),
                TextField(controller: descCtrl, decoration: const InputDecoration(labelText: 'Description')),
                const SizedBox(height: 12),
                TextField(
                  controller: progressCtrl, 
                  decoration: const InputDecoration(labelText: 'Progress (0.0 - 1.0)'),
                  keyboardType: TextInputType.number,
                ),
                const SizedBox(height: 12),
                DropdownButtonFormField<String>(
                  value: selectedStatus,
                  items: ['Active', 'Completed', 'On Hold'].map((s) => DropdownMenuItem(value: s, child: Text(s))).toList(),
                  onChanged: (val) {
                    if (val != null) setDialogState(() => selectedStatus = val);
                  },
                  decoration: const InputDecoration(labelText: 'Status'),
                ),
              ],
            ),
          ),
          actions: [
             IconButton(
              icon: const Icon(Icons.delete_outline, color: Colors.red),
              onPressed: () async {
                await _db.deleteProject(project.id);
                if (context.mounted) Navigator.pop(context);
              },
            ),
            TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
            ElevatedButton(
              onPressed: () async {
                await _db.updateProject(Project(
                  id: project.id,
                  clientId: client.id,
                  title: titleCtrl.text,
                  description: descCtrl.text,
                  status: selectedStatus,
                  progress: double.tryParse(progressCtrl.text) ?? 0.0,
                  updatedAt: DateTime.now(),
                ));
                if (context.mounted) Navigator.pop(context);
              },
              child: const Text('Save Changes'),
            ),
          ],
        ),
      ),
    );
  }

  void _showAddActivityDialog(ClientUser client) {
    final titleCtrl = TextEditingController();
    final subtitleCtrl = TextEditingController();

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: AppColors.surface,
        title: Text('Activity Log: ${client.name}', style: const TextStyle(fontWeight: FontWeight.bold)),
        content: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(controller: titleCtrl, decoration: const InputDecoration(labelText: 'Title')),
              const SizedBox(height: 12),
              TextField(controller: subtitleCtrl, decoration: const InputDecoration(labelText: 'Sub-text/Details')),
            ],
          ),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
          ElevatedButton(
            onPressed: () async {
              await _db.createActivity(Activity(
                id: '',
                clientId: client.id,
                title: titleCtrl.text,
                subtitle: subtitleCtrl.text,
                timestamp: DateTime.now(),
                type: 'update',
              ));
              _loadClients();
              if (context.mounted) Navigator.pop(context);
            },
            child: const Text('Post Log'),
          ),
        ],
      ),
    );
  }

  void _showEditClientDialog(ClientUser client) {
    final emailCtrl = TextEditingController(text: client.email);
    final passCtrl = TextEditingController(text: client.password);
    final nameCtrl = TextEditingController(text: client.name);
    final customerIdCtrl = TextEditingController(text: client.customerId);
    
    final metricsCtrlMap = <String, TextEditingController>{};
    client.metrics.forEach((key, value) {
      final k = key.toLowerCase();
      if (!k.contains('seo') && !k.contains('traffic')) {
        metricsCtrlMap[key] = TextEditingController(text: value.toString());
      }
    });

    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          backgroundColor: AppColors.surface,
          title: Text('Edit Client: ${client.name}', style: const TextStyle(fontWeight: FontWeight.bold)),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextField(controller: customerIdCtrl, decoration: const InputDecoration(labelText: 'Customer ID', prefixIcon: Icon(Icons.badge_outlined, size: 18))),
                const SizedBox(height: 16),
                TextField(controller: nameCtrl, decoration: const InputDecoration(labelText: 'Company Name', prefixIcon: Icon(Icons.business_outlined, size: 18))),
                const SizedBox(height: 16),
                TextField(controller: emailCtrl, decoration: const InputDecoration(labelText: 'Email Address', prefixIcon: Icon(Icons.alternate_email, size: 18))),
                const SizedBox(height: 16),
                TextField(controller: passCtrl, decoration: const InputDecoration(labelText: 'Password', prefixIcon: Icon(Icons.password, size: 18))),
                const SizedBox(height: 24),
                Row(
                  children: [
                    Icon(Icons.analytics_outlined, color: AppColors.primary, size: 18),
                    const SizedBox(width: 8),
                    const Text('Dashboard Metrics', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                  ],
                ),
                const SizedBox(height: 16),
                ...metricsCtrlMap.entries.map((e) => Padding(
                  padding: const EdgeInsets.only(bottom: 12.0),
                  child: TextField(
                    controller: e.value,
                    decoration: InputDecoration(
                      labelText: e.key,
                      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                    ),
                  ),
                )).toList(),
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: Text('Cancel', style: TextStyle(color: AppColors.textSecondary)),
            ),
            ElevatedButton(
              onPressed: () async {
                final updatedMetrics = <String, dynamic>{};
                metricsCtrlMap.forEach((key, ctrl) {
                  updatedMetrics[key] = ctrl.text;
                });

                try {
                  if (context.mounted) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Saving changes...'), duration: Duration(seconds: 1)),
                    );
                  }

                  await _db.updateClient(ClientUser(
                    id: client.id,
                    customerId: customerIdCtrl.text,
                    email: emailCtrl.text,
                    password: passCtrl.text,
                    name: nameCtrl.text,
                    metrics: updatedMetrics,
                  ));
                  
                  _loadClients();
                  if (context.mounted) {
                    Navigator.pop(context);
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Client data updated!'), backgroundColor: Colors.green),
                    );
                  }
                } catch (e) {
                  if (context.mounted) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('Update failed: ${e.toString()}'), backgroundColor: Colors.red),
                    );
                  }
                }
              },
              child: const Text('Save Changes'),
            ),
          ],
        );
      }
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Client Management', style: TextStyle(fontWeight: FontWeight.bold)),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 8.0),
            child: IconButton(
              icon: Icon(Icons.person_add_outlined, color: AppColors.primary),
              onPressed: _showAddClientDialog,
            ),
          )
        ],
      ),
      body: _clients.isEmpty
          ? Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.people_outline, size: 64, color: AppColors.textMuted.withOpacity(0.5)),
                  const SizedBox(height: 16),
                  Text("No agency clients found.", style: TextStyle(color: AppColors.textSecondary)),
                ],
              ),
            )
          : ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: _clients.length,
              itemBuilder: (context, index) {
                final client = _clients[index];
                return Card(
                  margin: const EdgeInsets.only(bottom: 12),
                  child: ExpansionTile(
                    title: Text(client.name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                    subtitle: Text('CID: ${client.customerId}', style: TextStyle(color: AppColors.textSecondary, fontSize: 12)),
                    shape: const RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(20))),
                    collapsedShape: const RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(20))),
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: Wrap(
                          spacing: 12,
                          runSpacing: 12,
                          alignment: WrapAlignment.center,
                          children: [
                            _ActionButton(
                              label: 'Edit',
                              icon: Icons.edit_note_outlined,
                              color: AppColors.textPrimary,
                              onPressed: () => _showEditClientDialog(client),
                            ),
                            _ActionButton(
                              label: 'Impersonate',
                              icon: Icons.personal_video_outlined,
                              color: AppColors.textSecondary,
                              onPressed: () {
                                Navigator.push(context, MaterialPageRoute(
                                  builder: (_) => DashboardScreen(
                                    isAdminPreview: true,
                                    impersonatedClient: client,
                                  )
                                ));
                              },
                            ),
                            _ActionButton(
                              label: 'Timeline',
                              icon: Icons.assignment_outlined,
                              color: AppColors.textPrimary,
                              onPressed: () => _showManageProjectsDialog(client),
                            ),
                            _ActionButton(
                              label: 'Add Project',
                              icon: Icons.add_chart_outlined,
                              color: AppColors.textPrimary,
                              onPressed: () => _showAddProjectDialog(client),
                            ),
                            _ActionButton(
                              label: 'Log Activity',
                              icon: Icons.history_edu_outlined,
                              color: AppColors.textSecondary,
                              onPressed: () => _showAddActivityDialog(client),
                            ),
                            IconButton(
                              icon: const Icon(Icons.delete_sweep_outlined, color: Colors.white24),
                              onPressed: () async {
                                await _db.deleteClient(client.id);
                                _loadClients();
                              },
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                );
              },
            ),
    );
  }
}

class _ActionButton extends StatelessWidget {
  final String label;
  final IconData icon;
  final Color color;
  final VoidCallback onPressed;

  const _ActionButton({required this.label, required this.icon, required this.onPressed, required this.color});

  @override
  Widget build(BuildContext context) {
    return ElevatedButton.icon(
      onPressed: onPressed,
      icon: Icon(icon, size: 16),
      label: Text(label, style: const TextStyle(fontSize: 12)),
      style: ElevatedButton.styleFrom(
        backgroundColor: color.withOpacity(0.1),
        foregroundColor: color,
        side: BorderSide(color: color.withOpacity(0.3)),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        minimumSize: const Size(120, 45),
      ),
    );
  }
}
