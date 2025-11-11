// import { Request, Response } from 'express';
// import { plainToInstance } from 'class-transformer';
// import { validate } from 'class-validator';
// import Task, { ITask } from '../models/Task';
// import Project from '../models/Project';
// import ActivityLog from '../models/ActivityLog';
// import Team from '../models/Team';

// class TaskDTO {
//   title!: string;
//   description?: string;
//   priority?: 'Low' | 'Medium' | 'High';
//   dueDate?: Date;
//   assignee!: string; // User ID
//   status?: 'To Do' | 'In Progress' | 'Review' | 'Done';
//   project!: string; // Project ID
// }

// export const createTask = async (req: Request, res: Response) => {
//   const dto = plainToInstance(TaskDTO, req.body);
//   const errors = await validate(dto);
//   if (errors.length > 0) return res.status(400).json(errors);

//   const userId = (req as any).user.id;

//   try {
//     const project = await Project.findById(dto.project);
//     if (!project) return res.status(404).json({ msg: 'Project not found' });

//     const team = await Team.findById(project.team);
//     if (!team || !team.members.includes(userId)) return res.status(403).json({ msg: 'Unauthorized' });

//     const task = new Task(dto);
//     await task.save();

//     project.tasks.push(task.id);
//     await project.save();

//     const log = new ActivityLog({ action: 'Task created', user: userId, task: task.id });
//     await log.save();

//     // Emit socket event
//     (req.app.get('io') as Server).to(`team_${team.id}`).emit('taskCreated', task);

//     res.json(task);
//   } catch (err: any) {
//     res.status(500).json({ msg: err.message });
//   }
// };

// export const updateTask = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const dto = plainToInstance(TaskDTO, req.body);
//   const errors = await validate(dto);
//   if (errors.length > 0) return res.status(400).json(errors);

//   const userId = (req as any).user.id;

//   try {
//     const task = await Task.findById(id);
//     if (!task) return res.status(404).json({ msg: 'Task not found' });

//     const project = await Project.findById(task.project);
//     const team = await Team.findById(project?.team);
//     if (!team || !team.members.includes(userId)) return res.status(403).json({ msg: 'Unauthorized' });

//     Object.assign(task, dto);
//     await task.save();

//     const log = new ActivityLog({ action: 'Task updated', user: userId, task: task.id });
//     await log.save();

//     // Emit socket event
//     (req.app.get('io') as Server).to(`team_${team.id}`).emit('taskUpdated', task);

//     res.json(task);
//   } catch (err: any) {
//     res.status(500).json({ msg: err.message });
//   }
// };

// // Add getTasks, deleteTask, etc.





// import { Request, Response } from 'express';
// import { plainToInstance } from 'class-transformer';
// import { validate } from 'class-validator';
// import Task, { ITask } from '../models/Task';
// import Project from '../models/Project';
// import ActivityLog from '../models/ActivityLog';
// import Team from '../models/Team';
// import { Server } from 'socket.io'; // ← ADD THIS LINE
// import { CreateTaskDto, UpdateTaskDto } from '../dto/task.dto';

// // class TaskDTO {
// //   title!: string;
// //   description?: string;
// //   priority?: 'Low' | 'Medium' | 'High';
// //   dueDate?: Date;
// //   assignee!: string;
// //   status?: 'To Do' | 'In Progress' | 'Review' | 'Done';
// //   project!: string;
// // }

// export const createTask = async (req: Request, res: Response) => {
//   const dto = plainToInstance(CreateTaskDto, req.body);
//   const errors = await validate(dto);
//   if (errors.length > 0) return res.status(400).json(errors);

//   const userId = (req as any).user.id;

//   try {
//     const project = await Project.findById(dto.project);
//     if (!project) return res.status(404).json({ msg: 'Project not found' });

//     const team = await Team.findById(project.team);
//     if (!team || !team.members.includes(userId)) return res.status(403).json({ msg: 'Unauthorized' });

//     const task = new Task(dto);
//     await task.save();

    
//     project.tasks.push(task.id);
//     await project.save();

//     // const io = req.app.get('io') as import('socket.io').Server; // ← Now 'Server' is known
//     io.to(`team_${project.team}`).emit('taskCreated', task);

//     const log = new ActivityLog({ action: 'Task created', user: userId, task: task.id });
//     await log.save();

