// import mongoose, { Schema } from 'mongoose';

// export interface IProject extends mongoose.Document {
//   name: string;
//   team: mongoose.Types.ObjectId;
//   tasks: mongoose.Types.ObjectId[];
// }

// // const ProjectSchema: Schema = new Schema({
// //   name: { type: String, required: true },
// //   team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
// //   tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
// // });

// // export default mongoose.model<IProject>('Project', ProjectSchema);




// // backend/src/models/Project.ts
// // import mongoose from 'mongoose';

// const projectSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.model('Project', projectSchema);


import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }], // ← ADD THIS
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Project', projectSchema);