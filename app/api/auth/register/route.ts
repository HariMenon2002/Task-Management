import User from "@/lib/models/user.model";
import { connectedToDB } from "@/lib/mongoose";
import jwt from 'jsonwebtoken';

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  await connectedToDB();
  const { username, password } = await req.json();

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return NextResponse.json({ message: 'Username already taken' }, { status: 400 });
  }

  const user = new User({ username, password });
  await user.save();
  //const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  return NextResponse.json({ message: 'User registered successfully' });
}
