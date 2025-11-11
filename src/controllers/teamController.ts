// // // import { Request, Response } from 'express';
// // // import Team, { ITeam } from '../models/Team';
// // // import User from '../models/User';


// // // export const createTeam = async (req: Request, res: Response) => {
// // //   const { name } = req.body;
// // //   const userId = (req as any).user.id;
  

// // //   try {
// // //     const user = await User.findById(userId);
// // //     if (!user || user.role !== 'Admin') return res.status(403).json({ msg: 'Unauthorized' });

// // //     const team = new Team({ name, admin: userId, members: [userId] });
// // //     await team.save();

// // //     const io = req.app.get('io') as import('socket.io').Server;
// // //     io.to(`team_${team._id}`).emit('teamCreated', {
// // //     teamId: team._id,
// // //     name: team.name,
// // //     admin: team.admin,
// // //     });

// // //     user.teams.push(team.id);
// // //     await user.save();

// // //     res.json(team);
// // //   } catch (err: any) {
// // //     res.status(500).json({ msg: err.message });
// // //   }
// // // };



// // // export const inviteMember = async (req: Request, res: Response) => {
// // //   const { teamId, email } = req.body;
// // //   const userId = (req as any).user.id;

// // //   try {
// // //     const team = await Team.findById(teamId);
// // //     if (!team || team.admin.toString() !== userId) return res.status(403).json({ msg: 'Unauthorized' });

// // //     const member = await User.findOne({ email });
// // //     if (!member) return res.status(404).json({ msg: 'User not found' });

// // //     if (!team.members.includes(member.id)) {
// // //       team.members.push(member.id);
// // //       await team.save();
// // //       member.teams.push(team.id);
// // //       await member.save();
// // //     }

// // //     // ADD THIS AFTER member.save()
// // //     const io = req.app.get('io') as import('socket.io').Server;
// // //     io.to(`team_${team._id}`).emit('memberInvited', {
// // //       teamId: team._id,
// // //       member: { id: member._id, email: member.email },
// // //     });


// // //     res.json({ msg: 'Member invited' });
// // //   } catch (err: any) {
// // //     res.status(500).json({ msg: err.message });
// // //   }
// // // };




// // // export const getTeams = async (req: Request, res: Response) => {
// // //   const userId = (req as any).user.id;

// // //   try {
// // //     const user = await User.findById(userId).populate('teams');
// // //     if (!user) return res.status(404).json({ msg: 'User not found' });

// // //     res.json(user.teams);
// // //   } catch (err: any) {
// // //     res.status(500).json({ msg: err.message });
// // //   }
// // // };




// // // // // // // Add more methods like deleteTeam, etc., as needed




// // // // export const createTeam = async (req: Request, res: Response) => {
// // // //   const { name } = req.body;
// // // //   const userId = (req as any).user.id;

// // // //   try {
// // // //     const user = await User.findById(userId);
// // // //     if (!user || user.role !== 'Admin') return res.status(403).json({ msg: 'Unauthorized' });

// // // //     const team = new Team({ name, admin: userId, members: [userId] });
// // // //     await team.save();

// // // //     // ADD: Join admin to new team room
// // // //     const io = req.app.get('io') as import('socket.io').Server;
// // // //     const socket = Array.from(io.sockets.sockets.values()).find(
// // // //       (s: any) => s.user?.id === userId
// // // //     );
// // // //     if (socket) {
// // // //       socket.join(`team_${team._id}`);
// // // //       console.log(`Admin ${userId} joined team_${team._id}`);
// // // //     }

// // // //     io.to(`team_${team._id}`).emit('teamCreated', {
// // // //       teamId: team._id,
// // // //       name: team.name,
// // // //       admin: team.admin,
// // // //     });

// // // //     user.teams.push(team._id);
// // // //     await user.save();

// // // //     res.json(team);
// // // //   } catch (err: any) {
// // // //     res.status(500).json({ msg: err.message });
// // // //   }
// // // // };

// // // // export const inviteMember = async (req: Request, res: Response) => {
// // // //   const { teamId, email } = req.body;
// // // //   const userId = (req as any).user.id;

// // // //   try {
// // // //     const team = await Team.findById(teamId);
// // // //     if (!team || team.admin.toString() !== userId) return res.status(403).json({ msg: 'Unauthorized' });

// // // //     const member = await User.findOne({ email });
// // // //     if (!member) return res.status(404).json({ msg: 'User not found' });

