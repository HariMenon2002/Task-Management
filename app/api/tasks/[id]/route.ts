import Task from "@/lib/models/task.model";
import { connectedToDB } from "@/lib/mongoose";
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectedToDB();
  const task = await Task.findById(params.id);
  if (!task) return NextResponse.json({ message: 'Task not found' }, { status: 404 });
  return NextResponse.json(task);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectedToDB();
  const data = await req.json();
  const task = await Task.findByIdAndUpdate(params.id, data, { new: true });
  if (!task) return NextResponse.json({ message: 'Task not found' }, { status: 404 });
  return NextResponse.json(task);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectedToDB();
  const task = await Task.findByIdAndDelete(params.id);
  if (!task) return NextResponse.json({ message: 'Task not found' }, { status: 404 });
  return NextResponse.json({ message: 'Task deleted successfully' });
}
