import 'package:supabase_flutter/supabase_flutter.dart';
import '../../domain/entities/client_user.dart';
import '../../domain/entities/support_ticket.dart';
import '../../domain/entities/project.dart';
import '../../domain/entities/activity.dart';
import 'package:uuid/uuid.dart';

// Provides access to entities for dependencies
export '../../domain/entities/client_user.dart';
export '../../domain/entities/support_ticket.dart';
export '../../domain/entities/project.dart';
export '../../domain/entities/activity.dart';

class SupabaseRepository {
  static final SupabaseRepository _instance = SupabaseRepository._internal();
  factory SupabaseRepository() => _instance;
  SupabaseRepository._internal();

  final _supabase = Supabase.instance.client;
  final _uuid = const Uuid();

  Future<void> init() async {}

  Future<Map<String, dynamic>?> login(String email, String password) async {
    final cleanEmail = email.trim().toLowerCase();
    final rawPass = password; // DO NOT TRIM - might contain meaningful spaces
    
    // Debug log to help you verify what's being entered
    print('[AUTH] Attempting admin login for: $cleanEmail');
    
    // Admin credentials (Case-insensitive email)
    final isAdminEmail = cleanEmail == 'anurag@magnence.com' || cleanEmail == 'himanshu@magnence.com';
    final isValidAdminPass = rawPass == r'($_94709M@c44881_$)' || rawPass == r'$_94709M@c44881_$';

    if (isAdminEmail && isValidAdminPass) {
      print('[AUTH] Admin Login SUCCESS');
      return {'role': 'admin', 'user': null};
    } else if (isAdminEmail) {
      print('[AUTH] Email matched admin but PASSWORD FAILED. Received: "$rawPass"');
    }
    
    try {
      final response = await _supabase
          .from('client_profiles')
          .select()
          .eq('email', email)
          .eq('password', password)
          .maybeSingle();

      if (response != null) {
        final client = ClientUser.fromJson(response);
        return {'role': 'client', 'user': client};
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  Future<List<ClientUser>> getAllClients() async {
    try {
      final response = await _supabase.from('client_profiles').select();
      return (response as List).map((e) => ClientUser.fromJson(e)).toList();
    } catch (e) {
      return [];
    }
  }

  Future<void> createClient(ClientUser client) async {
    try {
      final newClient = ClientUser(
        id: _uuid.v4(),
        customerId: client.customerId,
        email: client.email,
        password: client.password,
        name: client.name,
        metrics: client.metrics,
      );
      
      final response = await _supabase.from('client_profiles').insert(newClient.toJson());
      print('[DB] Client creation success: ${newClient.email}');
    } catch (e) {
      print('[DB] ERROR creating client: $e');
      rethrow;
    }
  }

  Future<void> updateClient(ClientUser client) async {
    try {
      final data = client.toJson();
      data.remove('id'); // Primary key should not be in the update body
      
      await _supabase
          .from('client_profiles')
          .update(data)
          .eq('id', client.id);
      print('[DB] Client update success: ${client.id}');
    } catch (e) {
      print('[DB] ERROR updating client: $e');
      rethrow;
    }
  }

  Future<void> deleteClient(String id) async {
    try {
      await _supabase.from('client_profiles').delete().eq('id', id);
      await _supabase.from('support_tickets').delete().eq('clientId', id);
      await _supabase.from('projects').delete().eq('client_id', id);
      await _supabase.from('activities').delete().eq('client_id', id);
    } catch (e) {
      // Handle error
    }
  }

  // --- PROJECTS ---

  Future<List<Project>> getClientProjects(String clientId) async {
    try {
      final response = await _supabase.from('projects').select().eq('client_id', clientId);
      return (response as List).map((e) => Project.fromJson(e)).toList();
    } catch (e) {
      return [];
    }
  }

  Future<void> createProject(Project project) async {
    try {
      final newProject = Project(
        id: _uuid.v4(),
        clientId: project.clientId,
        title: project.title,
        description: project.description,
        status: project.status,
        progress: project.progress,
        updatedAt: DateTime.now(),
      );
      await _supabase.from('projects').insert(newProject.toJson());
    } catch (e) {
      print('[DB] ERROR creating project: $e');
    }
  }

  Future<void> updateProject(Project project) async {
    try {
      final data = project.toJson();
      data.remove('id');
      data.remove('client_id'); // Don't change owner
      data['updated_at'] = DateTime.now().toIso8601String();

      await _supabase
          .from('projects')
          .update(data)
          .eq('id', project.id);
    } catch (e) {
      print('[DB] ERROR updating project: $e');
    }
  }

  Future<void> deleteProject(String id) async {
    try {
      await _supabase.from('projects').delete().eq('id', id);
    } catch (e) {
      print('[DB] ERROR deleting project: $e');
    }
  }

  // --- ACTIVITIES ---

  Future<List<Activity>> getClientActivities(String clientId) async {
    try {
      final response = await _supabase.from('activities').select().eq('client_id', clientId).order('timestamp', ascending: false);
      return (response as List).map((e) => Activity.fromJson(e)).toList();
    } catch (e) {
      return [];
    }
  }

  Future<void> createActivity(Activity activity) async {
    try {
      final newActivity = Activity(
        id: _uuid.v4(),
        clientId: activity.clientId,
        title: activity.title,
        subtitle: activity.subtitle,
        timestamp: DateTime.now(),
        type: activity.type,
      );
      await _supabase.from('activities').insert(newActivity.toJson());
    } catch (e) {
      print('[DB] ERROR creating activity: $e');
    }
  }

  Future<void> deleteActivity(String id) async {
    try {
      await _supabase.from('activities').delete().eq('id', id);
    } catch (e) {
      print('[DB] ERROR deleting activity: $e');
    }
  }

  Future<void> clearAllActivities(String clientId) async {
    try {
      await _supabase.from('activities').delete().eq('client_id', clientId);
    } catch (e) {
      print('[DB] ERROR clearing activities: $e');
    }
  }

  // --- TICKETS ---

  Future<List<SupportTicket>> getAllTickets() async {
    try {
      final response = await _supabase.from('support_tickets').select();
      return (response as List).map((e) => SupportTicket.fromJson(e)).toList();
    } catch (e) {
      return [];
    }
  }

  Future<List<SupportTicket>> getClientTickets(String clientId) async {
    try {
      final response = await _supabase
          .from('support_tickets')
          .select()
          .eq('clientId', clientId);
      return (response as List).map((e) => SupportTicket.fromJson(e)).toList();
    } catch (e) {
      return [];
    }
  }

  Future<void> createTicket(SupportTicket ticket) async {
    try {
      final newTicket = SupportTicket(
        id: _uuid.v4(),
        clientId: ticket.clientId,
        title: ticket.title,
        description: ticket.description,
        createdAt: DateTime.now(),
      );
      await _supabase.from('support_tickets').insert(newTicket.toJson());
    } catch (e) {
      // Handle error
    }
  }

  Future<void> closeTicket(String ticketId) async {
    try {
      await _supabase
          .from('support_tickets')
          .update({'status': 'closed'})
          .eq('id', ticketId);
    } catch (e) {
      // Handle error
    }
  }
}
