import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../data/repositories/supabase_repository.dart';
import '../../providers/auth_provider.dart';
import '../../core/theme/app_colors.dart';
import '../../core/services/notification_service.dart';

class CreateTicketScreen extends ConsumerStatefulWidget {
  final ClientUser? impersonatedClient;
  const CreateTicketScreen({super.key, this.impersonatedClient});

  @override
  ConsumerState<CreateTicketScreen> createState() => _CreateTicketScreenState();
}

class _CreateTicketScreenState extends ConsumerState<CreateTicketScreen> {
  final _titleCtrl = TextEditingController();
  final _descCtrl = TextEditingController();
  final _db = SupabaseRepository();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Open a Ticket'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _titleCtrl,
              decoration: const InputDecoration(
                labelText: 'Issue Title',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: _descCtrl,
              maxLines: 5,
              decoration: const InputDecoration(
                labelText: 'Describe your request or issue',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 24),
            SizedBox(
              width: double.infinity,
              height: 50,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: Theme.of(context).colorScheme.primary,
                  foregroundColor: AppColors.background,
                ),
                onPressed: () async {
                  final client = widget.impersonatedClient ?? authState.clientUser;
                  
                  if (client != null && _titleCtrl.text.isNotEmpty) {
                    await _db.createTicket(SupportTicket(
                      id: '',
                      clientId: client.id,
                      title: _titleCtrl.text,
                      description: _descCtrl.text,
                      createdAt: DateTime.now(),
                    ));
                    
                    await NotificationService().showNotification(
                      title: "Ticket Received", 
                      body: "Support team has received '${_titleCtrl.text}'. We'll be on it soon!"
                    );
                    
                    if (context.mounted) {
                      Navigator.pop(context, true); // True indicates success
                    }
                  }
                },
                child: const Text('Submit Ticket', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