// // // //     if (!team.members.includes(member._id)) {
// // // //       team.members.push(member._id);
// // // //       await team.save();
// // // //       member.teams.push(team._id);
// // // //       await member.save();

// // // //       // ADD: Join member to team room
// // // //       const io = req.app.get('io') as import('socket.io').Server;
// // // //       const memberSocket = Array.from(io.sockets.sockets.values()).find(
// // // //         (s: any) => s.user?.id === member._id.toString()
// // // //       );
// // // //       if (memberSocket) {
// // // //         memberSocket.join(`team_${team._id}`);
// // // //         console.log(`Member ${member.email} joined team_${team._id}`);
// // // //       }

// // // //       io.to(`team_${team._id}`).emit('memberInvited', {
// // // //         teamId: team._id,
// // // //         member: { id: member._id, email: member.email },
// // // //       });
// // // //     }

// // // //     res.json({ msg: 'Member invited' });
// // // //   } catch (err: any) {
// // // //     res.status(500).json({ msg: err.message });
// // // //   }
// // // // };




// // // import { Request, Response } from 'express';
// // // import Team from '../models/Team';
// // // import User from '../models/User';

// // // export const createTeam = async (req: Request, res: Response) => {
// // //   const { name } = req.body;
// // //   const userId = (req as any).user.id;

// // //   try {
// // //     const user = await User.findById(userId);
// // //     if (!user || user.role !== 'Admin') {
// // //       return res.status(403).json({ msg: 'Only Admin can create team' });
// // //     }

// // //     const team = new Team({ name, admin: userId, members: [userId] });
// // //     await team.save();

// // //     user.teams.push(team._id);
// // //     await user.save();

// // //     const io = req.app.get('io') as import('socket.io').Server;
// // //     io.to(`team_${team._id}`).emit('teamCreated', { teamId: team._id, name });

// // //     res.json(team);
// // //   } catch (err: any) {
// // //     res.status(500).json({ msg: err.message });
// // //   }
// // // };

// // // export const inviteMember = async (req: Request, res: Response) => {
// // //   const { teamId, email } = req.body;
// // //   const adminId = (req as any).user.id;

// // //   try {
// // //     const team = await Team.findById(teamId);
// // //     if (!team || team.admin.toString() !== adminId) {
// // //       return res.status(403).json({ msg: 'Only admin can invite' });
// // //     }

// // //     let member = await User.findOne({ email: email.toLowerCase() });
// // //     if (!member) {
// // //       member = new User({ email: email.toLowerCase(), password: 'temp123', role: 'Member' });
// // //       await member.save();
// // //     }

// // //     if (team.members.includes(member._id)) {
// // //       return res.status(400).json({ msg: 'Already in team' });
// // //     }

// // //     team.members.push(member._id);
// // //     member.teams.push(team._id);
// // //     await Promise.all([team.save(), member.save()]);

// // //     const io = req.app.get('io') as import('socket.io').Server;
// // //     io.to(`team_${team._id}`).emit('memberInvited', {
// // //       teamId: team._id,
// // //       member: { id: member._id, email: member.email },
// // //     });

// // //     res.json({ msg: 'Member invited', email: member.email });
// // //   } catch (err: any) {
// // //     res.status(500).json({ msg: err.message });
// // //   }
// // // };

// // // export const getTeams = async (req: Request, res: Response) => {
// // //   const userId = (req as any).user.id;
// // //   try {
// // //     const user = await User.findById(userId).populate('teams');
// // //     res.json(user?.teams || []);
// // //   } catch (err: any) {
// // //     res.status(500).json({ msg: err.message });
// // //   }
// // // };


// // import { Request, Response } from 'express';
// // import Team from '../models/Team';
// // import User from '../models/User';
// // import mongoose from 'mongoose';

// // const ObjectId = mongoose.Types.ObjectId;

// // // ──────────────────────────────────────────────────────────────
// // // CREATE TEAM
// // // ──────────────────────────────────────────────────────────────
// // export const createTeam = async (req: Request, res: Response) => {
// //   const { name } = req.body;
// //   const userId = (req as any).user.id as string;

// //   try {
// //     const user = await User.findById(userId);
// //     if (!user || user.role !== 'Admin') {
// //       return res.status(403).json({ msg: 'Only Admin can create team' });
// //     }

// //     const team = new Team({ name, admin: userId, members: [userId] });
// //     await team.save();

