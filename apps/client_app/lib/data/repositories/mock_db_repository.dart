import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:uuid/uuid.dart';
import '../../domain/entities/client_user.dart';
import '../../domain/entities/support_ticket.dart';

// Provides access to entities for dependencies
export '../../domain/entities/client_user.dart';
export '../../domain/entities/support_ticket.dart';

// Singleton repository mock for MVP
class MockDbRepository {
  static final MockDbRepository _instance = MockDbRepository._internal();
  factory MockDbRepository() => _instance;
  MockDbRepository._internal();

  final _storage = const FlutterSecureStorage();
  final _uuid = const Uuid();

  static const String _clientsKey = 'mock_clients_db';
  static const String _ticketsKey = 'mock_tickets_db';

  List<ClientUser> _clients = [];
  List<SupportTicket> _tickets = [];

  Future<void> init() async {
    // Load clients
    final clientsStr = await _storage.read(key: _clientsKey);
    if (clientsStr != null) {
      final List<dynamic> jsonList = jsonDecode(clientsStr);
      _clients = jsonList.map((e) => ClientUser.fromJson(e)).toList();
    }

    // Load tickets
    final ticketsStr = await _storage.read(key: _ticketsKey);
    if (ticketsStr != null) {
      final List<dynamic> jsonList = jsonDecode(ticketsStr);
      _tickets = jsonList.map((e) => SupportTicket.fromJson(e)).toList();
    }
  }

  // Auth Methods
  Future<Map<String, dynamic>?> login(String email, String password) async {
    if (email == 'admin@magnence.com' && password == 'admin') {
      return {'role': 'admin', 'user': null};
    }
    
    // Check if it's a dynamic client
    try {
      final client = _clients.firstWhere((c) => c.email == email && c.password == password);
      return {'role': 'client', 'user': client};
    } catch (_) {
      return null; // Not found
    }
  }

  // Admin Methods (Client Management)
  List<ClientUser> getAllClients() => [..._clients];

  Future<void> createClient(ClientUser client) async {
    final newClient = ClientUser(
      id: _uuid.v4(),
      email: client.email,
      password: client.password,
      name: client.name,
      metrics: client.metrics, // Dynamic metrics payload
    );
    _clients.add(newClient);
    await _saveClients();
  }

  Future<void> updateClient(ClientUser client) async {
    final index = _clients.indexWhere((c) => c.id == client.id);
    if (index != -1) {
      _clients[index] = client;
      await _saveClients();
    }
  }

  Future<void> deleteClient(String id) async {
    _clients.removeWhere((c) => c.id == id);
    // Also remove their tickets
    _tickets.removeWhere((t) => t.clientId == id);
    await _saveClients();
    await _saveTickets();
  }

  // Ticket Methods
  List<SupportTicket> getAllTickets() => [..._tickets];
  
  List<SupportTicket> getClientTickets(String clientId) {
    return _tickets.where((t) => t.clientId == clientId).toList();
  }

  Future<void> createTicket(SupportTicket ticket) async {
    final newTicket = SupportTicket(
      id: _uuid.v4(),
      clientId: ticket.clientId,
      title: ticket.title,
      description: ticket.description,
      createdAt: DateTime.now(),
    );
    _tickets.add(newTicket);
    await _saveTickets();
  }

  Future<void> closeTicket(String ticketId) async {
    final index = _tickets.indexWhere((t) => t.id == ticketId);
    if (index != -1) {
      final old = _tickets[index];
      _tickets[index] = SupportTicket(
        id: old.id,
        clientId: old.clientId,
        title: old.title,
        description: old.description,
        status: 'closed',
        createdAt: old.createdAt,
      );
      await _saveTickets();
    }
  }

  // Persistence
  Future<void> _saveClients() async {
    final jsonString = jsonEncode(_clients.map((c) => c.toJson()).toList());
    await _storage.write(key: _clientsKey, value: jsonString);
  }

  Future<void> _saveTickets() async {
    final jsonString = jsonEncode(_tickets.map((t) => t.toJson()).toList());
    await _storage.write(key: _ticketsKey, value: jsonString);
  }
}
