import { Request, Response } from 'express';
import Project from '../models/Project';
import Team from '../models/Team';
import mongoose from 'mongoose';

// export const createProject = async (req: Request, res: Response) => {
//   const { name, teamId } = req.body;
//   const userId = (req as any).user.id;

//   try {
//     const team = await Team.findById(teamId);
//     if (!team || !team.members.includes(userId)) return res.status(403).json({ msg: 'Unauthorized' });

//     const project = new Project({ name, team: teamId });
//     await project.save();

//     team.projects.push(project.id);
//     await team.save();
  
//     const io = req.app.get('io') as import('socket.io').Server;
//     io.to(`team_${project.team}`).emit('projectCreated', {
//     projectId: project._id,
//     name: project.name,
//     });

//     res.json(project);
//   } catch (err: any) {
//     res.status(500).json({ msg: err.message });
//   }
// };



export const createProject = async (req: Request, res: Response) => {
  const { name, teamId } = req.body;
  const userId = (req as any).user.id;

  // let team1 = await Team.findById(teamId);
  // console.log(userId.toString())
  // console.log(team1)

  try {
    const team = await Team.findById(teamId);
    if (!team || team.admin.toString() !== userId.toString()) {
      return res.status(403).json({ msg: 'Unauthorized' });
    }

    const project = new Project({ name, team: teamId });
    await project.save();

    team.projects.push(project._id);
    await team.save();

    const io = req.app.get('io');
    io.emit('projectCreated', {
      projectId: project._id,
      name: project.name,
      teamId,
    });

    res.json(project);
  } catch (err: any) {
    res.status(500).json({ msg: err.message });
  }
};





export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = (req as any).user.id;

  try {
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    const team = await Team.findById(project.team);
    if (!team || team.admin.toString() !== userId.toString()) {
      return res.status(403).json({ msg: 'Only team admin can delete project' });
    }

    team.projects = team.projects.filter(p => p.toString() !== id);
    await team.save();

    const io = req.app.get('io') as import('socket.io').Server;
    io.emit('projectDeleted', {
      projectId: project._id,
      name: project.name,
    });

    await project.deleteOne();

    res.json({ msg: 'Project deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ msg: err.message });
  }
};




// export const getProjects = async (req: Request, res: Response) => {
//   const { teamId } = req.body;
//   const userId = (req as any).user.id;

//   try {
//     if (!teamId) {
//       return res.status(400).json({ msg: 'Team ID required' });
//     }

//     const teamDoc = await Team.findById(teamId);
//     if (!teamDoc) {
//       return res.status(404).json({ msg: 'Team not found' });
//     }

//     // Optional: Check if user is in team
//     if (!teamDoc.members.includes(userId.toString())) {
//       return res.status(403).json({ msg: 'Not a team member' });
//     }

//     const projects = await Project.find({ teamId }).sort({ createdAt: -1 });
//     console.log(`Projects for team ${teamId}:`, projects); // DEBUG

//     res.json(projects);
//   } catch (err: any) {
//     console.error('getProjects error:', err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// };



export const getProjects = async (req: Request, res: Response) => {
  const teamId = req.query.teamId as string;  // ← GET param
  const userId = (req as any).user.id as string;

  try {
    // 1. Validate teamId
    if (!teamId) {
      return res.status(400).json({ msg: 'Team ID required in query' });
    }

    if (!mongoose.Types.ObjectId.isValid(teamId)) {
      return res.status(400).json({ msg: 'Invalid Team ID format' });
    }

    // 2. Find team
    const teamDoc = await Team.findById(teamId);
    if (!teamDoc) {
      return res.status(404).json({ msg: 'Team not found' });
    }

    // 3. Authorization: User must be member
    const isMember = teamDoc.members.some((m) => m.toString() === userId.toString());
    if (!isMember) {
      return res.status(403).json({ msg: 'Not a team member' });
    }

    // 4. Fetch projects
    const projects = await Project.find({ team: teamId })  // ← 'team', not 'teamId'
      .sort({ createdAt: -1 })
      .select('name createdAt') // optional: limit fields
      .lean();

    console.log(`Projects for team ${teamId}:`, projects.length, 'found');

    res.json(projects);
  } catch (err: any) {
    console.error('getProjects error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};





// Add deleteProject, updateProject, etc.


