"use client";

import { useState, useCallback } from "react";
import { fetchHealthCheck } from "./healthCheck";
import { HealthCheckResponse } from "./types";

interface UseHealthCheckResult {
  healthData: HealthCheckResponse | null;
  isLoading: boolean;
  error: string | null;
  checkHealth: () => Promise<void>;
}

/**
 * Custom hook for fetching health-check data with loading state
 * @returns UseHealthCheckResult with healthData, isLoading, error, and checkHealth function
 */
export function useHealthCheck(): UseHealthCheckResult {
  const [healthData, setHealthData] = useState<HealthCheckResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkHealth = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const result = await fetchHealthCheck();

    if (result) {
      setHealthData(result);
    } else {
      setError("Failed to fetch health data");
    }

    setIsLoading(false);
  }, []);

  return {
    healthData,
    isLoading,
    error,
    checkHealth,
  };
}