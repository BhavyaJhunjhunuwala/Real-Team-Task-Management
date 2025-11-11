import mongoose, { Schema } from 'mongoose';

export interface IActivityLog extends mongoose.Document {
  action: string;
  user: mongoose.Types.ObjectId;
  task: mongoose.Types.ObjectId;
  timestamp: Date;
}

const ActivityLogSchema: Schema = new Schema({
  action: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  task: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IActivityLog>('ActivityLog', ActivityLogSchema);


