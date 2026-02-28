"use client";

import { useHealthCheck } from "@/app/utils/useHealthCheck";

export function HealthCheckButton() {
  const { healthData, isLoading, error, checkHealth } = useHealthCheck();

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <button
        onClick={checkHealth}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? "Checking..." : "Check Server Health"}
      </button>

      {healthData && (
        <div className="p-4 bg-green-100 border border-green-400 rounded-lg">
          <p className="text-green-800 font-semibold">
            Status: {healthData.status}
          </p>
          {healthData.message && (
            <p className="text-green-700">{healthData.message}</p>
          )}
          {healthData.timestamp && (
            <p className="text-green-600 text-sm">
              Last checked: {new Date(healthData.timestamp).toLocaleString()}
            </p>
          )}
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-100 border border-red-400 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}
    </div>
  );
}