export interface ApiResponse {
  success: boolean,
  message: string,
  errors?: {
    path: string;
    message: string;
  }[];
}