// //     // FIX: Push ObjectId safely
// //     user.teams.push(team._id as unknown as mongoose.Types.ObjectId);
// //     await user.save();

// //     const io = req.app.get('io') as import('socket.io').Server;
// //     io.to(`team_${team._id}`).emit('teamCreated', { teamId: team._id, name });

// //     res.json(team);
// //   } catch (err: any) {
// //     console.error('createTeam error:', err);
// //     res.status(500).json({ msg: err.message });
// //   }
// // };

// // // ──────────────────────────────────────────────────────────────
// // // INVITE MEMBER
// // // ──────────────────────────────────────────────────────────────
// // export const inviteMember = async (req: Request, res: Response) => {
// //   const { teamId, email } = req.body;
// //   const adminId = (req as any).user.id as string;

// //   try {
// //     const team = await Team.findById(teamId);
// //     if (!team || team.admin.toString() !== adminId) {
// //       return res.status(403).json({ msg: 'Only admin can invite' });
// //     }

// //     let member = await User.findOne({ email: email.toLowerCase() });
// //     if (!member) {
// //       member = new User({
// //         email: email.toLowerCase(),
// //         password: 'temp123',
// //         role: 'Member',
// //       });
// //       await member.save();
// //     }

// //     // FIX: Safely get member._id as ObjectId
// //     const memberId = member._id as unknown as mongoose.Types.ObjectId;
// //     const teamIdObj = team._id as unknown as mongoose.Types.ObjectId;

// //     // Check if already in team
// //     if (team.members.some(m => m.toString() === memberId.toString())) {
// //       return res.status(400).json({ msg: 'Already in team' });
// //     }

// //     // FIX: Push ObjectId
// //     team.members.push(memberId);
// //     member.teams.push(teamIdObj);
// //     await Promise.all([team.save(), member.save()]);

// //     const io = req.app.get('io') as import('socket.io').Server;
// //     io.to(`team_${team._id}`).emit('memberInvited', {
// //       teamId: team._id,
// //       member: { id: member._id, email: member.email },
// //     });

// //     res.json({ msg: 'Member invited', email: member.email });
// //   } catch (err: any) {
// //     console.error('inviteMember error:', err);
// //     res.status(500).json({ msg: err.message });
// //   }
// // };

// // // ──────────────────────────────────────────────────────────────
// // // GET TEAMS
// // // ──────────────────────────────────────────────────────────────
// // 





// import { Request, Response } from 'express';
// import Team from '../models/Team';
// import User from '../models/User';
// import mongoose from 'mongoose';

// const ObjectId = mongoose.Types.ObjectId;

// export const inviteMember = async (req: Request, res: Response) => {
//   const { teamId, email } = req.body;
//   const adminId = (req as any).user.id as string; // ← String from JWT

//   try {
//     // FIX: Convert teamId to ObjectId
//     const teamObjectId = new ObjectId(teamId);
//     const team = await Team.findById(teamObjectId);
//     if (!team) {
//       return res.status(404).json({ msg: 'Team not found' });
//     }

//     // FIX: Compare ObjectId with ObjectId
//     if (team.admin.toString() !== adminId) {
//       return res.status(403).json({ msg: 'Only admin can invite' });
//     }

//     let member = await User.findOne({ email: email.toLowerCase() });
//     if (!member) {
//       member = new User({
//         email: email.toLowerCase(),
//         password: 'temp123',
//         role: 'Member',
//       });
//       await member.save();
//     }

//     const memberId = member._id as unknown as mongoose.Types.ObjectId;

//     if (team.members.some(m => m.toString() === memberId.toString())) {
//       return res.status(400).json({ msg: 'Already in team' });
//     }

//     team.members.push(memberId);
//     member.teams.push(team._id as unknown as mongoose.Types.ObjectId);
//     await Promise.all([team.save(), member.save()]);

//     const io = req.app.get('io') as import('socket.io').Server;
//     io.to(`team_${team._id}`).emit('memberInvited', {
//       teamId: team._id,
//       member: { id: member._id, email: member.email },
//     });

//     res.json({ msg: 'Member invited', email: member.email });
//   } catch (err: any) {
//     console.error('inviteMember error:', err);
//     res.status(500).json({ msg: err.message });
//   }
// };





// export const createTeam = async (req: Request, res: Response) => {
//   const { name } = req.body;
//   const userId = (req as any).user.id as string;

//   try {
//     const user = await User.findById(userId);
//     if (!user || user.role !== 'Admin') {
//       return res.status(403).json({ msg: 'Only Admin can create team' });
//     }

