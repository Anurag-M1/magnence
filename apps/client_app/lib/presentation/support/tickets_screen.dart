import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../data/repositories/supabase_repository.dart';
import '../../providers/auth_provider.dart';
import '../widgets/glass_container.dart';
import '../../core/theme/app_colors.dart';
import 'create_ticket_screen.dart';

class TicketsScreen extends ConsumerStatefulWidget {
  final bool isAdmin;
  final ClientUser? impersonatedClient;
  const TicketsScreen({super.key, this.isAdmin = false, this.impersonatedClient});

  @override
  ConsumerState<TicketsScreen> createState() => _TicketsScreenState();
}

class _TicketsScreenState extends ConsumerState<TicketsScreen> {
  final _db = SupabaseRepository();
  List<SupportTicket> _tickets = [];

  @override
  void initState() {
    super.initState();
    _loadTickets();
  }

  Future<void> _loadTickets() async {
    final state = ref.read(authProvider);
    List<SupportTicket> fetchedTickets = [];
    final client = widget.impersonatedClient ?? state.clientUser;
    
    if (widget.isAdmin && widget.impersonatedClient == null) {
      fetchedTickets = await _db.getAllTickets();
    } else if (client != null) {
      fetchedTickets = await _db.getClientTickets(client.id);
    }
    setState(() {
      _tickets = fetchedTickets;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: widget.isAdmin 
        ? AppBar(title: const Text('All Open Tickets', style: TextStyle(fontWeight: FontWeight.bold, letterSpacing: -0.5))) 
        : null,
      body: Container(
        color: AppColors.background,
        child: _tickets.isEmpty
            ? Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(Icons.support_agent_outlined, size: 48, color: AppColors.textMuted.withOpacity(0.5)),
                    const SizedBox(height: 16),
                    Text(
                      widget.isAdmin ? "No tickets across platform." : "You have no open support tickets.",
                      style: TextStyle(color: AppColors.textSecondary),
                    ),
                  ],
                ),
              )
            : ListView(
                padding: const EdgeInsets.all(24),
                children: [
                   if (!widget.isAdmin) ...[
                    _RemoteAccessCard(impersonatedClient: widget.impersonatedClient),
                    const SizedBox(height: 24),
                  ],
                  ..._tickets.map((ticket) => GlassContainer(
                    margin: const EdgeInsets.only(bottom: 16),
                    opacity: 0.05,
                    child: ListTile(
                      contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
                      title: Text(ticket.title, style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
                      subtitle: Padding(
                        padding: const EdgeInsets.only(top: 4.0),
                        child: Text(ticket.description, maxLines: 2, overflow: TextOverflow.ellipsis, style: TextStyle(color: AppColors.textSecondary, fontSize: 13)),
                      ),
                      trailing: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          _StatusChip(status: ticket.status),
                        ],
                      ),
                      onTap: widget.isAdmin ? () async {
                        // Close ticket logic for admin
                        await _db.closeTicket(ticket.id);
                        _loadTickets();
                      } : null,
                    ),
                  )).toList(),
                ],
              ),
      ),
      floatingActionButton: widget.isAdmin ? null : FloatingActionButton(
        backgroundColor: AppColors.primary,
        onPressed: () async {
          final result = await Navigator.push(
            context,
            MaterialPageRoute(builder: (_) => CreateTicketScreen(
              impersonatedClient: widget.impersonatedClient,
            )),
          );
          if (result == true) {
            _loadTickets();
          }
        },
        child: const Icon(Icons.add, color: AppColors.background),
      ),
    );
  }
}

class _StatusChip extends StatelessWidget {
  final String status;
  const _StatusChip({required this.status});

  @override
  Widget build(BuildContext context) {
    final isOpen = status.toLowerCase() == 'open';
    final color = isOpen ? AppColors.primary : AppColors.textSecondary;

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: color.withOpacity(0.3)),
      ),
      child: Text(
        status.toUpperCase(),
        style: TextStyle(color: color, fontSize: 9, fontWeight: FontWeight.bold),
      ),
    );
  }
}

class _RemoteAccessCard extends ConsumerWidget {
  final ClientUser? impersonatedClient;
  const _RemoteAccessCard({this.impersonatedClient});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return GlassContainer(
      opacity: 0.1,
      padding: const EdgeInsets.all(20),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.05),
              borderRadius: BorderRadius.circular(12),
            ),
            child: const Icon(Icons.edgesensor_high_outlined, color: Colors.white, size: 24),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Remote Support', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Colors.white)),
                Text('Request live assistance now', style: TextStyle(color: AppColors.textSecondary, fontSize: 13)),
              ],
            ),
          ),
          ElevatedButton(
            onPressed: () async {
              final authState = ref.read(authProvider);
              final client = impersonatedClient ?? authState.clientUser;
              
              if (client != null) {
                await SupabaseRepository().createTicket(SupportTicket(
                  id: '',
                  clientId: client.id,
                  title: 'REMOTE ACCESS REQUEST',
                  description: 'Client is requesting live remote support.',
                  createdAt: DateTime.now(),
                ));
                if (context.mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Remote access requested. Support team notified.')),
                  );
                }
              }
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.primary,
              foregroundColor: AppColors.background,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            ),
            child: const Text('Request', style: TextStyle(fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    );
  }
}

