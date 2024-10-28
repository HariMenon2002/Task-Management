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
    (req as any).userId = decoded.id;
    //return NextResponse.next();  // NextResponse.next() does not work here
    return null;
  } catch  {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
}