//     const team = new Team({
//       name,
//       admin: new ObjectId(userId), // ← Save as ObjectId
//       members: [new ObjectId(userId)],
//     });
//     await team.save();

//     user.teams.push(team._id as unknown as mongoose.Types.ObjectId);
//     await user.save();

//     const io = req.app.get('io') as import('socket.io').Server;
//     io.to(`team_${team._id}`).emit('teamCreated', { teamId: team._id, name });

//     res.json(team);
//   } catch (err: any) {
//     res.status(500).json({ msg: err.message });
//   }
// };




// export const getTeams = async (req: Request, res: Response) => {
//   const userId = (req as any).user.id as string;

//   try {
//     const user = await User.findById(userId).populate('teams');
//     if (!user) return res.status(404).json({ msg: 'User not found' });

//     res.json(user.teams);
//   } catch (err: any) {
//     console.error('getTeams error:', err);
//     res.status(500).json({ msg: err.message });
//   }
// };



// import { Request, Response } from 'express';
// import Team from '../models/Team';
// import User from '../models/User';

// export const createTeam = async (req: Request, res: Response) => {
//   const { name } = req.body;
//   const userId = (req as any).user.id;               // <-- string from JWT

//   try {
//     const user = await User.findById(userId);
//     if (!user || user.role !== 'Admin') {
//       return res.status(403).json({ msg: 'Only Admin can create team' });
//     }

//     const team = new Team({
//       name,
//       admin: userId,               // <-- ObjectId (Mongoose converts string → ObjectId)
//       members: [userId],
//     });
//     await team.save();

//     // add team reference to user
//     user.teams.push(team._id);
//     await user.save();

//     const io = req.app.get('io') as import('socket.io').Server;
//     io.to(`team_${team._id}`).emit('teamCreated', {
//       teamId: team._id,
//       name: team.name,
//     });

//     res.json(team);
//   } catch (err: any) {
//     console.error('createTeam error:', err);
//     res.status(500).json({ msg: err.message });
//   }
// };

// export const inviteMember = async (req: Request, res: Response) => {
//   const { teamId, email } = req.body;
//   const adminId = (req as any).user.id;              // <-- string

//   try {
//     const team = await Team.findById(teamId);
//     if (!team) return res.status(404).json({ msg: 'Team not found' });

//     // <-- CORRECT comparison: both are strings
//     if (team.admin.toString() !== adminId) {
//       return res.status(403).json({ msg: 'Only admin can invite' });
//     }

//     let member = await User.findOne({ email: email.toLowerCase() });
//     if (!member) {
//       member = new User({
//         email: email.toLowerCase(),
//         password: 'temp123',          // will be hashed by pre-save hook
//         role: 'Member',
//       });
//       await member.save();
//     }

//     // avoid duplicates
//     if (team.members.map(m => m.toString()).includes(member._id.toString())) {
//       return res.status(400).json({ msg: 'Already in team' });
//     }

//     team.members.push(member._id);
//     member.teams.push(team._id);
//     await Promise.all([team.save(), member.save()]);

//     const io = req.app.get('io') as import('socket.io').Server;
//     io.to(`team_${team._id}`).emit('memberInvited', {
//       teamId: team._id,
//       member: { id: member._id, email: member.email },
//     });

//     res.json({ msg: 'Member invited', email: member.email });
//   } catch (err: any) {
//     console.error('inviteMember error:', err);
//     res.status(500).json({ msg: err.message });
//   }
// };

// export const getTeams = async (req: Request, res: Response) => {
//   const userId = (req as any).user.id;

//   try {
//     const user = await User.findById(userId).populate('teams');
//     if (!user) return res.status(404).json({ msg: 'User not found' });

//     res.json(user.teams);
//   } catch (err: any) {
//     console.error('getTeams error:', err);
//     res.status(500).json({ msg: err.message });
//   }
// };





// import { Request, Response } from 'express';
// import Team from '../models/Team';
// import User from '../models/User';
// import mongoose from 'mongoose';

// const ObjectId = mongoose.Types.ObjectId;

// // CREATE TEAM
// export const createTeam = async (req: Request, res: Response) => {
//   const { name } = req.body;
//   const userId = (req as any).user.id as string;

//   try {
//     const user = await User.findById(userId);
//     if (!user || user.role !== 'Admin') {
//       return res.status(403).json({ msg: 'Only Admin can create team' });
//     }

