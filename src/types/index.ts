export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

export interface HealthCheck {
  status: string;
  timestamp: string;
  uptime: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}