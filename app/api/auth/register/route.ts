import User from "@/lib/models/user.model";
import { connectedToDB } from "@/lib/mongoose";


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

  return NextResponse.json({ message: 'User registered successfully' });
}