//     const team = new Team({
//       name,
//       admin: userId,
//       members: [userId],
//     });
//     await team.save();

//     // Push team ID to user's teams
//     user.teams.push(team._id as any);
//     await user.save();

//     const io = req.app.get('io') as import('socket.io').Server;
//     io.to(`team_${team._id}`).emit('teamCreated', {
//       teamId: team._id,
//       name: team.name,
//     });

//     res.json(team);
//   } catch (err: any) {
//     console.error('createTeam error:', err);
//     res.status(500).json({ msg: err.message });
//   }
// };

// // INVITE MEMBER
// export const inviteMember = async (req: Request, res: Response) => {
//   const { teamId, email } = req.body;
//   const adminId = (req as any).user.id as string;

//   try {
//     const team = await Team.findById(teamId);
//     if (!team) return res.status(404).json({ msg: 'Team not found' });

//     if (team.admin.toString() !== adminId) {
//       return res.status(403).json({ msg: 'Only admin can invite' });
//     }

//     let member = await User.findOne({ email: email.toLowerCase() });
//     if (!member) {
//       member = new User({
//         email: email.toLowerCase(),
//         password: 'temp123',
//         role: 'Member',
//       });
//       await member.save();
//     }

//     // FIX: Safely get IDs as strings for comparison
//     const memberIdStr = member._id.toString();
//     const teamIdStr = team._id.toString();

//     if (team.members.map(m => m.toString()).includes(memberIdStr)) {
//       return res.status(400).json({ msg: 'Already in team' });
//     }

//     // FIX: Push ObjectId directly (Mongoose handles conversion)
//     team.members.push(member._id as any);
//     member.teams.push(team._id as any);
//     await Promise.all([team.save(), member.save()]);

//     const io = req.app.get('io') as import('socket.io').Server;
//     io.to(`team_${team._id}`).emit('memberInvited', {
//       teamId: team._id,
//       member: { id: member._id, email: member.email },
//     });

//     res.json({ msg: 'Member invited', email: member.email });
//   } catch (err: any) {
//     console.error('inviteMember error:', err);
//     res.status(500).json({ msg: err.message });
//   }
// };

// // GET TEAMS
// export const getTeams = async (req: Request, res: Response) => {
//   const userId = (req as any).user.id as string;

//   try {
//     const user = await User.findById(userId).populate('teams');
//     if (!user) return res.status(404).json({ msg: 'User not found' });

//     res.json(user.teams);
//   } catch (err: any) {
//     console.error('getTeams error:', err);
//     res.status(500).json({ msg: err.message });
//   }
// };



// import { Request, Response } from 'express';
// import Team from '../models/Team';
// import User from '../models/User';
// import mongoose from 'mongoose';

// // ──────────────────────────────────────────────────────────────
// // CREATE TEAM
// // ──────────────────────────────────────────────────────────────
// export const createTeam = async (req: Request, res: Response) => {
//   const { name } = req.body;
//   const userId = (req as any).user.id as string;

//   try {
//     const user = await User.findById(userId);
//     if (!user || user.role !== 'Admin') {
//       return res.status(403).json({ msg: 'Only Admin can create team' });
//     }

//     const team = new Team({
//       name,
//       admin: userId,
//       members: [userId],
//     });
//     await team.save();

//     // Push team ID to user's teams
//     user.teams.push(team._id as mongoose.Types.ObjectId);
//     await user.save();

//     const io = req.app.get('io') as import('socket.io').Server;
//     io.to(`team_${team._id}`).emit('teamCreated', {
//       teamId: team._id,
//       name: team.name,
//     });

//     res.json(team);
//   } catch (err: any) {
//     console.error('createTeam error:', err);
//     res.status(500).json({ msg: err.message });
//   }
// };

// // ──────────────────────────────────────────────────────────────
// // INVITE MEMBER
// // ──────────────────────────────────────────────────────────────
// export const inviteMember = async (req: Request, res: Response) => {
//   const { teamId, email } = req.body;
//   const adminId = (req as any).user.id as string;

//   try {
//     const team = await Team.findById(teamId);
//     if (!team) return res.status(404).json({ msg: 'Team not found' });

//     if (team.admin.toString() !== adminId) {
//       return res.status(403).json({ msg: 'Only admin can invite' });
//     }

//     let member = await User.findOne({ email: email.toLowerCase() });
//     if (!member) {
//       member = new User({
//         email: email.toLowerCase(),
//         password: 'temp123',
//         role: 'Member',
//       });
//       await member.save();
//     }

