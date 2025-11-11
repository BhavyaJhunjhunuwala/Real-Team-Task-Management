// import mongoose, { Schema } from 'mongoose';

// export interface ITask extends mongoose.Document {
//   title: string;
//   description: string;
//   priority: 'Low' | 'Medium' | 'High';
//   dueDate: Date;
//   assignee: mongoose.Types.ObjectId;
//   status: 'To Do' | 'In Progress' | 'Review' | 'Done';
//   project: mongoose.Types.ObjectId;
// }

// const TaskSchema: Schema = new Schema({
//   title: { type: String, required: true },
//   description: { type: String },
//   priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
//   dueDate: { type: Date },
//   assignee: { type: Schema.Types.ObjectId, ref: 'User' },
//   status: { type: String, enum: ['To Do', 'In Progress', 'Review', 'Done'], default: 'To Do' },
//   project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
// });

// export default mongoose.model<ITask>('Task', TaskSchema);




import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Review', 'Done'],
    default: 'To Do',
  },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true }, // ← REQUIRED
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Task', taskSchema);