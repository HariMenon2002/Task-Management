
import User from "@/lib/models/user.model";
import { connectedToDB } from "@/lib/mongoose";
import { NextResponse } from 'next/server';

const USERNAME_REGEX = /^[a-zA-Z0-9]{3,30}$/; // Alphanumeric, 3-30 characters
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // At least 8 characters, one uppercase, one lowercase, one number, and one special character

export async function POST(req: Request) {
  await connectedToDB();
  const { username, password } = await req.json();


  if (!USERNAME_REGEX.test(username)) {  //validates user
    return NextResponse.json({ message: 'Username must be 3-30 characters long and can only contain letters and numbers.' }, { status: 400 });
  }

 
  if (!PASSWORD_REGEX.test(password)) {
    return NextResponse.json({ message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.' }, { status: 400 });
  }

  
  const existingUser = await User.findOne({ username });  // Check for existing user
  if (existingUser) {
    return NextResponse.json({ message: 'Username already taken' }, { status: 400 });
  }

  
  const user = new User({ username, password });
  await user.save();
  
 
  return NextResponse.json({ message: 'User registered successfully' });
}

