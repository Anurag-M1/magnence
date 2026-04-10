class ApiEndpoints {
  // Auth
  static const String login = '/auth/login';
  static const String refresh = '/auth/refresh';
  static const String logout = '/auth/logout';

  // Client
  static const String profile = '/client/profile';
  static const String dashboard = '/client/dashboard';

  // Projects
  static const String projects = '/projects';
  static String projectDetails(String id) => '/projects/$id';
  static String projectMilestones(String id) => '/projects/$id/milestones';
  static String projectComments(String id) => '/projects/$id/comments';

  // Services
  static const String services = '/services';
  static String serviceDetails(String id) => '/services/$id';
  static String serviceUsage(String id) => '/services/$id/usage';

  // Support
  static const String tickets = '/support/tickets';
  static String ticketDetails(String id) => '/support/tickets/$id';
  static String ticketMessages(String id) => '/support/tickets/$id/messages';
}
