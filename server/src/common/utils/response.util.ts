export interface SuccessResponse<T> {
  statusCode: number;
  message: T;
  timestamp: string;
}

export class ResponseUtil {
  static success<T>(message: T): SuccessResponse<T> {
    return {
      statusCode: 200,
      message: message,
      timestamp: new Date().toISOString(),
    };
  }
}
