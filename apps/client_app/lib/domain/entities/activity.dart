class Activity {
  final String id;
  final String clientId;
  final String title;
  final String subtitle;
  final DateTime timestamp;
  final String type; // e.g., 'update', 'complete', 'new'

  Activity({
    required this.id,
    required this.clientId,
    required this.title,
    required this.subtitle,
    required this.timestamp,
    required this.type,
  });

  Map<String, dynamic> toJson() => {
        'id': id,
        'client_id': clientId,
        'title': title,
        'subtitle': subtitle,
        'timestamp': timestamp.toIso8601String(),
        'type': type,
      };

  factory Activity.fromJson(Map<String, dynamic> json) => Activity(
        id: json['id'],
        clientId: json['client_id'],
        title: json['title'],
        subtitle: json['subtitle'],
        timestamp: DateTime.parse(json['timestamp']),
        type: json['type'],
      );
}