//     // FIX: Type-safe access to _id
//     const memberId = member._id as mongoose.Types.ObjectId;
//     const teamIdObj = team._id as mongoose.Types.ObjectId;

//     // Check if already in team
//     if (team.members.some(m => m.toString() === memberId.toString())) {
//       return res.status(400).json({ msg: 'Already in team' });
//     }

//     // Push ObjectId safely
//     team.members.push(memberId);
//     member.teams.push(teamIdObj);
//     await Promise.all([team.save(), member.save()]);

//     const io = req.app.get('io') as import('socket.io').Server;
//     io.to(`team_${team._id}`).emit('memberInvited', {
//       teamId: team._id,
//       member: { id: member._id, email: member.email },
//     });

//     res.json({ msg: 'Member invited', email: member.email });
//   } catch (err: any) {
//     console.error('inviteMember error:', err);
//     res.status(500).json({ msg: err.message });
//   }
// };

// // ──────────────────────────────────────────────────────────────
// // GET TEAMS
// // ──────────────────────────────────────────────────────────────
// export const getTeams = async (req: Request, res: Response) => {
//   const userId = (req as any).user.id as string;

//   try {
//     const user = await User.findById(userId).populate('teams');
//     if (!user) return res.status(404).json({ msg: 'User not found' });

//     res.json(user.teams);
//   } catch (err: any) {
//     console.error('getTeams error:', err);
//     res.status(500).json({ msg: err.message });
//   }
// };


// import { Request, Response } from 'express';
// import Team from '../models/Team';
// import User from '../models/User';
// import mongoose from 'mongoose';

// // CREATE TEAM
// export const createTeam = async (req: Request, res: Response) => {
//   const { name } = req.body;
//   const userId = (req as any).user.id as string;

//   try {
//     const user = await User.findById(userId);
//     if (!user || user.role !== 'Admin') {
//       return res.status(403).json({ msg: 'Only Admin can create team' });
//     }

//     const team = new Team({
//       name,
//       admin: userId,
//       members: [userId],
//     });
//     await team.save();

//     user.teams.push(team._id);
//     await user.save();

//     const io = req.app.get('io') as import('socket.io').Server;
//     io.to(`team_${team._id}`).emit('teamCreated', {
//       teamId: team._id,
//       name: team.name,
//     });

//     res.json(team);
//   } catch (err: any) {
//     console.error('createTeam error:', err);
//     res.status(500).json({ msg: err.message });
//   }
// };

// // INVITE MEMBER — FIXED
// export const inviteMember = async (req: Request, res: Response) => {
//   const { teamId, email } = req.body;
//   const adminId = (req as any).user.id as string;  // ← string from JWT

//   try {
//     const team = await Team.findById(teamId);
//     if (!team) return res.status(404).json({ msg: 'Team not found' });

//     // FIX: Compare ObjectId → string
//     if (team.admin.toString() !== adminId) {
//       return res.status(403).json({ msg: 'Only admin can invite' });
//     }

//     let member = await User.findOne({ email: email.toLowerCase() });
//     if (!member) {
//       member = new User({
//         email: email.toLowerCase(),
//         password: 'temp123',
//         role: 'Member',
//       });
//       await member.save();
//     }

//     // Check if already in team
//     if (team.members.some(m => m.toString() === member._id.toString())) {
//       return res.status(400).json({ msg: 'Already in team' });
//     }

//     team.members.push(member._id);
//     member.teams.push(team._id);
//     await Promise.all([team.save(), member.save()]);

//     const io = req.app.get('io') as import('socket.io').Server;
//     io.to(`team_${team._id}`).emit('memberInvited', {
//       teamId: team._id,
//       member: { id: member._id, email: member.email },
//     });

//     res.json({ msg: 'Member invited', email: member.email });
//   } catch (err: any) {
//     console.error('inviteMember error:', err);
//     res.status(500).json({ msg: err.message });
//   }
// };

// // GET TEAMS
// export const getTeams = async (req: Request, res: Response) => {
//   const userId = (req as any).user.id as string;

//   try {
//     const user = await User.findById(userId).populate('teams');
//     if (!user) return res.status(404).json({ msg: 'User not found' });

//     res.json(user.teams);
//   } catch (err: any) {
//     console.error('getTeams error:', err);
//     res.status(500).json({ msg: err.message });
//   }
// };




