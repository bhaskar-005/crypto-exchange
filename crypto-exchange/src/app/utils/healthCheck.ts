import axios from "axios";
import toast from "react-hot-toast";
import { HealthCheckResponse } from "./types";

const BASE_URL = "https://exchange-proxy.100xdevs.com/api/v1";

/**
 * Fetches health-check data from the server
 * Shows a loading toast while the request is in progress
 * @returns HealthCheckResponse or null if failed
 */
export async function fetchHealthCheck(): Promise<HealthCheckResponse | null> {
  const toastId = toast.loading("Checking server health...");

  try {
    const response = await axios.get<HealthCheckResponse>(`${BASE_URL}/health`, {
      timeout: 10000, // 10 second timeout
    });

    toast.success("Server is healthy!", { id: toastId });
    return response.data;
  } catch (error) {
    let errorMessage = "Health check failed";

    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        errorMessage = "Request timed out";
      } else if (error.response) {
        errorMessage = `Server error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = "No response from server";
      }
    }

    toast.error(errorMessage, { id: toastId });
    console.error("Health check error:", error);
    return null;
  }
}

/**
 * Fetches health-check data with custom toast messages
 * @param loadingMessage - Custom loading message
 * @param successMessage - Custom success message
 * @param errorMessage - Custom error message
 * @returns HealthCheckResponse or null if failed
 */
export async function fetchHealthCheckWithCustomToast(
  loadingMessage: string = "Checking server health...",
  successMessage: string = "Server is healthy!",
  errorMessage: string = "Health check failed"
): Promise<HealthCheckResponse | null> {
  const toastId = toast.loading(loadingMessage);

  try {
    const response = await axios.get<HealthCheckResponse>(`${BASE_URL}/health`, {
      timeout: 10000,
    });

    toast.success(successMessage, { id: toastId });
    return response.data;
  } catch (error) {
    toast.error(errorMessage, { id: toastId });
    console.error("Health check error:", error);
    return null;
  }
}

/**
 * Performs a silent health check without showing any toast notifications
 * Useful for background health monitoring
 * @returns HealthCheckResponse or null if failed
 */
export async function silentHealthCheck(): Promise<HealthCheckResponse | null> {
  try {
    const response = await axios.get<HealthCheckResponse>(`${BASE_URL}/health`, {
      timeout: 10000,
    });
    return response.data;
  } catch (error) {
    console.error("Silent health check error:", error);
    return null;
  }
}