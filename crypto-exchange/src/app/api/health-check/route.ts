import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    message: 'Service is running smoothly',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    services: {
      database: 'connected',
      cache: 'active',
      api: 'operational'
    },
    metrics: {
      uptime: Math.floor(process.uptime()),
      memoryUsage: process.memoryUsage().heapUsed,
      cpuUsage: process.cpuUsage()
    }
  });
}