// import { Request, Response } from 'express';
// import Team from '../models/Team';
// import User from '../models/User';
// import mongoose from 'mongoose';

// // ──────────────────────────────────────────────────────────────
// // CREATE TEAM
// // ──────────────────────────────────────────────────────────────
// export const createTeam = async (req: Request, res: Response) => {
//   const { name } = req.body;
//   const userId = (req as any).user.id as string;

//   try {
//     const user = await User.findById(userId);
//     if (!user || user.role !== 'Admin') {
//       return res.status(403).json({ msg: 'Only Admin can create team' });
//     }

//     const team = new Team({
//       name,
//       admin: userId,
//       members: [userId],
//     });
//     await team.save();

//     user.teams.push(team._id);
//     await user.save();

//     const io = req.app.get('io') as import('socket.io').Server;
//     io.to(`team_${team._id}`).emit('teamCreated', {
//       teamId: team._id,
//       name: team.name,
//     });

//     res.json(team);
//   } catch (err: any) {
//     console.error('createTeam error:', err);
//     res.status(500).json({ msg: err.message });
//   }
// };

// // ──────────────────────────────────────────────────────────────
// // INVITE MEMBER — FIXED
// // ──────────────────────────────────────────────────────────────
// export const inviteMember = async (req: Request, res: Response) => {
//   const { teamId, email } = req.body;
//   const adminId = (req as any).user.id as string;

//   try {
//     const team = await Team.findById(teamId);
//     if (!team) return res.status(404).json({ msg: 'Team not found' });

//     // FIX: Compare ObjectId → string
//     if (team.admin.toString() !== adminId) {
//       return res.status(403).json({ msg: 'Only admin can invite' });
//     }

//     let member = await User.findOne({ email: email.toLowerCase() });
//     if (!member) {
//       member = new User({
//         email: email.toLowerCase(),
//         password: 'temp123',
//         role: 'Member',
//       });
//       await member.save();
//     }

//     // FIX: Type-safe _id access
//     const memberId = member._id as mongoose.Types.ObjectId;

//     // Check if already in team
//     if (team.members.some(m => m.equals(memberId))) {
//       return res.status(400).json({ msg: 'Already in team' });
//     }

//     team.members.push(memberId);
//     member.teams.push(team._id);
//     await Promise.all([team.save(), member.save()]);

//     const io = req.app.get('io') as import('socket.io').Server;
//     io.to(`team_${team._id}`).emit('memberInvited', {
//       teamId: team._id,
//       member: { id: member._id, email: member.email },
//     });

//     res.json({ msg: 'Member invited', email: member.email });
//   } catch (err: any) {
//     console.error('inviteMember error:', err);
//     res.status(500).json({ msg: err.message });
//   }
// };

// // ──────────────────────────────────────────────────────────────
// // GET TEAMS
// // ──────────────────────────────────────────────────────────────
// export const getTeams = async (req: Request, res: Response) => {
//   const userId = (req as any).user.id as string;

//   try {
//     const user = await User.findById(userId).populate('teams');
//     if (!user) return res.status(404).json({ msg: 'User not found' });

//     res.json(user.teams);
//   } catch (err: any) {
//     console.error('getTeams error:', err);
//     res.status(500).json({ msg: err.message });
//   }
// };




// import { Request, Response } from 'express';
// import Team from '../models/Team';
// import User from '../models/User';
// import mongoose from 'mongoose';

// // CREATE TEAM — FIXED
// export const createTeam = async (req: Request, res: Response) => {
//   const { name } = req.body;
//   const userId = (req as any).user.id as string;

//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ msg: 'User not found' });
//     }

//     // FIX: Check role correctly
//     if (user.role !== 'Admin') {
//       return res.status(403).json({ msg: 'You should be admin to create a team' });
//     }

//     const team = new Team({
//       name,
//       admin: userId,
//       members: [userId],
//     });
//     await team.save();

//     user.teams.push(team._id);
//     await user.save();

//     const io = req.app.get('io') as import('socket.io').Server;
//     io.to(`team_${team._id}`).emit('teamCreated', {
//       teamId: team._id,
//       name: team.name,
//     });

//     res.json(team);
//   } catch (err: any) {
//     console.error('createTeam error:', err);
//     res.status(500).json({ msg: err.message });
//   }
// };

// // INVITE MEMBER
// export const inviteMember = async (req: Request, res: Response) => {
//   const { teamId, email } = req.body;
//   const adminId = (req as any).user.id as string;

