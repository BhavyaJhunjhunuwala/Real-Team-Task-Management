// import mongoose, { Schema } from 'mongoose';
// import bcrypt from 'bcryptjs';

// export interface IUser extends mongoose.Document {
//   email: string;
//   password: string;
//   role: 'Admin' | 'Member';
//   teams: mongoose.Types.ObjectId[];
//   comparePassword(candidatePassword: string): Promise<boolean>;
// }

// const UserSchema: Schema = new Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['Admin', 'Member'], default: 'Member' },
//   teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
// });

// UserSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// UserSchema.methods.comparePassword = async function (candidatePassword: string) {
//   return bcrypt.compare(candidatePassword, this.password);
// };

// export default mongoose.model<IUser>('User', UserSchema);




// // import mongoose, { Schema } from 'mongoose';
// // import bcrypt from 'bcryptjs';

// // export interface IUser extends mongoose.Document {
// //   email: string;
// //   password: string;
// //   role: 'Admin' | 'Member';
// //   teams: mongoose.Types.ObjectId[];
// //   comparePassword(candidatePassword: string): Promise<boolean>;
// // }

// // const UserSchema: Schema = new Schema({
// //   email: { type: String, required: true, unique: true },
// //   password: { type: String, required: true },
// //   role: { type: String, enum: ['Admin', 'Member'], default: 'Member' },
// //   teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
// // });

// // // Pre-save hook with proper typing
// // UserSchema.pre('save', async function (next) {
// //   const user = this as IUser;

// //   if (!user.isModified('password')) return next();

// //   try {
// //     const salt = await bcrypt.genSalt(10);
// //     user.password = await bcrypt.hash(user.password, salt);
// //     next();
// //   } catch (err) {
// //     next(err as Error);
// //   }
// // });

// // // Compare password method
// // UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
// //   return bcrypt.compare(candidatePassword, this.password);
// // };

// // export default mongoose.model<IUser>('User', UserSchema);




// // import mongoose, { Schema, Document } from 'mongoose';
// // import bcrypt from 'bcryptjs';

// // export interface IUser extends Document {
// //   email: string;
// //   password: string;
// //   role: 'Admin' | 'Member';
// //   teams: mongoose.Types.ObjectId[];
// //   comparePassword(candidatePassword: string): Promise<boolean>;
// // }

// // const UserSchema: Schema<IUser> = new Schema({
// //   email: { type: String, required: true, unique: true },
// //   password: { type: String, required: true },
// //   role: { type: String, enum: ['Admin', 'Member'], default: 'Member' },
// //   teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
// // });

// // UserSchema.pre('save', async function (next) {
// //   const user = this as IUser;

// //   if (!user.isModified('password')) return next();

// //   try {
// //     const salt = await bcrypt.genSalt(10);
// //     user.password = await bcrypt.hash(user.password, salt);
// //     next();
// //   } catch (err) {
// //     next(err as Error);
// //   }
// // });

// // UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
// //   return bcrypt.compare(candidatePassword, this.password);
// // };

// // export default mongoose.model<IUser>('User', UserSchema);




// // import mongoose from 'mongoose';
// // import bcrypt from 'bcrypt';

// // export interface IUser extends mongoose.Document {
// //   email: string;
// //   password: string;
// //   role: 'Admin' | 'Member';
// //   comparePassword(candidate: string): Promise<boolean>;
// // }

// // const userSchema = new mongoose.Schema<IUser>({
// //   email: { type: String, required: true, unique: true, lowercase: true },
// //   password: { type: String, required: true },
// //   role: { type: String, enum: ['Admin', 'Member'], default: 'Member' },
// // });

// // // HASH PASSWORD BEFORE SAVE
// // userSchema.pre('save', async function (next) {
// //   if (!this.isModified('password')) return next();

// //   try {
// //     const salt = await bcrypt.genSalt(10);
// //     this.password = await bcrypt.hash(this.password, salt);
// //     next();
// //   } catch (err: any) {
// //     next(err);
// //   }
// // });

// // // COMPARE PASSWORD METHOD
// // userSchema.methods.comparePassword = async function (candidate: string): Promise<boolean> {
// //   return bcrypt.compare(candidate, this.password);
// // };

// // export default mongoose.model<IUser>('User', userSchema);




// import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';

// export interface IUser extends mongoose.Document {
//   email: string;
//   password: string;
//   role: 'Admin' | 'Member';
//   teams: mongoose.Types.ObjectId[]; // ← ADD THIS
//   comparePassword(candidate: string): Promise<boolean>;
// }

// const userSchema = new mongoose.Schema<IUser>({
//   email: { type: String, required: true, unique: true, lowercase: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['Admin', 'Member'], default: 'Member' },
//   teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }], // ← ADD
// });

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// userSchema.methods.comparePassword = async function (candidate: string) {
//   return bcrypt.compare(candidate, this.password);
// };

// export default mongoose.model<IUser>('User', userSchema);




import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  role: 'Admin' | 'Member';
  teams: mongoose.Types.ObjectId[];
  comparePassword(candidate: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Member'], default: 'Member' },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }], // ← REQUIRED
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

export default mongoose.model<IUser>('User', userSchema);