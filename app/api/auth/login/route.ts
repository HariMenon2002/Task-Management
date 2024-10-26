import User from "@/lib/models/user.model";
import { connectedToDB } from "@/lib/mongoose";
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  await connectedToDB();
  const { username, password } = await req.json();

  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  return NextResponse.json({ token });
}