//   try {
//     const team = await Team.findById(teamId);
//     if (!team) return res.status(404).json({ msg: 'Team not found' });

//     if (team.admin.toString() !== adminId) {
//       return res.status(403).json({ msg: 'Only admin can invite' });
//     }

//     let member = await User.findOne({ email: email.toLowerCase() });
//     if (!member) {
//       member = new User({
//         email: email.toLowerCase(),
//         password: 'temp123',
//         role: 'Member',
//       });
//       await member.save();
//     }

//     const memberId = member._id as mongoose.Types.ObjectId;

//     if (team.members.some(m => m.equals(memberId))) {
//       return res.status(400).json({ msg: 'Already in team' });
//     }

//     team.members.push(memberId);
//     member.teams.push(team._id);
//     await Promise.all([team.save(), member.save()]);

//     const io = req.app.get('io') as import('socket.io').Server;
//     io.to(`team_${team._id}`).emit('memberInvited', {
//       teamId: team._id,
//       member: { id: member._id, email: member.email },
//     });

//     res.json({ msg: 'Member invited', email: member.email });
//   } catch (err: any) {
//     console.error('inviteMember error:', err);
//     res.status(500).json({ msg: err.message });
//   }
// };

// // GET TEAMS
// export const getTeams = async (req: Request, res: Response) => {
//   const userId = (req as any).user.id as string;

//   try {
//     const user = await User.findById(userId).populate('teams');
//     if (!user) return res.status(404).json({ msg: 'User not found' });

//     res.json(user.teams);
//   } catch (err: any) {
//     console.error('getTeams error:', err);
//     res.status(500).json({ msg: err.message });
//   }
// };





import { Request, Response } from 'express';
import Team from '../models/Team';
import User from '../models/User';
import mongoose from 'mongoose';

// CREATE TEAM
export const createTeam = async (req: Request, res: Response) => {
  const { name } = req.body;
  const userId = (req as any).user.id as string;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (user.role !== 'Admin') {
      return res.status(403).json({ msg: 'You should be admin to create a team' });
    }

    const team = new Team({
      name,
      admin: userId,
      members: [userId],
    });
    await team.save();

    user.teams.push(team._id);
    await user.save();

    // const io = req.app.get('io') as import('socket.io').Server;
    // io.to(`team_${team._id}`).emit('teamCreated', {
    //   teamId: team._id,
    //   name: team.name,
    // });

      const io = req.app.get('io') as import('socket.io').Server;

// Emit globally since no socket is yet in the new team's room
      io.emit('teamCreated', {
      teamId: team._id,
      name: team.name,
});

  



    res.json(team);
  } catch (err: any) {
    console.error('createTeam error:', err);
    res.status(500).json({ msg: err.message });
  }
};

// INVITE MEMBER — FIXED
export const inviteMember = async (req: Request, res: Response) => {
  const { teamId, email } = req.body;
  const adminId = (req as any).user.id as string;  // ← string from JWT

  try {
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ msg: 'Team not found' });

    // FIX: Compare ObjectId → string
    if (team.admin.toString() !== adminId.toString()) {
      return res.status(403).json({ msg: 'Only admin can invite' });
    }

    let member = await User.findOne({ email: email.toLowerCase() });
    if (!member) {
      member = new User({
        email: email.toLowerCase(),
        password: 'temp123',
        role: 'Member',
      });
      await member.save();
    }

    // Type-safe _id access
    const memberId = member._id as mongoose.Types.ObjectId;

    // Check duplicate
    if (team.members.some(m => m.equals(memberId))) {
      return res.status(400).json({ msg: 'Already in team' });
    }

    team.members.push(memberId);
    member.teams.push(team._id);
    await Promise.all([team.save(), member.save()]);

    const io = req.app.get('io') as import('socket.io').Server;
    io.emit('memberInvited', {
      teamId: team._id,
      member: { id: member._id, email: member.email },
    });

    res.json({ msg: 'Member invited', email: member.email });
  } catch (err: any) {
    console.error('inviteMember error:', err);
    res.status(500).json({ msg: err.message });
  }
};

// GET TEAMS
export const getTeams = async (req: Request, res: Response) => {
  const userId = (req as any).user.id as string;

  try {
    const user = await User.findById(userId).populate('teams');
    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.json(user.teams);
  } catch (err: any) {
    console.error('getTeams error:', err);
    res.status(500).json({ msg: err.message });
  }
};