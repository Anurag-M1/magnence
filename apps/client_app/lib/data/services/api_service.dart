import 'package:dio/dio.dart';
import '../../core/config/app_config.dart';

class ApiService {
  late final Dio _dio;

  ApiService() {
    _dio = Dio(BaseOptions(
      baseUrl: AppConfig.baseUrl,
      connectTimeout: const Duration(milliseconds: AppConfig.connectionTimeout),
      receiveTimeout: const Duration(milliseconds: AppConfig.receiveTimeout),
    ));

    // Add logging and token interceptors here
    _dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) async {
        // e.g., String? token = await storage.read(key: 'token');
        // if (token != null) options.headers['Authorization'] = 'Bearer $token';
        return handler.next(options);
      },
      onError: (DioException e, handler) async {
        if (e.response?.statusCode == 401) {
          // Handle token refresh
        }
        return handler.next(e);
      },
      onResponse: (response, handler) {
        return handler.next(response);
      }
    ));
  }

  Dio get client => _dio;
}
