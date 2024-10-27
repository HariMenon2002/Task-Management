import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  completed: boolean;
  
}

const TaskSchema: Schema<ITask> = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
  
}, {
  timestamps: true,
});

const Task: Model<ITask> = mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);

export default Task;
