import jwt from 'jsonwebtoken';
import { NextResponse, NextRequest } from 'next/server';

export async function authenticate(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const token = authHeader ? authHeader.split(' ')[1] : null;

  if (!token) {
    return NextResponse.json({ message: 'No token provided' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    //req.headers.set('userId', decoded.id);
    (req as any).userId = decoded.id;
    //return NextResponse.next();  // Proceed to the next middleware or handler
    return null;
  } catch  {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
}
