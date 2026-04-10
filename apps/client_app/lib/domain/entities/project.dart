class Project {
  final String id;
  final String clientId;
  final String title;
  final String description;
  final String status;
  final double progress;
  final DateTime updatedAt;

  Project({
    required this.id,
    required this.clientId,
    required this.title,
    required this.description,
    required this.status,
    required this.progress,
    required this.updatedAt,
  });

  Map<String, dynamic> toJson() => {
        'id': id,
        'client_id': clientId,
        'title': title,
        'description': description,
        'status': status,
        'progress': progress,
        'updated_at': updatedAt.toIso8601String(),
      };

  factory Project.fromJson(Map<String, dynamic> json) => Project(
        id: json['id'],
        clientId: json['client_id'],
        title: json['title'],
        description: json['description'],
        status: json['status'],
        progress: (json['progress'] as num).toDouble(),
        updatedAt: DateTime.parse(json['updated_at']),
      );
}
