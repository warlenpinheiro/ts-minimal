export interface HttpRequest {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
}

export interface HttpResponse<T = any> {
  status: number;
  data: T;
  headers: Record<string, string>;
}

export interface IHttpClient {
  request<T = any>(request: HttpRequest): Promise<HttpResponse<T>>;
  get<T = any>(url: string, headers?: Record<string, string>): Promise<HttpResponse<T>>;
  post<T = any>(url: string, body?: any, headers?: Record<string, string>): Promise<HttpResponse<T>>;
  put<T = any>(url: string, body?: any, headers?: Record<string, string>): Promise<HttpResponse<T>>;
  delete<T = any>(url: string, headers?: Record<string, string>): Promise<HttpResponse<T>>;
}