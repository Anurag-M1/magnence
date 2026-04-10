class SupportTicket {
  final String id;
  final String clientId;
  final String title;
  final String description;
  final String status;
  final DateTime createdAt;

  SupportTicket({
    required this.id,
    required this.clientId,
    required this.title,
    required this.description,
    this.status = 'open',
    required this.createdAt,
  });

  Map<String, dynamic> toJson() => {
        'id': id,
        'clientId': clientId,
        'title': title,
        'description': description,
        'status': status,
        'createdAt': createdAt.toIso8601String(),
      };

  factory SupportTicket.fromJson(Map<String, dynamic> json) => SupportTicket(
        id: json['id'],
        clientId: json['clientId'],
        title: json['title'],
        description: json['description'],
        status: json['status'] ?? 'open',
        createdAt: DateTime.parse(json['createdAt']),
      );
}
