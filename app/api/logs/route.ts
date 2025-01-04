import { NextResponse } from 'next/server';
import { getLogs } from '@/lib/logger';

export async function GET() {
  const logs = getLogs();
  return NextResponse.json({ logs });
}

