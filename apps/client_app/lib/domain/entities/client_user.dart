class ClientUser {
  final String id;
  final String customerId; // New field
  final String email;
  final String password;
  final String name;
  final Map<String, dynamic> metrics; 

  ClientUser({
    required this.id,
    required this.customerId,
    required this.email,
    required this.password,
    required this.name,
    this.metrics = const {}, 
  });

  Map<String, dynamic> toJson() => {
        'id': id,
        'customer_id': customerId,
        'email': email,
        'password': password,
        'name': name,
        'metrics': metrics,
      };

  factory ClientUser.fromJson(Map<String, dynamic> json) => ClientUser(
        id: json['id'],
        customerId: json['customer_id'] ?? '',
        email: json['email'],
        password: json['password'],
        name: json['name'],
        metrics: json['metrics'] ?? {},
      );
}
