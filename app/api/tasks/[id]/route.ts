
import Task from "@/lib/models/task.model";
import { connectedToDB } from "@/lib/mongoose";
import { NextRequest, NextResponse } from 'next/server';
import { checkAuth } from '@/lib/utils/checkAuth';

export const GET = checkAuth(async (req: NextRequest, { params }: { params: { id: string } }) => {
  await connectedToDB();
  const { id } = await params; 
  const task = await Task.findById(id);
  if (!task) return NextResponse.json({ message: 'Task not found' }, { status: 404 });
  return NextResponse.json(task);
});

export const PUT = checkAuth(async (req: NextRequest, { params }: { params: { id: string } }) => {
  await connectedToDB();
  const data = await req.json();
  const { id } = await params; 
  const task = await Task.findByIdAndUpdate(id, data, { new: true });
  if (!task) return NextResponse.json({ message: 'Task not found' }, { status: 404 });
  return NextResponse.json(task);
});

export const DELETE = checkAuth(async (req: NextRequest, { params }: { params: { id: string } }) => {
  await connectedToDB();
  const { id } = await params; 
  const task = await Task.findByIdAndDelete(id);
  if (!task) return NextResponse.json({ message: 'Task not found' }, { status: 404 });
  return NextResponse.json({ message: 'Task deleted successfully' });
});
