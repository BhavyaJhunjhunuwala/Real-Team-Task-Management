import mongoose, { Schema } from 'mongoose';

export interface ITeam extends mongoose.Document {
  name: string;
  admin: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  projects: mongoose.Types.ObjectId[];
}

// const TeamSchema: Schema = new Schema({
//   name: { type: String, required: true },
//   admin: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
//   projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
// });

// export default mongoose.model<ITeam>('Team', TeamSchema);

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }], // ← ADD
});

export default mongoose.model('Team', teamSchema);