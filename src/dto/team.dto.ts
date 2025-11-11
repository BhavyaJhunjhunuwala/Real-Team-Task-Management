// import { IsString, IsMongoId, IsEmail, IsOptional } from 'class-validator';

// export class CreateTeamDto {
//   @IsString({ message: 'Team name is required' })
//   name!: string;
// }

// export class InviteMemberDto {
//   @IsMongoId({ message: 'Invalid team ID' })
//   teamId!: string;

//   @IsEmail({}, { message: 'Invalid email' })
//   email!: string;
// }



import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ← ObjectId
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
});

export default mongoose.model('Team', teamSchema);