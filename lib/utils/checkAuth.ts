import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from './middleware';

export function checkAuth(handler: (req: NextRequest, context: any) => Promise<NextResponse>) {
  return async (req: NextRequest, context: any) => {
    const authResult = await authenticate(req);
    if (authResult) return authResult; // Return the authentication error response if any
    return handler(req, context); // Proceed to the handler if authentication is successful
  };
}