//     // Emit socket event
//     const io = req.app.get('io') as Server; // ← Now 'Server' is known
//     io.to(`team_${team.id}`).emit('taskCreated', task);

//     res.json(task);
//   } catch (err: any) {
//     res.status(500).json({ msg: err.message });
//   }
// };

// export const updateTask = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const dto = plainToInstance(UpdateTaskDto, req.body);
//   const errors = await validate(dto);
//   if (errors.length > 0) return res.status(400).json(errors);

//   const userId = (req as any).user.id;

//   try {
//     const task = await Task.findById(id);
//     if (!task) return res.status(404).json({ msg: 'Task not found' });

//     const project = await Project.findById(task.project);
//     const team = await Team.findById(project?.team);
//     if (!team || !team.members.includes(userId)) return res.status(403).json({ msg: 'Unauthorized' });

//     Object.assign(task, dto);
//     await task.save();

//     const log = new ActivityLog({ action: 'Task updated', user: userId, task: task.id });
//     await log.save();

//     // Emit socket event
//     const io = req.app.get('io') as Server; // ← Now 'Server' is known
//     io.to(`team_${team.id}`).emit('taskUpdated', task);

//     res.json(task);
//   } catch (err: any) {
//     res.status(500).json({ msg: err.message });
//   }
// };



import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import Task from '../models/Task';
import Project from '../models/Project';
import ActivityLog from '../models/ActivityLog';
import Team from '../models/Team';
import { CreateTaskDto, UpdateTaskDto } from '../dto/task.dto';
import { Server } from 'socket.io'; // ← ADD THIS AT TOP OF FILE

// export const createTask = async (req: Request, res: Response) => {
//   const dto = plainToInstance(CreateTaskDto, req.body);
//   const errors = await validate(dto);
//   if (errors.length > 0) return res.status(400).json(errors);

//   const userId = (req as any).user.id;

//   try {
//     const project = await Project.findById(dto.project);
//     if (!project) return res.status(404).json({ msg: 'Project not found' });

//     const team = await Team.findById(project.team);
//     if (!team || !team.members.includes(userId)) return res.status(403).json({ msg: 'Unauthorized' });

//     const task = new Task(dto);
//     await task.save();

//     project.tasks.push(task.id);
//     await project.save();

//     const log = new ActivityLog({ action: 'Task created', user: userId, task: task.id });
//     await log.save();

//     // SOCKET: Notify team
//     const io = req.app.get('io') as Server;
//     io.to(`team_${team._id}`).emit('taskCreated', task);

//     res.json(task);
//   } catch (err: any) {
//     res.status(500).json({ msg: err.message });
//   }
// };




export const createTask = async (req: Request, res: Response) => {
  const { title, description, project, assignee, priority } = req.body;
  const userId = (req as any).user.id;

  try {
    const projectDoc = await Project.findById(project);
    if (!projectDoc) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    const task = new Task({
      title,
      description,
      project,
      assignee: assignee || userId,
      priority: priority || 'Medium',
    });

    await task.save();

    projectDoc.tasks.push(task._id); // ← NOW WORKS
    await projectDoc.save();

    const io = req.app.get('io');
    io.emit('taskCreated', task);

    res.json(task);
  } catch (err: any) {
    console.error('createTask error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const dto = plainToInstance(UpdateTaskDto, req.body);
  const errors = await validate(dto);
  if (errors.length > 0) return res.status(400).json(errors);

  const userId = (req as any).user.id;

  try {
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    const project = await Project.findById(task.project);
    const team = await Team.findById(project?.team);
    if (!team || !team.members.includes(userId)) return res.status(403).json({ msg: 'Unauthorized' });

    Object.assign(task, dto);
    await task.save();

    const log = new ActivityLog({ action: 'Task updated', user: userId, task: task.id });
    await log.save();

    // SOCKET: Notify team
    const io = req.app.get('io') as Server;
    io.emit('taskUpdated', task);

    res.json(task);
  } catch (err: any) {
    res.status(500).json({ msg: err.message });
  }
};



export const getTasks = async (req: Request, res: Response) => {
  const { project } = req.query;

  try {
    if (!project) {
      return res.status(400).json({ msg: 'Project ID required' });
    }

    const tasks = await Task.find({ project }).populate('assignee', 'email');
    console.log(`Tasks for project ${project}:`, tasks);
    res.json(tasks);
  } catch (err: any) {
    console.error('getTasks error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};