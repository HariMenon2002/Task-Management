// import Task from "@/lib/models/task.model";
// import { connectedToDB } from "@/lib/mongoose";
// import { NextResponse } from 'next/server';

// export async function GET() {
//   await connectedToDB();
//   const tasks = await Task.find();
//   return NextResponse.json(tasks);
// }

// export async function POST(req: Request) {
//   await connectedToDB();
//   const data = await req.json();

//   const task = new Task(data);
//   await task.save();

//   return NextResponse.json(task, { status: 201 });
// }



import Task from "@/lib/models/task.model";
import { connectedToDB } from "@/lib/mongoose";
import { NextRequest, NextResponse } from 'next/server';
import { checkAuth } from '@/lib/utils/checkAuth';

export const GET = checkAuth(async () => {
  await connectedToDB();
  const tasks = await Task.find();
  return NextResponse.json(tasks);
});

export const POST = checkAuth(async (req: NextRequest) => {
  await connectedToDB();
  const data = await req.json();

  const task = new Task(data);
  await task.save();

  return NextResponse.json(task, { status: 201 });
});
